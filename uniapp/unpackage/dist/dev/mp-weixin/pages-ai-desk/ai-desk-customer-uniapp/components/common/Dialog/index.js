"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isHeaderShow: {
      type: Boolean,
      default: true
    },
    isFooterShow: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:show", "submit"],
  setup(__props, { emit: __emit }) {
    const { ref, watchEffect } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const clickType = {
      OUTSIDE: "outside",
      INSIDE: "inside"
    };
    const props = __props;
    const showDialog = ref(false);
    const isHeaderShowDialog = ref(true);
    const isFooterShowDialog = ref(true);
    const backgroundDialog = ref(true);
    const showTitle = ref("");
    watchEffect(() => {
      showDialog.value = props.show;
      showTitle.value = props.title;
      isHeaderShowDialog.value = props.isHeaderShow;
      isFooterShowDialog.value = props.isFooterShow;
      backgroundDialog.value = props.background;
    });
    const emit = __emit;
    const toggleView = (type) => {
      if (type === clickType.OUTSIDE) {
        close();
      }
    };
    const close = () => {
      showDialog.value = !showDialog.value;
      emit("update:show", showDialog.value);
    };
    const submit = () => {
      emit("submit");
      close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(showDialog)
      }, common_vendor.unref(showDialog) ? common_vendor.e({
        b: common_vendor.unref(isHeaderShowDialog)
      }, common_vendor.unref(isHeaderShowDialog) ? {
        c: common_vendor.t(common_vendor.unref(showTitle)),
        d: common_vendor.o(close)
      } : {}, {
        e: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) && common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) ? "dialog-main-content-uniapp" : ""),
        f: common_vendor.unref(isFooterShowDialog)
      }, common_vendor.unref(isFooterShowDialog) ? {
        g: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("取消")),
        h: common_vendor.o(close),
        i: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("确定")),
        j: common_vendor.o(submit)
      } : {}, {
        k: common_vendor.n(!common_vendor.unref(backgroundDialog) ? "dialog-main-back" : ""),
        l: common_vendor.o(($event) => toggleView(clickType.INSIDE)),
        m: common_vendor.n(__props.center ? "center" : ""),
        n: common_vendor.o(($event) => toggleView(clickType.OUTSIDE))
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0dcf8461"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Dialog/index.js.map
