"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_index = require("../../../../../index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../../utils/index.js");
if (!Math) {
  (MessageCustomerService + MessagePluginLayout)();
}
const MessagePluginLayout = () => "./message-plugin-layout-uniapp.js";
const MessageCustomerService = () => "./message-desk-elements/message-desk.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-plugin-uniapp",
  props: {
    message: { default: () => ({}) },
    blinkMessageIDList: { default: () => [] }
  },
  emits: [
    "resendMessage",
    "handleToggleMessageItem",
    "handleH5LongPress",
    "showFormPopup",
    "heightChanged"
  ],
  setup(__props, { emit: __emit }) {
    const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const emits = __emit;
    const messageModel = computed(() => common_vendor.Jt.getMessageModel(props.message.ID));
    const pluginMessageType = computed(
      () => {
        if (pagesAiDesk_aiDeskCustomerUniapp_utils_utils.needHackForStreamText(messageModel.value.payload.data)) {
          common_vendor.Jt.update(common_vendor.o$1.CUSTOM, "hackedMessageID", props.message.ID);
        }
        let typeObj = { pluginType: "", showStyle: "" };
        if (pagesAiDesk_aiDeskCustomerUniapp_index.isCustomerServicePluginMessage(messageModel.value)) {
          typeObj = {
            pluginType: "customer",
            showStyle: pagesAiDesk_aiDeskCustomerUniapp_utils_index.isMessageInvisible(messageModel.value) ? "" : "bubble"
          };
        }
        return typeObj;
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
    const handleShowFormPopup = (data) => {
      emits("showFormPopup", data);
    };
    const onHeightChanged = () => {
      emits("heightChanged");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(pluginMessageType).pluginType === "customer"
      }, common_vendor.unref(pluginMessageType).pluginType === "customer" ? {
        b: common_vendor.o(handleShowFormPopup),
        c: common_vendor.o(onHeightChanged),
        d: common_vendor.p({
          message: props.message
        })
      } : {}, {
        e: common_vendor.o(resendMessage),
        f: common_vendor.o(handleToggleMessageItem),
        g: common_vendor.o(handleH5LongPress),
        h: common_vendor.p({
          message: props.message,
          showStyle: common_vendor.unref(pluginMessageType).showStyle,
          bubbleClassNameList: [common_vendor.unref(pluginMessageType).pluginType === "room" ? "message-bubble-room" : ""]
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-78c548cc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-plugin-uniapp.js.map
