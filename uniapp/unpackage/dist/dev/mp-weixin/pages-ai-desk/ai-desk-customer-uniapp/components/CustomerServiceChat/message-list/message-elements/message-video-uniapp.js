"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-video-uniapp",
  props: {
    content: { default: () => ({}) },
    messageItem: { default: () => ({}) }
  },
  setup(__props) {
    const { withDefaults, ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const videoData = ref();
    const showVideo = ref(false);
    function playVideo() {
      showVideo.value = true;
      videoData.value = props.content.url;
    }
    function closeVideo() {
      showVideo.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.content.snapshotUrl,
        b: props.messageItem.status === "success" || props.messageItem.progress === 1
      }, props.messageItem.status === "success" || props.messageItem.progress === 1 ? {
        c: common_vendor.p({
          file: common_vendor.unref(common_assets.playIcon)
        })
      } : {}, {
        d: common_vendor.o(playVideo),
        e: common_vendor.unref(showVideo)
      }, common_vendor.unref(showVideo) ? {
        f: common_vendor.o(closeVideo),
        g: common_vendor.unref(videoData)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bbed5c4d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-video-uniapp.js.map
