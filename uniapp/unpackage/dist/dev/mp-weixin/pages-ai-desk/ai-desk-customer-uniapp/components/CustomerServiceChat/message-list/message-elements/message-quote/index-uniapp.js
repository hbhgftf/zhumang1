"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../../../../common/Toast/index-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface = require("./interface.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../../emoji-config/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("../../../../common/Toast/type.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-uniapp",
  props: {
    message: { default: () => ({}) }
  },
  emits: ["scrollTo", "blinkMessage"],
  setup(__props, { emit: __emit }) {
    const { computed, ref, onMounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    let selfAddValue = 0;
    const messageQuoteText = ref("");
    const hasQuoteContent = ref(false);
    const messageQuoteContent = ref({});
    const isMessageRevoked = computed(() => {
      var _a;
      try {
        const cloudCustomData = JSON.parse(
          ((_a = props.message) == null ? void 0 : _a.cloudCustomData) || "{}"
        );
        const quotedMessageModel = common_vendor.Jt.getMessageModel(
          cloudCustomData.messageReply.messageID
        );
        return quotedMessageModel == null ? void 0 : quotedMessageModel.isRevoked;
      } catch (error) {
        return true;
      }
    });
    onMounted(() => {
      var _a;
      try {
        const cloudCustomData = JSON.parse(
          ((_a = props.message) == null ? void 0 : _a.cloudCustomData) || "{}"
        );
        hasQuoteContent.value = Boolean(cloudCustomData.messageReply);
        if (hasQuoteContent.value) {
          messageQuoteContent.value = cloudCustomData.messageReply;
          messageQuoteText.value = performQuoteContent(messageQuoteContent.value);
        }
      } catch (error) {
        hasQuoteContent.value = false;
      }
    });
    function performQuoteContent(params) {
      let messageKey = "";
      let quoteContent = "";
      switch (params.messageType) {
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_TEXT:
          messageKey = "[文本]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_CUSTOM:
          messageKey = "[自定义消息]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_IMAGE:
          messageKey = "[图片]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_SOUND:
          messageKey = "[音频]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_VIDEO:
          messageKey = "[视频]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_FILE:
          messageKey = "[文件]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_LOCATION:
          messageKey = "[地理位置]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_FACE:
          messageKey = "[动画表情]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_GROUP_TIPS:
          messageKey = "[群提示]";
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_MERGER:
          messageKey = "[聊天记录]";
          break;
        default:
          messageKey = "[消息]";
          break;
      }
      if ([pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_TEXT, pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageQuote_interface.MessageQuoteTypeEnum.TYPE_MERGER].includes(
        params.messageType
      )) {
        quoteContent = params.messageAbstract;
      }
      return quoteContent ? quoteContent : common_vendor.Wt.t(`TUIChat.${messageKey}`);
    }
    async function scrollToOriginalMessage() {
      var _a;
      if (isMessageRevoked.value) {
        return;
      }
      const originMessageID = (_a = messageQuoteContent.value) == null ? void 0 : _a.messageID;
      const currentMessageList = common_vendor.Jt.getData(common_vendor.o$1.CHAT, "messageList");
      const isOriginalMessageInScreen = currentMessageList.some(
        (msg) => msg.ID === originMessageID
      );
      if (originMessageID && isOriginalMessageInScreen) {
        try {
          const scrollViewRect = await common_vendor.T(
            "#messageScrollList",
            "messageList"
          );
          const originalMessageRect = await common_vendor.T(
            "#tui-" + originMessageID,
            "messageList"
          );
          const { scrollTop } = await common_vendor.P(
            "#messageScrollList",
            "messageList"
          );
          const finalScrollTop = originalMessageRect.top + scrollTop - scrollViewRect.top - selfAddValue++ % 2;
          const isNeedScroll = originalMessageRect.top < scrollViewRect.top;
          if (isNeedScroll) {
            emits("scrollTo", finalScrollTop);
          }
          emits("blinkMessage", originMessageID);
        } catch (error) {
          common_vendor.index.__f__("error", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-quote/index-uniapp.vue:196", error);
        }
      } else {
        pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
          message: common_vendor.Wt.t("TUIChat.无法定位到原消息"),
          type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.WARNING
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(hasQuoteContent)
      }, common_vendor.unref(hasQuoteContent) ? {
        b: _ctx.message.flow === "out" ? 1 : "",
        c: _ctx.message.flow === "in" ? 1 : ""
      } : {}, {
        d: common_vendor.unref(hasQuoteContent)
      }, common_vendor.unref(hasQuoteContent) ? common_vendor.e({
        e: common_vendor.unref(isMessageRevoked)
      }, common_vendor.unref(isMessageRevoked) ? {
        f: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.引用内容已撤回"))
      } : {
        g: common_vendor.t(common_vendor.unref(messageQuoteContent).messageSender),
        h: common_vendor.t(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithKeysToEmojiNames)(common_vendor.unref(messageQuoteText)))
      }, {
        i: _ctx.message.flow === "out" ? 1 : "",
        j: _ctx.message.flow === "in" ? 1 : "",
        k: common_vendor.o(scrollToOriginalMessage)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17895d44"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-quote/index-uniapp.js.map
