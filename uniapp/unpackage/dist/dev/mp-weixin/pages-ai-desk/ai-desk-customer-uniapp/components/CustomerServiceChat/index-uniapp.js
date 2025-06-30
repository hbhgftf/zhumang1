"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_logger = require("../../utils/logger.js");
const pagesAiDesk_aiDeskCustomerUniapp_locales_index = require("../../locales/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../common/Toast/index-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_state = require("../../utils/state.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("../common/Toast/type.js");
if (!Math) {
  (MessageList + MessageToolbarButton + MessageInputToolbar + MessageInput)();
}
const MessageList = () => "./message-list/index-uniapp.js";
const MessageInput = () => "./message-input/index-uniapp.js";
const MessageInputToolbar = () => "./message-input-toolbar/index-uniapp.js";
const MessageToolbarButton = () => "./message-toolbar-button/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-uniapp",
  props: {
    robotLang: { default: "" },
    userLang: { default: "" },
    canSendAudio: { type: Boolean, default: false },
    toolbarButtonList: { default: () => [] },
    showAvatar: { default: 1 },
    robotAvatar: { default: "" },
    staffAvatar: { default: "" },
    userAvatar: { default: "" },
    showNickName: { default: 0 },
    robotNickName: { default: "" },
    staffNickName: { default: "" },
    userNickName: { default: "" },
    inputToolbarList: { default: () => [] },
    showReadStatus: { default: 1 },
    showTyping: { default: 0 }
  },
  emits: ["closeChat"],
  setup(__props, { emit: __emit }) {
    const { ref, onMounted, onUnmounted, computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const currentConversationID = ref();
    const inputToolbarDisplayType = ref("none");
    const messageInputRef = ref();
    const messageListRef = ref();
    const isMuted = ref(false);
    const muteText = ref("");
    const isUniFormShow = ref(false);
    const languages = Object.keys(pagesAiDesk_aiDeskCustomerUniapp_locales_index.messages);
    const props = __props;
    const convertLanguageToLowercase = (language) => {
      if (!language) {
        return "zh";
      }
      let lowercase = language.toLowerCase();
      if (lowercase === "zh-cn" || lowercase === "zh_cn") {
        lowercase = "zh";
      } else if (lowercase === "zh-tw" || lowercase === "zh-hk") {
        lowercase = "zh_tw";
      }
      return lowercase;
    };
    const initLanguage = () => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.i(`initLanguage ${props.userLang}`);
      common_vendor.Wt.provideLanguages({ ...pagesAiDesk_aiDeskCustomerUniapp_locales_index.messages });
      common_vendor.Wt.useI18n();
      let language;
      if (props.userLang !== "") {
        language = convertLanguageToLowercase(props.userLang);
        if (!languages.includes(language)) {
          pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.w(`userLang:${props.userLang} is not supported`);
          language = "en";
        }
      } else {
        if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp) {
          const { osLanguage } = common_vendor.index.getDeviceInfo();
          pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.i(`initLanguage osLanguage:${osLanguage}`);
          language = convertLanguageToLowercase(osLanguage);
        } else if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) {
          language = "zh";
        } else if (navigator) {
          language = convertLanguageToLowercase(navigator.language);
        }
        if (!languages.includes(language)) {
          language = "en";
        }
      }
      common_vendor.Wt.changeLanguage(language);
    };
    const setAvatarNickName = () => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_state.state.set("avatarNickName", {
        showAvatar: props.showAvatar,
        showNickName: props.showNickName,
        userAvatar: props.userAvatar,
        staffAvatar: props.staffAvatar,
        robotAvatar: props.robotAvatar,
        userNickName: props.userNickName,
        staffNickName: props.staffNickName,
        robotNickName: props.robotNickName
      });
    };
    const setShowReadStatus = () => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_state.state.set("showReadStatus", props.showReadStatus);
    };
    const setShowTyping = () => {
      pagesAiDesk_aiDeskCustomerUniapp_utils_state.state.set("showTyping", props.showTyping);
    };
    if (!pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) {
      initLanguage();
    }
    setAvatarNickName();
    setShowReadStatus();
    setShowTyping();
    onMounted(() => {
      const logPrefix = "CustomerServiceChat onMounted.";
      pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.l(`${logPrefix} engineReady:${common_vendor.qt.isReady()}`);
      if (props.robotLang && !pagesAiDesk_aiDeskCustomerUniapp_utils_index.isSupportedLang(props.robotLang)) {
        pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.w(`${logPrefix} robotLang:${props.robotLang} is not supported`);
      }
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversationID: onCurrentConversationIDUpdate
      });
      common_vendor.Jt.watch(common_vendor.o$1.USER, {
        kickedOut: onKickedOut
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversationID: onCurrentConversationIDUpdate
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.USER, {
        kickedOut: onKickedOut
      });
    });
    const isInputToolbarShow = computed(() => {
      return pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork ? inputToolbarDisplayType.value !== "none" : true;
    });
    const insertEmoji = (emojiObj) => {
      var _a;
      (_a = messageInputRef.value) == null ? void 0 : _a.insertEmoji(emojiObj);
    };
    const handleEditor = (message, type) => {
      var _a, _b, _c;
      if (!message || !type)
        return;
      switch (type) {
        case "reference":
          break;
        case "reply":
          break;
        case "reedit":
          if ((_a = message == null ? void 0 : message.payload) == null ? void 0 : _a.text) {
            (_c = messageInputRef == null ? void 0 : messageInputRef.value) == null ? void 0 : _c.reEdit((_b = message == null ? void 0 : message.payload) == null ? void 0 : _b.text);
          }
          break;
      }
    };
    function changeToolbarDisplayType(type) {
      inputToolbarDisplayType.value = inputToolbarDisplayType.value === type ? "none" : type;
      if (inputToolbarDisplayType.value !== "none" && pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) {
        common_vendor.index.$emit("scroll-to-bottom");
      }
    }
    function scrollToLatestMessage() {
      var _a;
      (_a = messageListRef.value) == null ? void 0 : _a.scrollToLatestMessage();
    }
    function onKickedOut(type) {
      if (type) {
        isMuted.value = true;
        pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
          message: common_vendor.Wt.t("TUIChat.账号被强制下线"),
          type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.ERROR,
          duration: 3e4
        });
      }
    }
    function onCurrentConversationIDUpdate(conversationID) {
      if (!conversationID) {
        return;
      }
      if (currentConversationID.value === conversationID) {
        return;
      }
      currentConversationID.value = conversationID;
      common_vendor.R.callService({
        serviceName: common_vendor.E.TUICustomerServicePlugin.SERVICE.NAME,
        method: common_vendor.E.TUICustomerServicePlugin.SERVICE.METHOD.ACTIVE_CONVERSATION,
        params: {
          conversationID,
          robotLang: props.robotLang && pagesAiDesk_aiDeskCustomerUniapp_utils_index.isSupportedLang(props.robotLang) ? props.robotLang : void 0
        }
      });
    }
    function handleShowFormPopup(data) {
      isUniFormShow.value = data;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(currentConversationID)
      }, common_vendor.unref(currentConversationID) ? common_vendor.e({
        b: common_vendor.sr(messageListRef, "8c512b75-0", {
          "k": "messageListRef"
        }),
        c: common_vendor.o(handleEditor),
        d: common_vendor.o(() => changeToolbarDisplayType("none")),
        e: common_vendor.o(handleShowFormPopup),
        f: common_vendor.p({
          toolbarButtonList: props.toolbarButtonList
        }),
        g: common_vendor.unref(isInputToolbarShow)
      }, common_vendor.unref(isInputToolbarShow) ? {
        h: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) && "tui-chat-uni-message-input-toolbar"),
        i: common_vendor.o(insertEmoji),
        j: common_vendor.o(changeToolbarDisplayType),
        k: common_vendor.o(scrollToLatestMessage),
        l: common_vendor.p({
          displayType: common_vendor.unref(inputToolbarDisplayType)
        })
      } : {}, {
        m: common_vendor.sr(messageInputRef, "8c512b75-3", {
          "k": "messageInputRef"
        }),
        n: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) && !common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && "tui-chat-uni-message-input"),
        o: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && "tui-chat-wx-message-input"),
        p: common_vendor.n(common_vendor.unref(isUniFormShow) && "tui-chat-uni-message-input-hide"),
        q: common_vendor.o(changeToolbarDisplayType),
        r: common_vendor.p({
          isMuted: common_vendor.unref(isMuted),
          muteText: common_vendor.unref(muteText),
          canSendAudio: props.canSendAudio,
          placeholder: "",
          inputToolbarDisplayType: common_vendor.unref(inputToolbarDisplayType)
        })
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c512b75"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/index-uniapp.js.map
