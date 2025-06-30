"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
require("../../emoji-config/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-face",
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const { ref, onMounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const url = ref(props.content.url);
    onMounted(() => {
      if (props.content.type === "custom") {
        {
          common_vendor.index.__f__(
            "warn",
            "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-face.vue:28",
            "CUSTOM_BIG_EMOJI_URL is required for custom emoji, please check your CUSTOM_BIG_EMOJI_URL."
          );
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(url)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4be76d8b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-face.js.map
