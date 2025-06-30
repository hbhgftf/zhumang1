"use strict";
const common_vendor = require("../../../../../common/vendor.js");
require("../../../adapter-vue-uniapp.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    content: { default: () => ({}) },
    messageItem: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.messageItem.status === "unSend" && props.messageItem.progress < 1
      }, props.messageItem.status === "unSend" && props.messageItem.progress < 1 ? {
        b: Math.round(props.messageItem.progress * 100)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f515871"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/ProgressMessage/index.js.map
