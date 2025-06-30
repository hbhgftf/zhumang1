"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
if (!Math) {
  (Icon + BottomPopup)();
}
const Icon = () => "../../../common/Icon.js";
const BottomPopup = () => "../../../common/BottomPopup/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    iconFile: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    needDialog: {
      type: Boolean,
      default: true
    },
    iconWidth: {
      type: String,
      default: "20px"
    },
    iconHeight: {
      type: String,
      default: "20px"
    },
    // Whether to display the bottom popup dialog on mobile devices
    // Invalid on PC
    needBottomPopup: {
      type: Boolean,
      default: false
    },
    isH5EmojiShow: {
      type: Boolean,
      default: false
    },
    isH5Emoji: {
      type: Boolean,
      default: false
    },
    isH5ToolShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ["onIconClick", "onDialogClose", "onDialogShow"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const emits = __emit;
    const showDialog = ref(false);
    ref();
    const dialogRef = ref();
    const toggleToolbarItem = () => {
      emits("onIconClick", dialogRef);
      if (!props.needDialog) {
        return;
      }
      toggleDialogDisplay(!showDialog.value);
    };
    const toggleDialogDisplay = (showStatus) => {
      if (showDialog.value === showStatus) {
        return;
      }
      showDialog.value = showStatus;
      switch (showStatus) {
        case true:
          emits("onDialogShow", dialogRef);
          break;
        case false:
          emits("onDialogClose", dialogRef);
      }
    };
    const onPopupClose = () => {
      showDialog.value = false;
    };
    __expose({
      toggleDialogDisplay
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && !__props.isH5Emoji && __props.isH5ToolShow || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork)
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && !__props.isH5Emoji && __props.isH5ToolShow || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? {
        b: common_vendor.p({
          file: props.iconFile,
          width: props.iconWidth,
          height: props.iconHeight
        }),
        c: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && "toolbar-item-container-h5-icon"),
        d: common_vendor.o(toggleToolbarItem)
      } : {}, {
        e: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && !__props.isH5Emoji && __props.isH5ToolShow
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) && !__props.isH5Emoji && __props.isH5ToolShow ? {
        f: common_vendor.t(props.title)
      } : {}, {
        g: props.needBottomPopup
      }, props.needBottomPopup ? {
        h: common_vendor.o(() => {
        }),
        i: common_vendor.o(onPopupClose),
        j: common_vendor.p({
          show: common_vendor.unref(showDialog) || __props.isH5EmojiShow
        })
      } : {}, {
        k: common_vendor.unref(showDialog) || __props.isH5EmojiShow
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b20ee14"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input-toolbar/toolbar-item-container/index.js.map
