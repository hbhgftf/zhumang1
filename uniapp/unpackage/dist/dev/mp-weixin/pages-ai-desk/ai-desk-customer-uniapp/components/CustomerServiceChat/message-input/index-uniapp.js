"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const common_assets = require("../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_sendMessage = require("../utils/sendMessage.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../emoji-config/index.js");
if (!Math) {
  (MessageQuote + MessageInputAudio + MessageInputEditor + Icon)();
}
const MessageInputEditor = () => "./message-input-editor-uniapp.js";
const MessageInputAudio = () => "./message-input-audio-uniapp.js";
const MessageQuote = () => "./message-input-quote/index.js";
const Icon = () => "../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-uniapp",
  props: {
    placeholder: { default: "" },
    isMuted: { type: Boolean, default: true },
    muteText: { default: "" },
    enableInput: { type: Boolean, default: true },
    enableTyping: { type: Boolean, default: true },
    canSendAudio: { type: Boolean, default: false },
    replyOrReference: { default: () => ({}) },
    inputToolbarDisplayType: { default: "none" }
  },
  emits: ["changeToolbarDisplayType", "sendMessage"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { ref, watch, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const editor = ref();
    const currentConversation = ref();
    const displayType = ref("editor");
    const showSendButton = ref(false);
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
      common_vendor.Jt.watch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
    });
    watch(
      () => props.inputToolbarDisplayType,
      (newVal) => {
        if (newVal !== "none") {
          changeDisplayType("editor");
        }
      }
    );
    function changeDisplayType(display) {
      displayType.value = display;
      if (display === "audio") {
        emits("changeToolbarDisplayType", "none");
      }
    }
    function changeToolbarDisplayType(displayType2) {
      emits("changeToolbarDisplayType", displayType2);
    }
    const onTyping = (inputContentEmpty, inputBlur) => {
      pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_sendMessage.sendTyping(inputContentEmpty, inputBlur);
    };
    const onFocus = () => {
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) {
        emits("changeToolbarDisplayType", "none");
      }
    };
    const insertEmoji = (emoji) => {
      var _a, _b;
      ((_a = editor == null ? void 0 : editor.value) == null ? void 0 : _a.addEmoji) && ((_b = editor == null ? void 0 : editor.value) == null ? void 0 : _b.addEmoji(emoji));
      showSendButton.value = true;
    };
    const reEdit = (content) => {
      var _a, _b;
      (_a = editor == null ? void 0 : editor.value) == null ? void 0 : _a.resetEditor();
      showSendButton.value = false;
      (_b = editor == null ? void 0 : editor.value) == null ? void 0 : _b.setEditorContent(content);
    };
    function onCurrentConversationUpdated(conversation) {
      currentConversation.value = conversation;
    }
    function onQuoteMessageUpdated(options) {
      if ((options == null ? void 0 : options.message) && (options == null ? void 0 : options.type) === "quote") {
        changeDisplayType("editor");
      }
    }
    const sendMessage = async () => {
      var _a, _b;
      const _editorContentList = (_a = editor.value) == null ? void 0 : _a.getEditorContent();
      if (!_editorContentList || !currentConversation.value)
        return;
      const editorContentList = _editorContentList.map((editor2) => {
        if (editor2.type === "text") {
          editor2.payload.text = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithEmojiNamesToKeys(
            editor2.payload.text
          );
        }
        return editor2;
      });
      await pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_sendMessage.sendMessages(editorContentList, currentConversation.value);
      (_b = editor.value) == null ? void 0 : _b.resetEditor();
      showSendButton.value = false;
    };
    const isInputNotEmpty = (show) => {
      showSendButton.value = show;
    };
    __expose({
      insertEmoji,
      reEdit
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          displayType: common_vendor.unref(displayType)
        }),
        b: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && props.canSendAudio
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && props.canSendAudio ? {
        c: common_vendor.unref(displayType) === "audio" ? 1 : "",
        d: common_vendor.o(changeDisplayType),
        e: common_vendor.p({
          isEnableAudio: common_vendor.unref(displayType) === "audio"
        })
      } : {}, {
        f: common_vendor.sr(editor, "9c4d57d9-2", {
          "k": "editor"
        }),
        g: common_vendor.unref(displayType) === "editor",
        h: common_vendor.o(onTyping),
        i: common_vendor.o(onFocus),
        j: common_vendor.o(isInputNotEmpty),
        k: common_vendor.p({
          placeholder: props.placeholder,
          isMuted: props.isMuted,
          muteText: props.muteText,
          enableInput: props.enableInput,
          enableTyping: props.enableTyping
        }),
        l: common_vendor.o(($event) => changeToolbarDisplayType("emojiPicker")),
        m: common_vendor.p({
          file: common_vendor.unref(common_assets.faceIcon),
          size: "23px",
          hotAreaSize: "3px"
        }),
        n: !common_vendor.unref(showSendButton)
      }, !common_vendor.unref(showSendButton) ? {
        o: common_vendor.o(($event) => changeToolbarDisplayType("tools")),
        p: common_vendor.p({
          file: common_vendor.unref(common_assets.moreIcon),
          size: "23px",
          hotAreaSize: "3px"
        })
      } : {}, {
        q: common_vendor.unref(showSendButton)
      }, common_vendor.unref(showSendButton) ? {
        r: common_vendor.p({
          file: common_vendor.unref(common_assets.sendButtonIcon),
          width: "35px",
          height: "35px"
        }),
        s: common_vendor.o(sendMessage)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9c4d57d9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input/index-uniapp.js.map
