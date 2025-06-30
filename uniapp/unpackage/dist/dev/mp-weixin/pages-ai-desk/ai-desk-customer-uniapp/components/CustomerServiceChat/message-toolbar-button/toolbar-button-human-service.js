"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "toolbar-button-human-service",
  props: {
    title: { default: "" },
    icon: { default: "" }
  },
  setup(__props) {
    const { ref, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const currentConversation = ref();
    const props = __props;
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    const onCurrentConversationUpdate = (conversation) => {
      currentConversation.value = conversation;
    };
    const onClick = () => {
      var _a;
      common_vendor.Qt.sendTextMessage({
        to: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.getTo(currentConversation == null ? void 0 : currentConversation.value),
        conversationType: (_a = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a.type,
        payload: {
          text: common_vendor.Wt.t("AIDesk.转人工服务")
        },
        needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.icon
      }, props.icon ? {
        b: common_vendor.p({
          file: props.icon,
          width: "14px",
          height: "14px"
        })
      } : {}, {
        c: common_vendor.t(props.title || common_vendor.unref(common_vendor.Wt).t("AIDesk.转人工服务")),
        d: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) ? "toolbar-button-h5" : ""),
        e: common_vendor.o(onClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3cc928e6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-toolbar-button/toolbar-button-human-service.js.map
