"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-location",
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const { watchEffect, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const data = ref();
    watchEffect(() => {
      data.value = props.content;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(data).description),
        b: common_vendor.unref(data).url,
        c: common_vendor.unref(data).href,
        d: common_vendor.unref(common_vendor.Wt).t("AIDesk.跳转")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-733083df"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-location.js.map
