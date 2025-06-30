"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
require("../../emoji-config/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-text",
  props: {
    content: { default: () => ({}) }
  },
  setup(__props) {
    const { watchEffect, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const data = ref();
    watchEffect(() => {
      var _a;
      data.value = props.content;
      (_a = data.value.text) == null ? void 0 : _a.forEach(
        (item) => {
          if (item.name === "img" && (item == null ? void 0 : item.type) === "custom") {
            {
              common_vendor.index.__f__(
                "warn",
                "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-text.vue:47",
                "CUSTOM_BASIC_EMOJI_URL is required for custom emoji, please check your CUSTOM_BASIC_EMOJI_URL."
              );
            }
          }
        }
      );
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data).text, (item, index, i0) => {
          return common_vendor.e({
            a: item.name === "text"
          }, item.name === "text" ? {
            b: common_vendor.t(item.text)
          } : {
            c: item.src,
            d: item.emojiKey
          }, {
            e: index
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d1e23efb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-text.js.map
