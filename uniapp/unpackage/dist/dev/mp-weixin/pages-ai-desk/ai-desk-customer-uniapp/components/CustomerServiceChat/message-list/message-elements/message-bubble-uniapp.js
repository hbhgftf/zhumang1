"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_state = require("../../../../utils/state.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../constant.js");
if (!Math) {
  (Avatar + MessageQuote + Icon + ReadStatus)();
}
const Icon = () => "../../../common/Icon.js";
const ReadStatus = () => "./read-status/index.js";
const MessageQuote = () => "./message-quote/index-uniapp.js";
const Avatar = () => "../../../common/Avatar/index.js";
const riskImageReplaceUrl = "https://web.sdk.qcloud.com/component/TUIKit/assets/has_risk_default.png";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-bubble-uniapp",
  props: {
    messageItem: { default: () => ({}) },
    content: { default: () => ({}) },
    classNameList: { default: () => [] },
    blinkMessageIDList: { default: () => [] },
    isAudioPlayed: { type: Boolean, default: false }
  },
  emits: ["resendMessage", "blinkMessage", "scrollTo", "handleTouchStart", "handleTouchEnd", "handleToggleMessageItem"],
  setup(__props, { emit: __emit }) {
    const { computed, toRefs } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const needLoadingIconMessageType = [
      TYPES.MSG_LOCATION,
      TYPES.MSG_TEXT,
      TYPES.MSG_CUSTOM,
      TYPES.MSG_MERGER,
      TYPES.MSG_FACE
    ];
    const { blinkMessageIDList, messageItem: message } = toRefs(props);
    const {
      showAvatar,
      showNickName,
      robotAvatar,
      staffAvatar,
      userAvatar,
      robotNickName,
      staffNickName,
      userNickName
    } = pagesAiDesk_aiDeskCustomerUniapp_utils_state.state.get("avatarNickName");
    const isDisplayUnplayMark = computed(() => {
      return message.value.flow === "in" && message.value.status === "success" && message.value.type === TYPES.MSG_AUDIO && !props.isAudioPlayed;
    });
    const isMultiBranchMsg = computed(() => {
      var _a;
      if (((_a = message.value) == null ? void 0 : _a.type) === "TIMCustomElem") {
        const src = JSON.parse(message.value.payload.data).src;
        if (src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.MULTI_BRANCH || src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.BRANCH || src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.BRANCH_NUMBER) {
          return true;
        }
      }
      return false;
    });
    function isFromRobot(cloudCustomData) {
      try {
        const jsonObj = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(cloudCustomData);
        return jsonObj.hasOwnProperty("role") && jsonObj.role === "robot";
      } catch (e) {
        return false;
      }
    }
    const avatarUrl = computed(() => {
      var _a, _b, _c, _d, _e;
      let url = "";
      if (((_a = message.value) == null ? void 0 : _a.flow) === "in") {
        if (isFromRobot((_b = message.value) == null ? void 0 : _b.cloudCustomData)) {
          url = robotAvatar || ((_c = message.value) == null ? void 0 : _c.avatar) || customerAvatar;
        } else {
          url = staffAvatar || ((_d = message.value) == null ? void 0 : _d.avatar);
        }
      } else {
        url = userAvatar || ((_e = message.value) == null ? void 0 : _e.avatar) || "";
      }
      return url;
    });
    const nickName = computed(() => {
      var _a, _b;
      let nick = "";
      if (((_a = message.value) == null ? void 0 : _a.flow) === "in") {
        if (isFromRobot((_b = message.value) == null ? void 0 : _b.cloudCustomData)) {
          nick = robotNickName || props.content.showName;
        } else {
          nick = staffNickName || props.content.showName;
        }
      } else {
        nick = userNickName || props.content.showName;
      }
      return nick;
    });
    const containerClassNameList = computed(() => {
      return ["message-bubble", ...props.classNameList];
    });
    const isProductCardOrOrderMessage = computed(() => {
      var _a;
      if (((_a = message.value) == null ? void 0 : _a.type) == "TIMCustomElem") {
        const src = JSON.parse(message.value.payload.data).src;
        if (src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.PRODUCT_CARD || src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.ORDER) {
          return true;
        }
      }
      return false;
    });
    const isNoPadding = computed(() => {
      return [TYPES.MSG_IMAGE, TYPES.MSG_VIDEO, TYPES.MSG_MERGER].includes(
        message.value.type
      );
    });
    const riskContentText = computed(() => {
      let content = common_vendor.Wt.t("TUIChat.涉及敏感内容") + ", ";
      if (message.value.flow === "out") {
        content += common_vendor.Wt.t("TUIChat.发送失败");
      } else {
        content += common_vendor.Wt.t(
          message.value.type === TYPES.MSG_AUDIO ? "TUIChat.无法收听" : "TUIChat.无法查看"
        );
      }
      return content;
    });
    const isBlink = computed(() => {
      var _a, _b;
      if ((_a = message.value) == null ? void 0 : _a.ID) {
        return (_b = blinkMessageIDList == null ? void 0 : blinkMessageIDList.value) == null ? void 0 : _b.includes(message.value.ID);
      }
      return false;
    });
    function resendMessage() {
      var _a;
      if (!((_a = message.value) == null ? void 0 : _a.hasRiskContent)) {
        emits("resendMessage");
      }
    }
    function blinkMessage(messageID) {
      emits("blinkMessage", messageID);
    }
    function scrollTo(scrollHeight) {
      emits("scrollTo", scrollHeight);
    }
    function handleToggle() {
      common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-bubble-uniapp.vue:308", "handleToggle");
      emits("handleToggleMessageItem");
    }
    function handleTouchStart() {
      common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-bubble-uniapp.vue:312", "handleTouchStart");
      emits("handleTouchStart");
    }
    function handleTouchEnd() {
      emits("handleTouchEnd");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC) && common_vendor.unref(showAvatar) === 1
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC) && common_vendor.unref(showAvatar) === 1 ? {
        b: common_vendor.p({
          useSkeletonAnimation: true,
          url: common_vendor.unref(avatarUrl)
        })
      } : {}, {
        c: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC) && common_vendor.unref(showNickName) === 1
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC) && common_vendor.unref(showNickName) === 1 ? {
        d: common_vendor.t(common_vendor.unref(nickName))
      } : {}, {
        e: common_vendor.n(common_vendor.unref(message).flow === "out" ? "reverse" : "flex-row"),
        f: common_vendor.o(blinkMessage),
        g: common_vendor.o(scrollTo),
        h: common_vendor.p({
          message: common_vendor.unref(message)
        }),
        i: (common_vendor.unref(message).type === common_vendor.unref(TYPES).MSG_IMAGE || common_vendor.unref(message).type === common_vendor.unref(TYPES).MSG_VIDEO) && common_vendor.unref(message).hasRiskContent
      }, (common_vendor.unref(message).type === common_vendor.unref(TYPES).MSG_IMAGE || common_vendor.unref(message).type === common_vendor.unref(TYPES).MSG_VIDEO) && common_vendor.unref(message).hasRiskContent ? {
        j: riskImageReplaceUrl
      } : {}, {
        k: common_vendor.unref(message).hasRiskContent
      }, common_vendor.unref(message).hasRiskContent ? {
        l: common_vendor.t(common_vendor.unref(riskContentText))
      } : {}, {
        m: common_vendor.n(common_vendor.unref(message).flow === "out" ? "content-out" : "content-in"),
        n: common_vendor.n(common_vendor.unref(message).hasRiskContent && "content-has-risk"),
        o: common_vendor.n(common_vendor.unref(isNoPadding) ? "content-no-padding" : ""),
        p: common_vendor.n(common_vendor.unref(isNoPadding) && common_vendor.unref(isBlink) ? "blink-shadow" : ""),
        q: common_vendor.n(!common_vendor.unref(isNoPadding) && common_vendor.unref(isBlink) ? "blink-content" : ""),
        r: common_vendor.n(common_vendor.unref(isMultiBranchMsg) ? "multi-branch-message" : ""),
        s: common_vendor.n(common_vendor.unref(isProductCardOrOrderMessage) ? "product-order-message-bubble" : ""),
        t: common_vendor.unref(isDisplayUnplayMark)
      }, common_vendor.unref(isDisplayUnplayMark) ? {} : {}, {
        v: common_vendor.unref(message).status === "fail" || common_vendor.unref(message).hasRiskContent
      }, common_vendor.unref(message).status === "fail" || common_vendor.unref(message).hasRiskContent ? {
        w: common_vendor.o(($event) => resendMessage())
      } : {}, {
        x: common_vendor.unref(message).status === "unSend" && needLoadingIconMessageType.includes(common_vendor.unref(message).type)
      }, common_vendor.unref(message).status === "unSend" && needLoadingIconMessageType.includes(common_vendor.unref(message).type) ? {
        y: common_vendor.p({
          file: common_vendor.unref(common_assets.loadingIcon),
          width: "15px",
          height: "15px"
        })
      } : {}, {
        z: common_vendor.p({
          message: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.shallowCopyMessage)(common_vendor.unref(message))
        }),
        A: common_vendor.n(common_vendor.unref(message).flow === "out" && "message-body-main-reverse"),
        B: common_vendor.o(() => {
        }),
        C: common_vendor.n(common_vendor.unref(message).flow === "in" ? "" : "reverse"),
        D: common_vendor.o(handleToggle),
        E: common_vendor.o(handleTouchStart),
        F: common_vendor.o(handleTouchEnd),
        G: common_vendor.o(handleTouchEnd),
        H: common_vendor.unref(message).flow === "out" ? 1 : "",
        I: common_vendor.n(common_vendor.unref(containerClassNameList))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a47cd8c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-bubble-uniapp.js.map
