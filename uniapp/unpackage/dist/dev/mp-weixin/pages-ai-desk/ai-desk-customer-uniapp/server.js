"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("./utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_logger = require("./utils/logger.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("./components/common/Toast/index-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVueUniapp = require("./adapter-vue-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("./utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_state = require("./utils/state.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("./components/common/Toast/type.js");
const version = "1.4.0";
const _TUICustomerServer = class _TUICustomerServer {
  constructor() {
    __publicField(this, "isLoggedIn");
    __publicField(this, "customerServiceAccounts");
    __publicField(this, "loggedInUserID");
    __publicField(this, "myProfile");
    common_vendor.R.registerService(common_vendor.E.TUICustomerServicePlugin.SERVICE.NAME, this);
    common_vendor.R.registerExtension(common_vendor.E.TUIContact.EXTENSION.CONTACT_LIST.EXT_ID, this);
    this.customerServiceAccounts = ["@customer_service_account"];
    this.isLoggedIn = false;
    this.loggedInUserID = "";
    this.myProfile = {};
  }
  static getInstance() {
    if (!_TUICustomerServer.instance) {
      _TUICustomerServer.instance = new _TUICustomerServer();
    }
    return _TUICustomerServer.instance;
  }
  loginCustomerUIKit(SDKAppID, userID, userSig) {
    pagesAiDesk_aiDeskCustomerUniapp_utils_index.clearChatStorage(SDKAppID, userID);
    common_vendor.qt.login({
      SDKAppID,
      userID,
      userSig,
      useUploadPlugin: true
    }).then(() => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.i(`login success. userID:${userID}`);
      this.isLoggedIn = true;
      this.loggedInUserID = userID;
      common_vendor.Xt.switchConversation("C2C@customer_service_account");
      pagesAiDesk_aiDeskCustomerUniapp_utils_utils.switchReadStatus(pagesAiDesk_aiDeskCustomerUniapp_utils_state.state.get("showReadStatus"));
      common_vendor.qt.chat.callExperimentalAPI("isFeatureEnabledForStat", Math.pow(2, 42));
    }).catch((error) => {
      pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
        message: common_vendor.Wt.t("TUIChat.登录失败"),
        type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.ERROR,
        duration: 3e4
      });
      pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(error);
    });
  }
  init(SDKAppID, userID, userSig) {
    pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(`TUICustomerServer.init vue:${pagesAiDesk_aiDeskCustomerUniapp_adapterVueUniapp.vueVersion} version:${version} SDKAppID:${SDKAppID} userID:${userID} isLoggedIn:${this.isLoggedIn} loggedInUserID:${this.loggedInUserID}`);
    if (this.isLoggedIn) {
      if (this.loggedInUserID === userID) {
        return;
      }
      this.unInit().finally(() => {
        this.isLoggedIn = false;
        this.loginCustomerUIKit(SDKAppID, userID, userSig);
      });
    } else {
      this.loginCustomerUIKit(SDKAppID, userID, userSig);
    }
  }
  initWithProfile(options) {
    const { SDKAppID, userID, userSig, nickName, avatar } = options;
    pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(`TUICustomerServer.initWithProfile version:${version}`);
    if (nickName) {
      this.myProfile.nick = nickName;
    }
    if (avatar) {
      this.myProfile.avatar = avatar;
    }
    this.init(SDKAppID, userID, userSig);
  }
  unInit() {
    return common_vendor.qt.logout();
  }
  sendTextMessage(options, sendMessageOptions) {
    return common_vendor.Qt.sendTextMessage(options, sendMessageOptions);
  }
  sendCustomMessage(options, sendMessageOptions) {
    return common_vendor.Qt.sendCustomMessage(options, sendMessageOptions);
  }
  changeLanguage(language) {
    return common_vendor.Wt.changeLanguage(language).then(() => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.i(`language changed to ${language}`);
    });
  }
  getLoggedInUserID() {
    return this.loggedInUserID;
  }
  // Determine if the current session is a customer service session
  isCustomerConversation(conversationID) {
    const userID = conversationID && conversationID.slice(3) || "";
    return this.customerServiceAccounts.indexOf(userID) > -1;
  }
  // Determine if the current message is a customer service message
  isCustomerServicePluginMessage(message) {
    if (!message || !this.isCustomerConversation(message.conversationID)) {
      return false;
    }
    if (pagesAiDesk_aiDeskCustomerUniapp_utils_index.isThinkingMessage(message)) {
      return false;
    }
    return pagesAiDesk_aiDeskCustomerUniapp_utils_index.isCustomerServiceMessage(message) || pagesAiDesk_aiDeskCustomerUniapp_utils_index.isMessageInvisible(message);
  }
  onGetExtension(extensionID) {
    if (extensionID === common_vendor.E.TUIContact.EXTENSION.CONTACT_LIST.EXT_ID) {
      return [
        {
          weight: 0,
          icon: "",
          text: "智能客服",
          data: {
            name: "customer",
            accountList: this.customerServiceAccounts
          }
        }
      ];
    }
  }
  onCall(method, params) {
    pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(`TUICustomerServer.onCall method:${method} params:`, params);
    if (method === common_vendor.E.TUICustomerServicePlugin.SERVICE.METHOD.ACTIVE_CONVERSATION) {
      if (this.isCustomerConversation(params.conversationID)) {
        if (Object.keys(this.myProfile).length > 0) {
          pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(`TUICustomerServer.onCall updateMyProfile:${JSON.stringify(this.myProfile)}`);
          common_vendor.Zt.updateMyProfile({ ...this.myProfile }).finally(() => {
            this.activeServiceFlow(params);
          });
        } else {
          this.activeServiceFlow(params);
        }
      }
    }
  }
  // 激活会话服务流
  activeServiceFlow(params) {
    common_vendor.Qt.sendCustomMessage({
      to: params.conversationID.slice(3),
      conversationType: common_vendor.qt.TYPES.CONV_C2C,
      payload: {
        data: JSON.stringify({
          src: "7",
          customerServicePlugin: 0,
          triggeredContent: typeof params.robotLang === "undefined" ? void 0 : { language: params.robotLang }
        })
      }
    }, { onlineUserOnly: true });
  }
};
__publicField(_TUICustomerServer, "instance");
let TUICustomerServer = _TUICustomerServer;
exports.TUICustomerServer = TUICustomerServer;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/server.js.map
