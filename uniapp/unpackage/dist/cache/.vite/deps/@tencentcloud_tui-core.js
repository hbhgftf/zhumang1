import {
  require_chat,
  require_tim_profanity_filter_plugin,
  require_tim_upload_plugin
} from "./chunk-6QHDUI5A.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// D:/JAVAEE/myflies/uniapp-app/uniapp/node_modules/@tencentcloud/tui-core/index.js
var import_chat = __toESM(require_chat());
var import_tim_upload_plugin = __toESM(require_tim_upload_plugin());
var import_tim_profanity_filter_plugin = __toESM(require_tim_profanity_filter_plugin());
var i = class {
  constructor() {
    this.serviceMap = /* @__PURE__ */ new Map();
  }
  registerService(e2, t2) {
    this.serviceMap.has(e2) || (console.log(`TUIServiceManager.registerService serviceName:${e2}`), this.serviceMap.set(e2, t2));
  }
  unregisterService(e2) {
    this.serviceMap.has(e2) && (console.log(`TUIServiceManager.unregisterService serviceName:${e2}`), this.serviceMap.delete(e2));
  }
  getService(e2) {
    return this.serviceMap.get(e2);
  }
  callService(e2) {
    const { serviceName: t2, method: n2, params: i2, callback: s2 } = e2, o2 = this.getService(t2);
    if (console.log(`TUIServiceManager.callService serviceName:${t2}, service:`, o2), o2)
      return o2.onCall(n2, i2, s2);
  }
};
var s = class {
  constructor() {
    this.extensionMap = /* @__PURE__ */ new Map();
  }
  registerExtension(e2, t2) {
    if (console.log(`TUIExtensionManager.registerExtension extensionID:${e2}`), !this.extensionMap.has(e2)) {
      const t3 = [];
      this.extensionMap.set(e2, t3);
    }
    const n2 = this.extensionMap.get(e2);
    -1 === n2.indexOf(t2) && n2.push(t2);
  }
  unregisterExtension(e2, t2) {
    if (console.log(`TUIExtensionManager.unregisterExtension extensionID:${e2}`), this.extensionMap.has(e2)) {
      const n2 = this.extensionMap.get(e2), i2 = n2.indexOf(t2);
      i2 > -1 && n2.splice(i2, 1);
    }
  }
  getExtensionList(e2, t2) {
    const n2 = t2 ? `params:${JSON.stringify(t2)}` : "";
    console.log(`TUIExtensionManager.getExtensionList extensionID:${e2} ${n2}`);
    let i2 = [], s2 = [];
    if (this.extensionMap.has(e2)) {
      i2 = this.extensionMap.get(e2);
      for (let n3 = 0; n3 < i2.length; n3++) {
        const o2 = i2[n3].onGetExtension(e2, t2);
        s2 = s2.concat(o2);
      }
    }
    return s2;
  }
};
var o = ["vue2", "vue3", "rn"];
var E = { TUILogin: { EVENT: { LOGIN_STATE_CHANGED: "loginStateChanged" }, EVENT_SUB_KEY: { USER_LOGIN_SUCCESS: "userLoginSuccess", USER_LOGOUT_SUCCESS: "userLogoutSuccess", USER_KICKED_OFFLINE: "userKickedOffline", USER_SIG_EXPIRED: "userSigExpired" } }, TUIConversation: { SERVICE: { NAME: "TUIConversationService", METHOD: { CREATE_CONVERSATION: "createConversation", HIDE_CONVERSATION_HEADER: "hideConversationHeader" } }, EXTENSION: { CONV_POP_MENU: { EXT_ID: "conversationPopMenu" }, CONV_GROUP: { EXT_ID: "conversationGroup" } } }, TUIChat: { SERVICE: { NAME: "TUIChatService", METHOD: { UPDATE_MESSAGE_LIST: "updateMessageList", CLOSE_MESSAGE_POP_MENU: "closeMessagePopMenu", SEND_CUSTOM_MESSAGE: "sendCustomMessage", SEND_TEXT_MESSAGE: "sendTextMessage", SET_CHAT_TYPE: "setChatType", UPDATE_MESSAGE_INFO: "updateMessageInfo" } }, EXTENSION: { INPUT_MORE: { EXT_ID: "inputToolBarMore" }, MSG_POP_MENU: { EXT_ID: "messagePopMenu" }, CHAT_HEADER: { EXT_ID: "chatHeader" } }, TYPE: { C2C: "C2C", GROUP: "GROUP", CUSTOMER_SERVICE: "customerService", ROOM: "room" }, EVENT: { CHAT_STATE_CHANGED: "chatStateChanged", CHAT_TYPE_CHANGED: "chatTypeChanged" }, EVENT_SUB_KEY: { CHAT_OPENED: "chatOpened", CHANGE_SUCCESS: "changeSuccess" }, FEATURE: { DownloadFile: "DownloadFile", CopyMessage: "CopyMessage", DeleteMessage: "DeleteMessage", RevokeMessage: "RevokeMessage", QuoteMessage: "QuoteMessage", ForwardMessage: "ForwardMessage", TranslateMessage: "TranslateMessage", VoiceToText: "VoiceToText", MultiSelection: "MultiSelection", EmojiReaction: "EmojiReaction", InputEmoji: "InputEmoji", InputStickers: "InputStickers", InputImage: "InputImage", InputVoice: "InputVoice", InputVideo: "InputVideo", InputFile: "InputFile", InputEvaluation: "InputEvaluation", InputQuickReplies: "InputQuickReplies", InputMention: "InputMention", MessageSearch: "MessageSearch", ReadStatus: "ReadStatus" } }, TUIGroup: { SERVICE: { NAME: "TUIGroupService", METHOD: { CREATE_GROUP: "createGroup", OPEN_GROUP_MANAGEMENT: "openGroupManagement", SELECT_GROUP_MEMBER: "selectGroupMember" } } }, TUIContact: { SERVICE: { NAME: "TUIContactService", METHOD: { SELECT_FRIEND: "selectFriend" } }, EXTENSION: { CONTACT_LIST: { EXT_ID: "contactList" } } }, TUISearch: { SERVICE: { NAME: "TUISearchService", METHOD: { SEARCH_GROUP: "searchGroup", SEARCH_USER: "searchUser", SEARCH_FRIEND: "searchFriend", SEARCH_GROUP_MEMBER: "searchGroupMember" } }, EXTENSION: { SEARCH_MORE: { EXT_ID: "searchMore" } } }, TUICalling: { SERVICE: { NAME: "TUICallingService", METHOD: { START_CALL: "startCall" } } }, TUIRoom: { SERVICE: { NAME: "TUIRoomService" } }, TUIEmojiPlugin: { SERVICE: { NAME: "TUIEmojiPluginService", METHOD: { CLOSE_EMOJI_DETAIL: "closeEmojiDetail" } } }, TUITranslate: { EVENT: { LANGUAGE_CHANGED: "languageChanged" }, EVENT_SUB_KEY: { CHANGE_SUCCESS: "changeSuccess" } }, TUITranslatePlugin: { SERVICE: { NAME: "TUITranslatePluginService" } }, TUIVoiceToTextPlugin: { SERVICE: { NAME: "TUIVoiceToTextPluginService" } }, TUICustomerServicePlugin: { SERVICE: { NAME: "TUICustomerServicePlugin", METHOD: { ACTIVE_CONVERSATION: "activeConversation", FILTER_MESSAGE: "filterMessage" } }, EXTENSION: {} }, TUIPushPlugin: { SERVICE: { NAME: "TUIPushPluginService" } }, TUIChatbotPlugin: { SERVICE: { NAME: "TUIChatbotPluginService" } }, TUITheme: { EVENT: { THEME_CHANGED: "themeChanged" }, EVENT_SUB_KEY: { CHANGE_SUCCESS: "changeSuccess" } } };
var r = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting);
var a = "undefined" != typeof uni && "undefined" == typeof window;
var g = r || a;
var S = "undefined" != typeof uni;
var c = ("undefined" != typeof uni || "undefined" != typeof window) && !g;
r ? wx : S ? uni : window;
var h = c && window && window.navigator && window.navigator.userAgent || "";
var T = /Android/i.test(h);
var u = /(?:Windows Phone)/.test(h);
var I = /(?:SymbianOS)/.test(h);
var l = /iPad/i.test(h) || /iPhone/i.test(h) || /iPod/i.test(h);
var C = T || u || I || l;
var M = c && !C;
var U = a && !r;
var _ = { [E.TUITranslatePlugin.SERVICE.NAME]: Math.pow(2, 38), [E.TUIVoiceToTextPlugin.SERVICE.NAME]: Math.pow(2, 39), [E.TUICustomerServicePlugin.SERVICE.NAME]: Math.pow(2, 40), [E.TUIPushPlugin.SERVICE.NAME]: Math.pow(2, 41), [E.TUIChatbotPlugin.SERVICE.NAME]: Math.pow(2, 42), [E.TUIEmojiPlugin.SERVICE.NAME]: Math.pow(2, 48) };
var N = class _N {
  constructor(e2) {
    this.loginStatusPromise = /* @__PURE__ */ new Map(), this.SDKAppID = 0, this.userID = "", this.userSig = "", this.TUICore = e2, this.isOnChatEvent = false;
  }
  static getInstance(e2) {
    return !_N.instance && e2 && (_N.instance = new _N(e2)), _N.instance;
  }
  login(t2) {
    const { SDKAppID: n2, userID: i2, userSig: s2, framework: o2 } = t2;
    return this.chat = import_chat.default.create(Object.assign(Object.assign({}, t2), { scene: this.getStatScene(o2) })), this.EVENT = import_chat.default.EVENT, this.TYPES = import_chat.default.TYPES, this.SDKAppID = n2, this.userID = i2, this.userSig = s2, this.offChatEvent(), this.onChatEvent(), this.registerPlugin(t2), this.loginChat(t2);
  }
  logout() {
    return this.chat.logout().then((e2) => (this.userID = "", this.userSig = "", this.TUICore.notifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS), Promise.resolve(e2)));
  }
  destroy() {
    return this.chat.destroy().then((e2) => (this.userID = "", this.userSig = "", this.TUICore.notifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS), Promise.resolve(e2)));
  }
  setLogLevel(e2) {
    return this.chat.setLogLevel(e2);
  }
  getContext() {
    return { chat: this.chat, SDKAppID: this.SDKAppID, userID: this.userID, userSig: this.userSig };
  }
  reportPlugin() {
    var e2;
    for (const t2 in _)
      this.TUICore.getService(t2) && (null === (e2 = this.chat.callExperimentalAPI("isFeatureEnabledForStat", _[t2])) || void 0 === e2 || e2.catch((e3) => {
      }));
  }
  loginChat(e2) {
    const { userID: t2, userSig: n2 } = e2;
    return new Promise((e3, i2) => {
      this.chat.login({ userID: t2, userSig: n2 }).then((t3) => {
        t3.data.repeatLogin && this.chat.isReady() && e3(t3), this.reportPlugin(), this.loginStatusPromise.set("login", { resolve: e3, reject: i2, imResponse: t3 });
      }).catch((e4) => {
        i2(e4);
      });
    });
  }
  onChatEvent() {
    this.chat.on(this.EVENT.SDK_READY, this.onSDKReady, this), this.chat.on(this.EVENT.SDK_NOT_READY, this.onSDKNotReady, this), this.chat.on(this.EVENT.KICKED_OUT, this.onUserKicked, this), this.isOnChatEvent = true;
  }
  offChatEvent() {
    this.isOnChatEvent && (this.chat.off(this.EVENT.SDK_READY, this.onSDKReady, this), this.chat.off(this.EVENT.SDK_NOT_READY, this.onSDKNotReady, this), this.chat.off(this.EVENT.KICKED_OUT, this.onUserKicked, this), this.isOnChatEvent = false);
  }
  onSDKReady() {
    if (this.loginStatusPromise.has("login")) {
      this.TUICore.notifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS);
      const e2 = setTimeout(() => {
        const t2 = this.loginStatusPromise.get("login");
        t2.resolve(t2.imResponse), clearTimeout(e2), this.loginStatusPromise.delete("login");
      }, 500);
    }
  }
  onSDKNotReady() {
    if (this.loginStatusPromise.has("login")) {
      this.loginStatusPromise.get("login").reject(new Error("sdk not ready"));
    }
    this.loginStatusPromise.delete("login");
  }
  onUserKicked(e2) {
    e2.data.type !== this.TYPES.KICKED_OUT_USERSIG_EXPIRED ? this.TUICore.notifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_KICKED_OFFLINE) : this.TUICore.notifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_SIG_EXPIRED);
  }
  registerPlugin(e2) {
    const { useUploadPlugin: i2 = false, useProfanityFilterPlugin: s2 = false, TUIOfflinePush: o2, offlinePushConfig: E2, TIMPush: r2, pushConfig: a2 } = e2;
    true === i2 && this.chat.registerPlugin({ "tim-upload-plugin": import_tim_upload_plugin.default }), true === s2 && this.chat.registerPlugin({ "tim-profanity-filter-plugin": import_tim_profanity_filter_plugin.default }), U && r2 && a2 && this.chat.registerPlugin({ "tim-push": r2, pushConfig: a2 }), U && o2 && E2 && this.chat.registerPlugin({ "tim-offline-push-plugin": o2, offlinePushConfig: E2 });
  }
  getStatScene(e2) {
    let t2;
    return e2 && o.indexOf(e2) > -1 && (t2 = this.genStatScene(e2)), t2;
  }
  genStatScene(e2) {
    if ("rn" === e2)
      return "k-rn";
    let t2 = "";
    return S ? (M && (t2 = `k-${e2}-pc-uni`), C && (t2 = `k-${e2}-h5-uni`), U && (t2 = `k-${e2}-app-uni`), r && (t2 = `k-${e2}-mp-uni`), t2) : (M && (t2 = `k-${e2}-pc`), C && (t2 = `k-${e2}-h5`), t2);
  }
};
var p = class {
  constructor() {
    this.eventMap = /* @__PURE__ */ new Map();
  }
  registerEvent(e2, t2, n2) {
    const i2 = this.getKey(e2, t2);
    if (console.log(`TUIEventManager.registerEvent eventName:${e2} subKey:${t2}`), !this.eventMap.has(i2)) {
      const e3 = [];
      this.eventMap.set(i2, e3);
    }
    const s2 = this.eventMap.get(i2);
    -1 === s2.indexOf(n2) && (s2.push(n2), this.renotify(e2, t2, n2));
  }
  unregisterEvent(e2, t2, n2) {
    console.log(`TUIEventManager.unregisterEvent eventName:${e2} subKey:${t2}`);
    const i2 = this.getKey(e2, t2);
    if (this.eventMap.has(i2)) {
      const e3 = this.eventMap.get(i2), t3 = e3.indexOf(n2);
      t3 > -1 && e3.splice(t3, 1);
    }
  }
  notifyEvent(e2, t2, n2) {
    const i2 = this.getKey(e2, t2), s2 = n2 ? `params:${JSON.stringify(n2)}` : "";
    if (console.log(`TUIEventManager.notifyEvent eventName:${e2} subKey:${t2} ${s2}`), this.eventMap.has(i2)) {
      this.eventMap.get(i2).forEach((i3) => {
        i3.onNotifyEvent(e2, t2, n2);
      });
    }
  }
  getKey(e2, t2) {
    let n2 = e2;
    return t2 && (n2 = `${e2}-${n2}`), n2;
  }
  renotify(e2, t2, n2) {
    if (e2 === E.TUILogin.EVENT.LOGIN_STATE_CHANGED && t2 === E.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS) {
      const { chat: e3 } = N.getInstance().getContext();
      e3 && e3.isReady() && (n2.onNotifyEvent(E.TUILogin.EVENT.LOGIN_STATE_CHANGED, E.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS), console.log("TUIEventManager.renotify success."));
    }
  }
};
var v = class _v {
  constructor() {
    this.serviceManager = new i(), this.extensionManager = new s(), this.eventManager = new p();
  }
  static getInstance() {
    return _v.instance || (console.log("TUICore.getInstance ok."), _v.instance = new _v()), _v.instance;
  }
  registerService(e2, t2) {
    return this.serviceManager.registerService(e2, t2);
  }
  unregisterService(e2) {
    return this.serviceManager.unregisterService(e2);
  }
  getService(e2) {
    return this.serviceManager.getService(e2);
  }
  callService(e2) {
    return this.serviceManager.callService(e2);
  }
  registerExtension(e2, t2) {
    return this.extensionManager.registerExtension(e2, t2);
  }
  unregisterExtension(e2, t2) {
    return this.extensionManager.unregisterExtension(e2, t2);
  }
  getExtensionList(e2, t2) {
    return this.extensionManager.getExtensionList(e2, t2);
  }
  registerEvent(e2, t2, n2) {
    return this.eventManager.registerEvent(e2, t2, n2);
  }
  unregisterEvent(e2, t2, n2) {
    return this.eventManager.unregisterEvent(e2, t2, n2);
  }
  notifyEvent(e2, t2, n2) {
    return this.eventManager.notifyEvent(e2, t2, n2);
  }
};
console.log("TUICore.VERSION:2.4.0");
var R = v.getInstance();
var A = N.getInstance(R);
export {
  E as TUIConstants,
  R as TUICore,
  A as TUILogin,
  R as default
};
//# sourceMappingURL=@tencentcloud_tui-core.js.map
