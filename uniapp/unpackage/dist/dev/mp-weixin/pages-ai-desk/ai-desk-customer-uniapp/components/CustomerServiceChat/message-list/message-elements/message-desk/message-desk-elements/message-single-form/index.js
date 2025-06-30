"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const FormBranch = () => "./form-branch.js";
const FormInput = () => "./form-input.js";
const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    FormBranch,
    FormInput
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage"],
  setup(props, { emit }) {
    const content = computed(() => {
      var _a;
      return ((_a = props.payload) == null ? void 0 : _a.content) || {
        type: 0,
        header: "",
        items: []
      };
    });
    const handleContentListItemClick = (branch) => {
      emit("sendMessage", { text: branch.content });
    };
    const handleFormSaveInputSubmit = (text) => {
      emit("sendMessage", { text });
    };
    return {
      content,
      handleContentListItemClick,
      handleFormSaveInputSubmit
    };
  }
};
if (!Array) {
  const _component_FormBranch = common_vendor.resolveComponent("FormBranch");
  const _component_FormInput = common_vendor.resolveComponent("FormInput");
  (_component_FormBranch + _component_FormInput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.content.type === 1
  }, $setup.content.type === 1 ? {
    b: common_vendor.o($setup.handleContentListItemClick),
    c: common_vendor.p({
      title: $setup.content.header,
      list: $setup.content.items
    })
  } : {
    d: common_vendor.o($setup.handleFormSaveInputSubmit),
    e: common_vendor.p({
      title: $setup.content.header
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-single-form/index.js.map
