"use strict";
const common_vendor = require("../../../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../../utils/env.js");
const _sfc_main = {
  props: {
    payload: {
      type: Object,
      default: () => ({ content: { header: "", items: [] }, status: 0 })
    }
  },
  emits: ["input-click"],
  setup(props, { emit }) {
    let isClicked = false;
    const listItemClick = (branch) => {
      if (!branch.content) {
        return;
      }
      emit("input-click", branch);
      isClicked = true;
    };
    return {
      props,
      isClicked,
      listItemClick,
      isPC: pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC,
      TUITranslateService: common_vendor.Wt
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.props.payload.content.header
  }, $setup.props.payload.content.header ? {
    b: common_vendor.t($setup.props.payload.content.header),
    c: common_vendor.n($setup.isPC ? "card-title" : "card-title-h5")
  } : {}, {
    d: $setup.props.payload.status == 0 && !$setup.isClicked
  }, $setup.props.payload.status == 0 && !$setup.isClicked ? {
    e: common_vendor.f($setup.props.payload.content.items, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content || $setup.TUITranslateService.t("AIDesk.分支选项异常")),
        b: index,
        c: common_vendor.n(item.content ? "" : "warning-item"),
        d: common_vendor.o(($event) => $setup.listItemClick(item), index)
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-branch/branch-pc.js.map
