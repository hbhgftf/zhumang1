"use strict";
const common_vendor = require("../../../../../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ["input-click"],
  setup(props, { emit }) {
    const listItemClick = (branch) => {
      emit("input-click", branch);
    };
    return {
      props,
      listItemClick
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.props.title
  }, $setup.props.title ? {
    b: common_vendor.t($setup.props.title)
  } : {}, {
    c: common_vendor.f($setup.props.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content),
        b: index,
        c: common_vendor.o(($event) => $setup.listItemClick(item), index)
      };
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-single-form/form-branch.js.map
