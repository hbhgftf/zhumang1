"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  _component_template();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    url: { default: "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png" },
    size: { default: "36px" },
    borderRadius: { default: "50%" },
    useSkeletonAnimation: { type: Boolean, default: false }
  },
  emits: ["onLoad", "onError"],
  setup(__props, { emit: __emit }) {
    const { ref, toRefs } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const defaultAvatarUrl = ref(
      "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png"
    );
    const emits = __emit;
    const props = __props;
    const {
      size: avatarSize,
      url: avatarImageUrl,
      borderRadius: avatarBorderRadius,
      useSkeletonAnimation: useAvatarSkeletonAnimation
    } = toRefs(props);
    let reloadAvatarTime = 0;
    const isImgLoaded = ref(false);
    const loadErrorInUniapp = ref(false);
    function avatarLoadSuccess(e) {
      isImgLoaded.value = true;
      emits("onLoad", e);
    }
    function avatarLoadFailed(e) {
      reloadAvatarTime += 1;
      if (reloadAvatarTime > 3) {
        return;
      }
      loadErrorInUniapp.value = true;
      emits("onError", e);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(loadErrorInUniapp)
      }, !common_vendor.unref(loadErrorInUniapp) ? {
        b: common_vendor.unref(avatarImageUrl) || common_vendor.unref(defaultAvatarUrl),
        c: common_vendor.o(avatarLoadSuccess),
        d: common_vendor.o(avatarLoadFailed)
      } : {
        e: common_vendor.unref(defaultAvatarUrl),
        f: common_vendor.o(avatarLoadSuccess),
        g: common_vendor.o(avatarLoadFailed)
      }, {
        h: common_vendor.unref(useAvatarSkeletonAnimation) && !common_vendor.unref(isImgLoaded)
      }, common_vendor.unref(useAvatarSkeletonAnimation) && !common_vendor.unref(isImgLoaded) ? {
        i: common_vendor.unref(isImgLoaded) ? 1 : "",
        j: common_vendor.unref(useAvatarSkeletonAnimation) ? 1 : ""
      } : {}, {
        k: common_vendor.unref(avatarSize),
        l: common_vendor.unref(avatarSize),
        m: common_vendor.unref(avatarBorderRadius)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4faf8a8c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Avatar/index.js.map
