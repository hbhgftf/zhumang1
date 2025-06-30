"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../emoji-config/index.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    displayType: { default: "editor" }
  },
  setup(__props) {
    const { ref, computed, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const quoteMessage = ref();
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CHAT, {
        quoteMessage: onQuoteMessageUpdated
      });
    });
    const quoteContentText = computed(() => {
      var _a, _b;
      let _quoteContentText;
      switch ((_a = quoteMessage.value) == null ? void 0 : _a.type) {
        case TYPES.MSG_TEXT:
          _quoteContentText = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithKeysToEmojiNames(
            (_b = quoteMessage.value.payload) == null ? void 0 : _b.text
          );
          break;
        case TYPES.MSG_IMAGE:
          _quoteContentText = common_vendor.Wt.t("TUIChat.图片");
          break;
        case TYPES.MSG_AUDIO:
          _quoteContentText = common_vendor.Wt.t("TUIChat.语音");
          break;
        case TYPES.MSG_VIDEO:
          _quoteContentText = common_vendor.Wt.t("TUIChat.视频");
          break;
        case TYPES.MSG_FILE:
          _quoteContentText = common_vendor.Wt.t("TUIChat.文件");
          break;
        case TYPES.MSG_CUSTOM:
          _quoteContentText = common_vendor.Wt.t("TUIChat.自定义");
          break;
        case TYPES.MSG_FACE:
          _quoteContentText = common_vendor.Wt.t("TUIChat.表情");
          break;
        case TYPES.MSG_MERGER:
          _quoteContentText = common_vendor.Wt.t("TUIChat.聊天记录");
          break;
        default:
          _quoteContentText = common_vendor.Wt.t("TUIChat.消息");
          break;
      }
      return _quoteContentText;
    });
    function cancelQuote() {
      common_vendor.Jt.update(common_vendor.o$1.CHAT, "quoteMessage", {
        message: void 0,
        type: "quote"
      });
    }
    function onQuoteMessageUpdated(options) {
      if ((options == null ? void 0 : options.message) && (options == null ? void 0 : options.type) === "quote") {
        quoteMessage.value = options.message;
      } else {
        quoteMessage.value = void 0;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: Boolean(common_vendor.unref(quoteMessage)) && props.displayType !== "audio"
      }, Boolean(common_vendor.unref(quoteMessage)) && props.displayType !== "audio" ? {
        b: common_vendor.t(common_vendor.unref(quoteMessage).nick || common_vendor.unref(quoteMessage).from),
        c: common_vendor.t(common_vendor.unref(quoteContentText)),
        d: common_vendor.o(cancelQuote),
        e: common_vendor.p({
          file: common_vendor.unref(common_assets.closeIcon),
          width: "11px",
          height: "11px"
        }),
        f: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? 1 : ""
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-051ab80a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input/message-input-quote/index.js.map
