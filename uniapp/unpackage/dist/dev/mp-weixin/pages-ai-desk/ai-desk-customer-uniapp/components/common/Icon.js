"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../utils/env.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Icon",
  props: {
    file: { default: "" },
    size: {},
    width: { default: "20px" },
    height: { default: "20px" },
    hotAreaSize: {}
  },
  emits: ["onClick"],
  setup(__props, { emit: __emit }) {
    const { withDefaults, computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const iconHotAreaSize = computed(() => {
      if (!props.hotAreaSize) {
        return void 0;
      }
      if (isNaN(Number(props.hotAreaSize))) {
        return String(props.hotAreaSize);
      }
      return `${props.hotAreaSize}px`;
    });
    const iconWidth = computed(() => {
      return props.size ? props.size : props.width;
    });
    const iconHeight = computed(() => {
      return props.size ? props.size : props.height;
    });
    const handleImgClick = (e) => {
      emits("onClick", e);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp)
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp) ? {
        b: props.file,
        c: common_vendor.unref(iconWidth),
        d: common_vendor.unref(iconHeight)
      } : {
        e: props.file,
        f: common_vendor.unref(iconWidth),
        g: common_vendor.unref(iconHeight)
      }, {
        h: common_vendor.unref(iconHotAreaSize),
        i: common_vendor.o(handleImgClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7ac21aed"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Icon.js.map
