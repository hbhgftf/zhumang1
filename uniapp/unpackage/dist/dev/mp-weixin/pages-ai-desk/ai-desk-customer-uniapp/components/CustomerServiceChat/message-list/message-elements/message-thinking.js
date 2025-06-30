"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
const common_vendor = require("../../../../../../common/vendor.js");
const Icon = () => "../../../common/Icon.js";
const { ref, watchEffect, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon
  },
  setup() {
    const icons = ref([false, false, false]);
    const index = ref(0);
    let intervalId;
    onMounted(() => {
      intervalId = setInterval(() => {
        if (index.value < icons.value.length) {
          icons.value = icons.value.map((v, i) => i === index.value ? true : v);
          index.value += 1;
        } else {
          icons.value = icons.value.map(() => false);
          index.value = 0;
        }
      }, 500);
    });
    onUnmounted(() => {
      intervalId && clearInterval(intervalId);
      intervalId = null;
    });
    return { icons, loading_message: common_assets.loading_message };
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  _component_Icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.icons, (icon, index, i0) => {
      return common_vendor.e({
        a: icon
      }, icon ? {
        b: "dd592a30-0-" + i0,
        c: common_vendor.p({
          file: $setup.loading_message,
          width: "14px",
          height: "14px"
        })
      } : {}, {
        d: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd592a30"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-thinking.js.map
