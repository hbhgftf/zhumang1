"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../../../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../../../../constant.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const RatingStar = () => "./message-rating-star.js";
const RatingNumber = () => "./message-rating-number.js";
const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    RatingStar,
    RatingNumber
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage"],
  setup(props, { emit }) {
    const ratingTemplate = computed(() => {
      const data = props.message && pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(props.message.payload.data);
      return data == null ? void 0 : data.menuContent;
    });
    const sendCustomMessage = (data) => {
      emit("sendMessage", data);
    };
    return {
      sendCustomMessage,
      ratingTemplate,
      RATING_TEMPLATE_TYPE: pagesAiDesk_aiDeskCustomerUniapp_constant.RATING_TEMPLATE_TYPE
    };
  }
};
if (!Array) {
  const _component_RatingStar = common_vendor.resolveComponent("RatingStar");
  const _component_RatingNumber = common_vendor.resolveComponent("RatingNumber");
  (_component_RatingStar + _component_RatingNumber)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.ratingTemplate.type === $setup.RATING_TEMPLATE_TYPE.STAR
  }, $setup.ratingTemplate.type === $setup.RATING_TEMPLATE_TYPE.STAR ? {
    b: common_vendor.o($setup.sendCustomMessage),
    c: common_vendor.p({
      ratingTemplate: $setup.ratingTemplate
    })
  } : {
    d: common_vendor.o($setup.sendCustomMessage),
    e: common_vendor.p({
      ratingTemplate: $setup.ratingTemplate
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-rating/index.js.map
