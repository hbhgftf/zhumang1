"use strict";
const common_vendor = require("../../../../../../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    name: {
      type: String,
      default: ""
    },
    isRequired: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.name),
    b: $props.isRequired
  }, $props.isRequired ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/component-mobile/label-mobile.js.map
