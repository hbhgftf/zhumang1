"use strict";
const common_vendor = require("../../../../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      props
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.props.payload.content.guide),
    b: $setup.props.payload.content.pic
  }, $setup.props.payload.content.pic ? {
    c: $setup.props.payload.content.pic
  } : {}, {
    d: common_vendor.t($setup.props.payload.content.name),
    e: common_vendor.t($setup.props.payload.content.desc),
    f: common_vendor.f($setup.props.payload.content.customField, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.customerValue)
      };
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f6227dc8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-order.js.map
