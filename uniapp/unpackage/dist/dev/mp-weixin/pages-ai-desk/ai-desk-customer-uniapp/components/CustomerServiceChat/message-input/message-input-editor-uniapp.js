"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_conversationDraft = require("../utils/conversationDraft.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../emoji-config/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_sendMessage = require("../utils/sendMessage.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-input-editor-uniapp",
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    replayOrReferenceMessage: {
      type: Object,
      default: () => ({}),
      required: false
    },
    isMuted: {
      type: Boolean,
      default: true
    },
    muteText: {
      type: String,
      default: ""
    },
    enableInput: {
      type: Boolean,
      default: true
    },
    enableTyping: {
      type: Boolean,
      default: true
    }
  },
  emits: ["onTyping", "onFocus", "isInputNotEmpty"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { ref, watch, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const emits = __emit;
    const inputText = ref("");
    ref();
    const inputBlur = ref(true);
    const inputContentEmpty = ref(true);
    const currentConversation = ref();
    const currentConversationID = ref("");
    const currentQuoteMessage = ref();
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
      common_vendor.Jt.watch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
      common_vendor.index.$on("insert-emoji", (data) => {
        var _a;
        inputText.value += (_a = data == null ? void 0 : data.emoji) == null ? void 0 : _a.name;
        emits("isInputNotEmpty", true);
      });
      common_vendor.index.$on("send-message-in-emoji-picker", () => {
        handleSendMessage();
      });
    });
    onUnmounted(() => {
      if (currentConversationID.value) {
        pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_conversationDraft.DraftManager.setStore(
          currentConversationID.value,
          inputText.value,
          inputText.value,
          currentQuoteMessage.value
        );
      }
      common_vendor.index.$off("insertEmoji");
      common_vendor.index.$off("send-message-in-emoji-picker");
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
      reset();
    });
    const handleSendMessage = () => {
      const messageList = getEditorContent();
      resetEditor();
      pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_sendMessage.sendMessages(messageList, currentConversation.value);
    };
    const getEditorContent = () => {
      let text = inputText.value;
      text = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithEmojiNamesToKeys(text);
      const payload = {
        text
      };
      return [
        {
          type: "text",
          payload
        }
      ];
    };
    const resetEditor = () => {
      inputText.value = "";
      inputContentEmpty.value = true;
      emits("isInputNotEmpty", false);
    };
    const setEditorContent = (content) => {
      inputText.value = content;
    };
    const onBlur = () => {
      inputBlur.value = true;
    };
    const onFocus = (e) => {
      var _a;
      inputBlur.value = false;
      emits("onFocus", (_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.height);
    };
    const isEditorContentEmpty = () => {
      var _a;
      inputContentEmpty.value = ((_a = inputText == null ? void 0 : inputText.value) == null ? void 0 : _a.length) ? false : true;
      emits("isInputNotEmpty", !inputContentEmpty.value);
    };
    const onInput = () => {
      isEditorContentEmpty();
    };
    watch(
      () => [inputContentEmpty.value, inputBlur.value],
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emits("onTyping", inputContentEmpty.value, inputBlur.value);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    function onCurrentConversationUpdated(conversation) {
      const prevConversationID = currentConversationID.value;
      currentConversation.value = conversation;
      currentConversationID.value = conversation == null ? void 0 : conversation.conversationID;
      if (prevConversationID !== currentConversationID.value) {
        if (prevConversationID) {
          pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_conversationDraft.DraftManager.setStore(
            prevConversationID,
            inputText.value,
            inputText.value,
            currentQuoteMessage.value
          );
        }
        resetEditor();
        if (currentConversationID.value) {
          pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_utils_conversationDraft.DraftManager.getStore(currentConversationID.value, setEditorContent);
        }
      }
    }
    function onQuoteMessageUpdated(options) {
      currentQuoteMessage.value = options;
    }
    function reset() {
      inputBlur.value = true;
      currentConversation.value = null;
      currentConversationID.value = "";
      currentQuoteMessage.value = null;
      resetEditor();
    }
    __expose({
      resetEditor,
      setEditorContent,
      getEditorContent
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.isMuted
      }, props.isMuted ? {
        b: common_vendor.t(props.muteText)
      } : {}, {
        c: common_vendor.o(handleSendMessage),
        d: common_vendor.o([($event) => common_vendor.isRef(inputText) ? inputText.value = $event.detail.value : null, onInput]),
        e: common_vendor.o(onBlur),
        f: common_vendor.o(onFocus),
        g: common_vendor.unref(inputText)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00dab55f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input/message-input-editor-uniapp.js.map
