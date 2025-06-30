"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked = require("./marked.js");
const common_vendor = require("../../../../../../../../common/vendor.js");
const mpHtml = () => "../../../../../common/RichText/dist/uni-app/components/mp-html/mp-html.js";
const { computed, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    mpHtml
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const parsedContent = computed(() => {
      return pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked.parseMarkdown(props.payload.content);
    });
    return {
      props,
      parsedContent
    };
  }
};
if (!Array) {
  const _component_mpHtml = common_vendor.resolveComponent("mpHtml");
  _component_mpHtml();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      content: $setup.parsedContent
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-rich-text.js.map
