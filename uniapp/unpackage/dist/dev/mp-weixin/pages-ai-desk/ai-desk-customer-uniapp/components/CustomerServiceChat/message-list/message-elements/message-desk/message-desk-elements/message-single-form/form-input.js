"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const common_assets = require("../../../../../../../../../common/assets.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const Icon = () => "../customer-icon.js";
const { computed, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["input-submit"],
  setup(props, { emit }) {
    const disabled = ref(false);
    const text = ref("");
    const isShowForm = ref(false);
    const isFinish = ref(false);
    const listItemClick = () => {
      disabled.value = true;
      isShowForm.value = false;
      isFinish.value = true;
    };
    const showForm = () => {
      isShowForm.value = true;
    };
    return {
      disabled,
      text,
      listItemClick,
      props,
      iconForm: common_assets.iconForm,
      isShowForm,
      showForm,
      iconSucess: common_assets.iconSucess,
      isFinish,
      TUITranslateService: common_vendor.Wt
    };
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  _component_Icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$setup.isShowForm && !$setup.isFinish
  }, !$setup.isShowForm && !$setup.isFinish ? {
    b: common_vendor.p({
      src: $setup.iconForm,
      width: "65px",
      height: "65px"
    }),
    c: common_vendor.t($setup.props.title),
    d: common_vendor.t($setup.TUITranslateService.t("AIDesk.立即填写")),
    e: common_vendor.o((...args) => $setup.showForm && $setup.showForm(...args))
  } : $setup.isShowForm && !$setup.isFinish ? common_vendor.e({
    g: common_vendor.t("*")
  }, {
    h: $setup.text,
    i: common_vendor.o(($event) => $setup.text = $event.detail.value)
  }) : $setup.isFinish ? {
    k: common_vendor.t($setup.props.title),
    l: common_vendor.p({
      src: $setup.iconSucess
    }),
    m: common_vendor.t($setup.TUITranslateService.t("AIDesk.已提交")),
    n: common_vendor.t($setup.text)
  } : {}, {
    f: $setup.isShowForm && !$setup.isFinish,
    j: $setup.isFinish
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-single-form/form-input.js.map
