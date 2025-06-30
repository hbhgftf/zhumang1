"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
if (!Math) {
  Overlay();
}
const Overlay = () => "../Overlay/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    visible: { type: Boolean, default: true },
    popDirection: { default: "bottom" },
    useMask: { type: Boolean, default: true },
    isFullScreen: { type: Boolean, default: true },
    overlayColor: {},
    drawerStyle: { default: () => ({}) }
  },
  emits: ["onOverlayClick"],
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    const { ref, watch } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const drawerDomRef = ref();
    const overlayDomInstanceRef = ref();
    const isDrawerShow = ref(false);
    const styles = ref(props.drawerStyle[props.popDirection] || {});
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          isDrawerShow.value = true;
        } else {
          setTimeout(() => {
            isDrawerShow.value = false;
          }, 150);
        }
      },
      {
        immediate: true
      }
    );
    function onOverlayClick(e) {
      emits("onOverlayClick", e);
    }
    __expose({
      drawerDomRef,
      overlayDomRef: (_a = overlayDomInstanceRef.value) == null ? void 0 : _a.overlayDomRef
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isDrawerShow)
      }, common_vendor.unref(isDrawerShow) ? {
        b: props.popDirection === "bottom" ? 1 : "",
        c: props.popDirection === "right" ? 1 : "",
        d: _ctx.visible && props.popDirection === "bottom" ? 1 : "",
        e: _ctx.visible && props.popDirection === "right" ? 1 : "",
        f: common_vendor.unref(styles).minHeight,
        g: common_vendor.unref(styles).maxHeight,
        h: common_vendor.unref(styles).borderRadius,
        i: common_vendor.unref(styles).boxShadow,
        j: common_vendor.unref(styles).width
      } : {}, {
        k: common_vendor.sr(overlayDomInstanceRef, "0aa80224-0", {
          "k": "overlayDomInstanceRef"
        }),
        l: common_vendor.o(onOverlayClick),
        m: common_vendor.p({
          visible: props.visible,
          useMask: props.useMask,
          maskColor: props.overlayColor,
          isFullScreen: props.isFullScreen
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0aa80224"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Drawer/index.js.map
