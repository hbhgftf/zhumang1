"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../../../../constant.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const { computed, ref, watchEffect } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  props: {
    ratingTemplate: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["sendMessage"],
  setup(props, { emit }) {
    const hasReply = ref(false);
    const sessionId = ref("");
    const selectValue = ref(-1);
    const hoverValue = ref(-1);
    const hasExpire = ref(false);
    const desc = computed(() => {
      var _a;
      return (_a = props.ratingTemplate) == null ? void 0 : _a.menu.map((item) => item.content);
    });
    const numberList = computed(() => {
      var _a;
      return (_a = props.ratingTemplate) == null ? void 0 : _a.menu.map((item, index) => index);
    });
    watchEffect(() => {
      sessionId.value = props.ratingTemplate.sessionId || "";
      if (props.ratingTemplate.selected != void 0) {
        for (let i = 0; i < props.ratingTemplate.menu.length; i++) {
          if (props.ratingTemplate.menu[i].id == props.ratingTemplate.selected.id) {
            hasReply.value = true;
            selectValue.value = i;
            break;
          }
        }
      }
      const timestamp = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      if (timestamp > props.ratingTemplate.expireTime) {
        hasExpire.value = true;
      }
    });
    const setValue = (val) => {
      if (!hasReply.value) {
        selectValue.value = val;
      }
    };
    const setHoverValue = (value) => {
      if (!hasReply.value) {
        hoverValue.value = value;
      }
    };
    const submitRatingStar = () => {
      if (selectValue.value >= 0) {
        const submitData = {
          data: JSON.stringify({
            src: pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.MENU_SELECTED,
            menuSelected: {
              id: props.ratingTemplate.menu[selectValue.value].id,
              content: props.ratingTemplate.menu[selectValue.value].content,
              sessionId: sessionId.value
            },
            customerServicePlugin: 0
          })
        };
        hasReply.value = true;
        emit("sendMessage", submitData);
      }
    };
    return {
      props,
      hasReply,
      sessionId,
      selectValue,
      hoverValue,
      hasExpire,
      desc,
      numberList,
      setValue,
      setHoverValue,
      submitRatingStar,
      TUITranslateService: common_vendor.Wt
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.props.ratingTemplate.head),
    b: common_vendor.t($setup.TUITranslateService.t("AIDesk.请对本次服务进行评价")),
    c: common_vendor.f($setup.numberList, (item, index, i0) => {
      return {
        a: common_vendor.t(item + 1),
        b: index,
        c: !(index !== $setup.selectValue && index !== $setup.hoverValue) ? 1 : "",
        d: index !== $setup.selectValue && index !== $setup.hoverValue ? 1 : "",
        e: index === 0 ? "0px" : "20px",
        f: common_vendor.o(($event) => $setup.setValue(index), index),
        g: common_vendor.o(($event) => $setup.setHoverValue(index), index),
        h: common_vendor.o(($event) => $setup.setHoverValue(-1), index)
      };
    }),
    d: "5px",
    e: common_vendor.t($setup.hoverValue === -1 ? $setup.selectValue === -1 ? $setup.TUITranslateService.t("AIDesk.如果满意请给好评哦～") : $setup.desc[$setup.selectValue] : $setup.desc[$setup.hoverValue]),
    f: "10px",
    g: "10px",
    h: common_vendor.t($setup.TUITranslateService.t("AIDesk.提交评价")),
    i: $setup.hasReply || $setup.hasExpire,
    j: common_vendor.o((...args) => $setup.submitRatingStar && $setup.submitRatingStar(...args)),
    k: $setup.hasReply
  }, $setup.hasReply ? {
    l: common_vendor.t($setup.props.ratingTemplate.tail),
    m: "20px"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e6481d49"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-rating/message-rating-number.js.map
