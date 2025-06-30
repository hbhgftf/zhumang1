"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const FormMobile = () => "./form-mobile.js";
const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    FormMobile
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage", "showFormPopup"],
  setup(props, { emit }) {
    const payloads = computed(() => {
      return props.payload;
    });
    const handleSendForm = (data) => {
      emit("sendMessage", data);
    };
    const handleShowFormPopup = (data) => {
      emit("showFormPopup", data);
    };
    return {
      payloads,
      handleSendForm,
      handleShowFormPopup
    };
  }
};
if (!Array) {
  const _component_FormMobile = common_vendor.resolveComponent("FormMobile");
  _component_FormMobile();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.handleSendForm),
    b: common_vendor.o($setup.handleShowFormPopup),
    c: common_vendor.p({
      payload: $setup.payloads
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/index.js.map
