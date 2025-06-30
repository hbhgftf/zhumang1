"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../utils/utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-timestamp",
  props: {
    currTime: {
      type: Number,
      default: 0
    },
    prevTime: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const { toRefs, ref, watch } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const { currTime, prevTime } = toRefs(props);
    const timestampShowFlag = ref(false);
    const timestampShowContent = ref("");
    const handleItemTime = (currTime2, prevTime2) => {
      timestampShowFlag.value = false;
      if (currTime2 <= 0) {
        return "";
      } else if (!prevTime2 || prevTime2 <= 0) {
        timestampShowFlag.value = true;
        return pagesAiDesk_aiDeskCustomerUniapp_utils_utils.calculateTimestamp(currTime2 * 1e3);
      } else {
        const minDiffToShow = 10 * 60;
        const diff = currTime2 - prevTime2;
        if (diff >= minDiffToShow) {
          timestampShowFlag.value = true;
          return pagesAiDesk_aiDeskCustomerUniapp_utils_utils.calculateTimestamp(currTime2 * 1e3);
        }
      }
      return "";
    };
    watch(
      () => [currTime.value, prevTime.value],
      (newVal, oldVal) => {
        if ((newVal == null ? void 0 : newVal.toString()) === (oldVal == null ? void 0 : oldVal.toString())) {
          return;
        } else {
          timestampShowContent.value = handleItemTime(
            currTime.value,
            prevTime.value
          );
        }
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(timestampShowFlag)
      }, common_vendor.unref(timestampShowFlag) ? {
        b: common_vendor.t(common_vendor.unref(timestampShowContent))
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7a869af6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-timestamp.js.map
