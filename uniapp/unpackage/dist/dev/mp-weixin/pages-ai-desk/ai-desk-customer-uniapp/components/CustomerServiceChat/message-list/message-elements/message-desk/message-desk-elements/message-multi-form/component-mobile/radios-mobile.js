"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../../adapter-vue.js");
const common_assets = require("../../../../../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../../../utils/env.js");
const common_vendor = require("../../../../../../../../../../common/vendor.js");
const Label = () => "./label-mobile.js";
const Icon = () => "../../customer-icon.js";
const { ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Label,
    Icon
  },
  props: {
    chooseItemList: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: ""
    },
    isRequired: {
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
    const selectedOption = ref("");
    const checkedIcon = ref("");
    const changeSelectedIcon = (name) => {
      if (selectedOption.value === name)
        return common_assets.radioCheckIcon;
      else
        return common_assets.radioUncheckIcon;
    };
    const clickItem = (index) => {
      selectedOption.value = props.chooseItemList[index];
      emit("input-change", { name: props.name, value: selectedOption.value });
    };
    const onInputChanged = () => {
      emit("input-change", { name: props.name, value: selectedOption.value });
    };
    return {
      onInputChanged,
      selectedOption,
      clickItem,
      isUniFrameWork: pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork,
      radioUncheckIcon: common_assets.radioUncheckIcon,
      radioCheckIcon: common_assets.radioCheckIcon,
      changeSelectedIcon,
      checkedIcon,
      TUITranslateService: common_vendor.Wt
    };
  }
};
if (!Array) {
  const _component_Label = common_vendor.resolveComponent("Label");
  _component_Label();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      name: $props.name,
      ["is-required"]: $props.isRequired
    }),
    b: $props.validator
  }, $props.validator ? {
    c: common_vendor.t($setup.TUITranslateService.t("AIDesk.请填写必填项"))
  } : {}, {
    d: common_vendor.f($props.chooseItemList, (item, index, i0) => {
      return common_vendor.e($setup.isUniFrameWork ? {
        a: $setup.changeSelectedIcon(item)
      } : {
        b: $setup.changeSelectedIcon(item)
      }, {
        c: common_vendor.t(item),
        d: common_vendor.o(($event) => $setup.clickItem(index), index),
        e: index
      });
    }),
    e: $setup.isUniFrameWork
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/component-mobile/radios-mobile.js.map
