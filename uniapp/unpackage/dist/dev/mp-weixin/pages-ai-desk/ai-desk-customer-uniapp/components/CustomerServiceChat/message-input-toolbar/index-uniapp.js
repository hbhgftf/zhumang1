"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
if (!Math) {
  (EmojiPickerDialog + ImageUpload + VideoUpload)();
}
const ImageUpload = () => "./image-upload/index.js";
const VideoUpload = () => "./video-upload/index.js";
const EmojiPickerDialog = () => "./emoji-picker/emoji-picker-dialog.js";
const __default__ = {
  options: {
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "index-uniapp",
  props: {
    displayType: {},
    isH5EmojiShow: { type: Boolean },
    isH5ToolShow: { type: Boolean }
  },
  setup(__props) {
    const { ref, onUnmounted, onMounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const currentConversation = ref();
    const isGroup = ref(false);
    const isSwiperIndicatorDotsEnable = ref(false);
    const onCurrentConversationUpdate = (conversation) => {
      var _a;
      currentConversation.value = conversation;
      isGroup.value = ((_a = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a.type) === common_vendor.qt.TYPES.CONV_GROUP;
    };
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.displayType === "emojiPicker"
      }, props.displayType === "emojiPicker" ? {} : common_vendor.e({
        b: common_vendor.p({
          imageSourceType: "camera"
        }),
        c: common_vendor.p({
          imageSourceType: "album"
        }),
        d: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && common_vendor.unref(common_vendor.i).chooseMedia !== void 0
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && common_vendor.unref(common_vendor.i).chooseMedia !== void 0 ? {
        e: common_vendor.p({
          videoSourceType: "album"
        })
      } : {}, {
        f: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && common_vendor.unref(common_vendor.i).chooseMedia !== void 0
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) && common_vendor.unref(common_vendor.i).chooseMedia !== void 0 ? {
        g: common_vendor.p({
          videoSourceType: "camera"
        })
      } : {}, {
        h: common_vendor.unref(isSwiperIndicatorDotsEnable)
      }));
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input-toolbar/index-uniapp.js.map
