"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../../adapter-vue.js");
const common_vendor = require("../../../../../../../../../../common/vendor.js");
const LabelMobile = () => "./label-mobile.js";
const { computed, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    LabelMobile
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    variableValue: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    isRequired: {
      type: Number,
      default: 0
    },
    nodeStatus: {
      type: Number,
      default: 0
    },
    validator: {
      type: Boolean,
      default: false
    }
  },
  emits: ["input-change"],
  setup(props, { emit }) {
    const text = ref("");
    if (props.variableValue.length != 0) {
      text.value = props.variableValue;
    }
    const onInputChanged = () => {
      emit("input-change", { name: props.name, value: text.value });
    };
    return {
      text,
      onInputChanged,
      props,
      TUITranslateService: common_vendor.Wt
    };
  }
};
if (!Array) {
  const _component_LabelMobile = common_vendor.resolveComponent("LabelMobile");
  _component_LabelMobile();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      name: $props.name,
      ["is-required"]: $props.isRequired
    }),
    b: $props.placeholder,
    c: common_vendor.o([($event) => $setup.text = $event.detail.value, (...args) => $setup.onInputChanged && $setup.onInputChanged(...args)]),
    d: $setup.text,
    e: $props.validator
  }, $props.validator ? {
    f: common_vendor.t($setup.TUITranslateService.t("AIDesk.请填写必填项"))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/component-mobile/input-mobile.js.map
