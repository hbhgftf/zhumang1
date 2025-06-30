"use strict";
const common_vendor = require("../../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../utils/env.js");
const _sfc_main = {
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage"],
  setup(props) {
    const jumpProductCard = () => {
      const { url } = props.payload.content;
      if (url.startsWith("https://") || url.startsWith("http://"))
        ;
      else {
        common_vendor.index.navigateTo({
          url
        });
      }
    };
    return {
      props,
      isApp: pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp,
      jumpProductCard,
      TUITranslateService: common_vendor.Wt
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.isApp
  }, $setup.isApp ? {
    b: $setup.props.payload.content.pic
  } : {
    c: $setup.props.payload.content.pic
  }, {
    d: common_vendor.t($setup.props.payload.content.header),
    e: common_vendor.t($setup.props.payload.content.desc),
    f: common_vendor.t($setup.TUITranslateService.t("AIDesk.跳转")),
    g: common_vendor.o((...args) => $setup.jumpProductCard && $setup.jumpProductCard(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18b13f09"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-product-card.js.map
