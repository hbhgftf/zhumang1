"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    visible: { type: Boolean, default: true },
    zIndex: { default: 9999 },
    useMask: { type: Boolean, default: true },
    maskColor: { default: "rgba(0, 0, 0, 0.6)" },
    isFullScreen: { type: Boolean, default: true },
    width: { default: "auto" },
    height: { default: "auto" }
  },
  emits: ["onOverlayClick"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { ref, watch, withDefaults } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const overlayDomRef = ref();
    const isOverlayShow = ref(props.visible);
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          isOverlayShow.value = true;
        } else {
          setTimeout(() => {
            isOverlayShow.value = false;
          }, 150);
        }
      },
      {
        immediate: true
      }
    );
    function onOverlayClick() {
      emits("onOverlayClick");
    }
    __expose({
      overlayDomRef
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isOverlayShow)
      }, common_vendor.unref(isOverlayShow) ? common_vendor.e({
        b: props.useMask
      }, props.useMask ? {
        c: props.visible ? 1 : "",
        d: props.maskColor,
        e: common_vendor.o(onOverlayClick),
        f: common_vendor.o(onOverlayClick)
      } : {}, {
        g: props.isFullScreen ? 1 : "",
        h: props.isFullScreen ? "fixed" : "absolute",
        i: props.zIndex
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-355a3c48"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Overlay/index.js.map
