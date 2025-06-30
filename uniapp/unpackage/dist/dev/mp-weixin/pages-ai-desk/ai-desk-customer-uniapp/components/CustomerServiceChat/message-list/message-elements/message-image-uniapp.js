"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const DEFAULT_MAX_SIZE = 155;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-image-uniapp",
  props: {
    content: { default: () => ({}) },
    messageItem: { default: () => ({}) }
  },
  emits: ["previewImage"],
  setup(__props, { emit: __emit }) {
    const { watchEffect, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const imageStyles = ref({ width: "auto", height: "auto" });
    const genImageStyles = (value) => {
      const { width, height } = value;
      if (width === 0 || height === 0) {
        return;
      }
      let imageWidth = 0;
      let imageHeight = 0;
      if (width >= height) {
        imageWidth = DEFAULT_MAX_SIZE;
        imageHeight = DEFAULT_MAX_SIZE * height / width;
      } else {
        imageWidth = DEFAULT_MAX_SIZE * width / height;
        imageHeight = DEFAULT_MAX_SIZE;
      }
      imageStyles.value.width = imageWidth + "px";
      imageStyles.value.height = imageHeight + "px";
    };
    watchEffect(() => {
      genImageStyles(props.content);
    });
    const imageLoad = (event) => {
      genImageStyles(event.detail);
    };
    const handleImagePreview = () => {
      var _a;
      if (((_a = props.messageItem) == null ? void 0 : _a.status) === "success" || props.messageItem.progress === 1) {
        emits("previewImage");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: props.content.url,
        b: common_vendor.unref(imageStyles).width,
        c: common_vendor.unref(imageStyles).height,
        d: common_vendor.o(imageLoad),
        e: common_vendor.o(handleImagePreview)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af89fe5b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-image-uniapp.js.map
