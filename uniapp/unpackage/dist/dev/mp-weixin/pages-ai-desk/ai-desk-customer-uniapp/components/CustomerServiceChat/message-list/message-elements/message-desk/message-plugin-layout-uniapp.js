"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
if (!Math) {
  MessageBubble();
}
const MessageBubble = () => "../message-bubble-uniapp.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-plugin-layout-uniapp",
  props: {
    message: { default: () => ({}) },
    showStyle: { default: "" },
    bubbleClassNameList: { default: () => [] },
    blinkMessageIDList: { default: () => [] }
  },
  emits: [
    "resendMessage",
    "handleToggleMessageItem",
    "handleH5LongPress"
  ],
  setup(__props, { emit: __emit }) {
    const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const emits = __emit;
    const messageModel = computed(
      () => {
        var _a;
        return common_vendor.Jt.getMessageModel((_a = props.message) == null ? void 0 : _a.ID);
      }
    );
    const resendMessage = (message) => {
      emits("resendMessage", message);
    };
    const handleToggleMessageItem = (e, message, isLongpress = false) => {
      emits("handleToggleMessageItem", e, message, isLongpress);
    };
    const handleH5LongPress = (e, message, type) => {
      emits("handleH5LongPress", e, message, type);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.showStyle === "tip"
      }, props.showStyle === "tip" ? {} : props.showStyle === "bubble" ? {
        c: common_vendor.o(($event) => resendMessage(common_vendor.unref(messageModel))),
        d: common_vendor.p({
          messageItem: common_vendor.unref(messageModel),
          content: common_vendor.unref(messageModel).getMessageContent(),
          blinkMessageIDList: props.blinkMessageIDList,
          classNameList: props.bubbleClassNameList
        }),
        e: common_vendor.o(($event) => handleToggleMessageItem($event, common_vendor.unref(messageModel), true)),
        f: common_vendor.o(($event) => handleToggleMessageItem($event, common_vendor.unref(messageModel))),
        g: common_vendor.o(($event) => handleH5LongPress($event, common_vendor.unref(messageModel), "touchstart")),
        h: common_vendor.o(($event) => handleH5LongPress($event, common_vendor.unref(messageModel), "touchend")),
        i: common_vendor.o(($event) => handleH5LongPress($event, common_vendor.unref(messageModel), "touchend"))
      } : {}, {
        b: props.showStyle === "bubble"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de7218ee"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-plugin-layout-uniapp.js.map
