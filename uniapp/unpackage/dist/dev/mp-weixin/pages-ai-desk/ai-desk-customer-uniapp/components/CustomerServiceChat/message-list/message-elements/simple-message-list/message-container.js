"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../../utils/utils.js");
if (!Math) {
  Avatar();
}
const Avatar = () => "../../../../common/Avatar/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-container",
  props: {
    sender: { default: "" },
    avatar: { default: "" },
    type: {},
    time: {}
  },
  setup(__props) {
    const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const isNoPadding = computed(() => {
      return [TYPES.MSG_IMAGE, TYPES.MSG_VIDEO, TYPES.MSG_MERGER].includes(
        props.type
      );
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          url: props.avatar
        }),
        b: common_vendor.t(props.sender),
        c: common_vendor.unref(isNoPadding) ? 1 : "",
        d: common_vendor.t(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.calculateTimestamp)(props.time * 1e3))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d866ea0e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/simple-message-list/message-container.js.map
