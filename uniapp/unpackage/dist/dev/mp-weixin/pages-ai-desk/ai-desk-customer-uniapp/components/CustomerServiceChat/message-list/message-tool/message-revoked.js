"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-revoked",
  props: {
    isEdit: {
      type: Boolean,
      default: () => false
    },
    messageItem: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["messageEdit"],
  setup(__props, { emit: __emit }) {
    const { watchEffect, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const message = ref();
    const isEditMsg = ref(false);
    const emits = __emit;
    watchEffect(() => {
      message.value = props.messageItem;
      isEditMsg.value = props.isEdit;
    });
    const messageEdit = () => {
      emits("messageEdit");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(message).flow === "in"
      }, common_vendor.unref(message).flow === "in" ? {
        b: common_vendor.t(common_vendor.unref(message).nick || common_vendor.unref(message).from)
      } : common_vendor.unref(message).from === common_vendor.unref(message).revoker ? {
        d: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.您"))
      } : {
        e: common_vendor.t(common_vendor.unref(message).revoker)
      }, {
        c: common_vendor.unref(message).from === common_vendor.unref(message).revoker,
        f: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.撤回了一条消息")),
        g: common_vendor.unref(message).flow === "out" && common_vendor.unref(isEditMsg)
      }, common_vendor.unref(message).flow === "out" && common_vendor.unref(isEditMsg) ? {
        h: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.重新编辑")),
        i: common_vendor.o(messageEdit)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86ce1023"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-tool/message-revoked.js.map
