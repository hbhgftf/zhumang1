"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const BranchPc = () => "./branch-pc.js";
const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    BranchPc
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage", "heightChanged"],
  setup(props, { emit }) {
    const payload = computed(() => {
      return props.payload;
    });
    const handleContentListItemClick = (branch) => {
      emit("sendMessage", { text: branch.content });
    };
    const handleFormSaveInputSubmit = (text) => {
      emit("sendMessage", { text });
    };
    return {
      payload,
      handleContentListItemClick,
      handleFormSaveInputSubmit
    };
  },
  mounted() {
    this.$emit("heightChanged");
  }
};
if (!Array) {
  const _component_BranchPc = common_vendor.resolveComponent("BranchPc");
  _component_BranchPc();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.handleContentListItemClick),
    b: common_vendor.p({
      payload: $setup.payload
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-branch/index.js.map
