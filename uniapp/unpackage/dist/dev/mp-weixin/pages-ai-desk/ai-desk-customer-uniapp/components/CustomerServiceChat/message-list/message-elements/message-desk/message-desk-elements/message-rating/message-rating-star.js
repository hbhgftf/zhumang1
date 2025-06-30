"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../../../../constant.js");
const common_assets = require("../../../../../../../../../common/assets.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const Icon = () => "../customer-icon.js";
const { computed, ref, watchEffect } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon
  },
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
    const value = ref(-1);
    const hoverValue = ref(-1);
    const hasExpire = ref(false);
    watchEffect(() => {
      sessionId.value = props.ratingTemplate.sessionId || "";
      if (props.ratingTemplate.selected != void 0) {
        for (let i = 0; i < props.ratingTemplate.menu.length; i++) {
          if (props.ratingTemplate.menu[i].id == props.ratingTemplate.selected.id) {
            hasReply.value = true;
            value.value = i;
            break;
          }
        }
      }
      const timestamp = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      if (timestamp > props.ratingTemplate.expireTime) {
        hasExpire.value = true;
      }
    });
    const desc = computed(() => {
      var _a;
      return (_a = props.ratingTemplate) == null ? void 0 : _a.menu.map((item) => {
        return item.content;
      });
    });
    const starList = computed(() => {
      var _a;
      return (_a = props.ratingTemplate) == null ? void 0 : _a.menu.map((item, index) => {
        if (hoverValue.value !== -1) {
          return index <= hoverValue.value ? 1 : 0;
        } else {
          return index <= value.value ? 1 : 0;
        }
      });
    });
    const setValue = (val) => {
      if (hasReply.value) {
        return;
      }
      value.value = val;
    };
    const setHoverValue = (value2) => {
      if (hasReply.value) {
        return;
      }
      hoverValue.value = value2;
    };
    const submitRatingStar = async () => {
      if (value.value < 0) {
        return;
      }
      const submitData = {
        data: JSON.stringify({
          src: pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.MENU_SELECTED,
          menuSelected: {
            id: props.ratingTemplate.menu[value.value].id,
            content: props.ratingTemplate.menu[value.value].content,
            sessionId: sessionId.value
          },
          customerServicePlugin: 0
        })
      };
      hasReply.value = true;
      emit("sendMessage", submitData);
    };
    return {
      props,
      hasReply,
      sessionId,
      value,
      hoverValue,
      hasExpire,
      desc,
      starList,
      setValue,
      setHoverValue,
      submitRatingStar,
      star: common_assets.star,
      starLine: common_assets.starLine,
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
    a: common_vendor.t($setup.props.ratingTemplate.head),
    b: common_vendor.t($setup.TUITranslateService.t("AIDesk.请对本次服务进行评价")),
    c: common_vendor.f($setup.starList, (item, index, i0) => {
      return common_vendor.e({
        a: item === 1
      }, item === 1 ? {
        b: "f075765c-0-" + i0,
        c: common_vendor.p({
          src: $setup.star,
          width: "25px",
          height: "25px"
        })
      } : {
        d: "f075765c-1-" + i0,
        e: common_vendor.p({
          src: $setup.starLine,
          width: "25px",
          height: "25px"
        })
      }, {
        f: index,
        g: common_vendor.o(($event) => $setup.setValue(index), index),
        h: common_vendor.o(($event) => $setup.setHoverValue(index), index),
        i: common_vendor.o(($event) => $setup.setHoverValue(-1), index)
      });
    }),
    d: common_vendor.t($setup.hoverValue === -1 ? $setup.value === -1 ? $setup.TUITranslateService.t("AIDesk.如果满意请给好评哦～") : $setup.desc[$setup.value] : $setup.desc[$setup.hoverValue]),
    e: "10px",
    f: "10px",
    g: common_vendor.t($setup.TUITranslateService.t("AIDesk.提交评价")),
    h: $setup.hasReply || $setup.hasExpire,
    i: common_vendor.o((...args) => $setup.submitRatingStar && $setup.submitRatingStar(...args)),
    j: $setup.hasReply
  }, $setup.hasReply ? {
    k: common_vendor.t($setup.props.ratingTemplate.tail),
    l: "20px"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f075765c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-rating/message-rating-star.js.map
