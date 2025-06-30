"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../../emoji-config/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    renderData: {},
    disabled: { type: Boolean, default: false },
    messageItem: { default: () => ({}) }
  },
  emits: ["assignMessageIDInUniapp"],
  setup(__props, { emit: __emit }) {
    const { ref, withDefaults } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    ref(false);
    function openMergeDetail() {
      if (props.disabled) {
        return;
      }
      emits("assignMessageIDInUniapp", props.messageItem.ID);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.renderData.title),
        b: common_vendor.f(props.renderData.abstractList.slice(0, 7), (item, index, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithKeysToEmojiNames)(item)),
            b: index
          };
        }),
        c: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.聊天记录")),
        d: common_vendor.o(openMergeDetail)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-759e4160"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-record/index.js.map
