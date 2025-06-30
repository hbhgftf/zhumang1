"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../utils/env.js");
const common_vendor = require("../../../../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    src: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "16px"
    },
    height: {
      type: String,
      default: "16px"
    }
  },
  setup(props) {
    return {
      props,
      isApp: pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.isApp
  }, $setup.isApp ? {
    b: $setup.props.src,
    c: $setup.props.width,
    d: $setup.props.height
  } : {
    e: $setup.props.src,
    f: $setup.props.width,
    g: $setup.props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-488ba04c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/customer-icon.js.map
