"use strict";
const common_vendor = require("../../../../../../../../../../common/vendor.js");
require("../../../../../../../../adapter-vue-uniapp.js");
const index = require("../../../../../../../../../../index.js");
if (!Math) {
  common_vendor.unref(index.BottomPopup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "form-popup",
  props: {
    show: { type: Boolean, default: false },
    title: { default: "" }
  },
  emits: ["onClose", "onSubmit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    function onClose() {
      emits("onClose");
    }
    function onSubmit() {
      emits("onSubmit");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClose),
        b: common_vendor.o(onSubmit),
        c: common_vendor.p({
          show: props.show,
          title: props.title,
          borderRadius: "20px"
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/component-mobile/form-popup.js.map
