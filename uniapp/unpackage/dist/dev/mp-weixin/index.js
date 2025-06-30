"use strict";
const common_vendor = require("./common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("./pages-ai-desk/ai-desk-customer-uniapp/adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("./pages-ai-desk/ai-desk-customer-uniapp/utils/env.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    // Whether to display the bottom pop-up dialog box
    show: {
      type: Boolean,
      default: false
    },
    // Whether a mask layer is required, the default is true
    modal: {
      type: Boolean,
      default: true
    },
    // Popup box content area height (excluding mask), default is fit-content
    height: {
      type: String,
      default: "fit-content"
    },
    // Whether the pop-up dialog box can be closed by clicking outside, the default is true
    // uniapp only supports closing the pop-up dialog box by clicking the mask
    closeByClickOutside: {
      type: Boolean,
      default: true
    },
    // The rounded angle of the top border corners is 0px by default, i.e. right angle by default
    borderRadius: {
      type: String,
      default: "0px"
    },
    title: {
      type: String,
      default: ""
    },
    // Whether to display the top close button, not displayed by default
    showHeaderCloseButton: {
      type: Boolean,
      default: false
    },
    // Whether to display the submit button at the bottom, not displayed by default
    showFooterSubmitButton: {
      type: Boolean,
      default: false
    },
    // Bottom submit button text, only valid when showFooterSubmitButton is true
    submitButtonContent: {
      type: String,
      default: () => common_vendor.Wt.t("确定")
    }
  },
  emits: ["onOpen", "onClose", "onSubmit"],
  setup(__props, { emit: __emit }) {
    const { ref, watch, nextTick } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const emits = __emit;
    const dialogRef = ref();
    watch(
      () => props.show,
      (newVal, oldVal) => {
        if (newVal === oldVal) {
          return;
        }
        switch (newVal) {
          case true:
            emits("onOpen", dialogRef);
            break;
          case false:
            emits("onClose", dialogRef);
            break;
        }
      }
    );
    const closeBottomPopup = () => {
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork || pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) {
        emits("onClose", dialogRef);
      }
    };
    const submit = () => {
      emits("onSubmit");
      closeBottomPopup();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.show
      }, props.show ? common_vendor.e({
        b: __props.title || __props.showHeaderCloseButton
      }, __props.title || __props.showHeaderCloseButton ? common_vendor.e({
        c: __props.title
      }, __props.title ? {
        d: common_vendor.t(__props.title)
      } : {}, {
        e: __props.showHeaderCloseButton
      }, __props.showHeaderCloseButton ? {
        f: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("关闭")),
        g: common_vendor.o(closeBottomPopup)
      } : {}) : {}, {
        h: __props.showFooterSubmitButton
      }, __props.showFooterSubmitButton ? {
        i: common_vendor.t(__props.submitButtonContent),
        j: common_vendor.o(submit)
      } : {}, {
        k: props.height,
        l: props.borderRadius,
        m: props.borderRadius,
        n: common_vendor.o(() => {
        }),
        o: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) && "bottom-popup-uni"),
        p: common_vendor.n(props.modal && "bottom-popup-modal"),
        q: common_vendor.o(closeBottomPopup)
      }) : {});
    };
  }
});
const BottomPopup = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-376d9e0f"]]);
exports.BottomPopup = BottomPopup;
//# sourceMappingURL=../.sourcemap/mp-weixin/index.js.map
