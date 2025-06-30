"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../adapter-vue.js");
const common_vendor = require("../../../../../../../../common/vendor.js");
const common_assets = require("../../../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../utils/env.js");
const Icon = () => "./customer-icon.js";
const { computed, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage", "heightChanged"],
  setup(props, { emit }) {
    const isSelected = ref(false);
    const content = computed(() => {
      var _a;
      return ((_a = props == null ? void 0 : props.payload) == null ? void 0 : _a.content) || {
        header: void 0,
        items: []
      };
    });
    const handleContentListItemClick = (branch) => {
      if (!branch.content) {
        return;
      }
      if (!isSelected.value) {
        isSelected.value = true;
        emit("sendMessage", { text: branch.content });
      }
    };
    return {
      content,
      handleContentListItemClick,
      iconRight: common_assets.iconRight,
      iconQuestion: common_assets.iconQuestion,
      isSelected,
      isPC: pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC,
      TUITranslateService: common_vendor.Wt
    };
  },
  mounted() {
    this.$emit("heightChanged");
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  _component_Icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.content.header || $setup.content.title
  }, $setup.content.header || $setup.content.title ? {
    b: common_vendor.p({
      src: $setup.iconQuestion
    }),
    c: common_vendor.t($setup.content.header || $setup.content.title),
    d: common_vendor.n($setup.isPC ? "branch-bubble" : "branch-bubble-h5")
  } : {}, {
    e: common_vendor.f($setup.content.items, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content || $setup.TUITranslateService.t("AIDesk.分支选项异常")),
        b: index,
        c: common_vendor.n(item.content ? "" : "warning-item"),
        d: common_vendor.o(($event) => $setup.handleContentListItemClick(item), index)
      };
    }),
    f: common_vendor.n($setup.isPC ? "branch-bubble" : "branch-bubble-h5"),
    g: common_vendor.n($setup.isSelected ? "branch-item-selected" : ""),
    h: $setup.content.header ? "1px 0 0px 0" : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-branch.js.map
