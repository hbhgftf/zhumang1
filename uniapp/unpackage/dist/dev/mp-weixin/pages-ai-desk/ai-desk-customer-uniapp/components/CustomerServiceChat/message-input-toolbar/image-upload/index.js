"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../utils/utils.js");
if (!Math) {
  ToolbarItemContainer();
}
const ToolbarItemContainer = () => "../toolbar-item-container/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    // Image source: only valid for uni-app version, web version only supports selecting images from the album.
    // album: Select from album
    // camera: Take a photo using the camera
    imageSourceType: {
      type: String,
      default: "album"
    },
    isH5ToolShow: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { ref, computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    ref();
    const currentConversation = ref();
    const IMAGE_TOOLBAR_SHOW_MAP = {
      uni_album: {
        icon: common_assets.imageUniIcon,
        title: common_vendor.Wt.t("图片")
      },
      uni_camera: {
        icon: common_assets.cameraUniIcon,
        title: common_vendor.Wt.t("拍照")
      }
    };
    common_vendor.Jt.watch(common_vendor.o$1.CONV, {
      currentConversation: (conversation) => {
        currentConversation.value = conversation;
      }
    });
    const imageToolbarForShow = computed(() => {
      return props.imageSourceType === "camera" ? IMAGE_TOOLBAR_SHOW_MAP["uni_camera"] : IMAGE_TOOLBAR_SHOW_MAP["uni_album"];
    });
    const onIconClick = () => {
      var _a, _b, _c;
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat && ((_a = common_vendor.i) == null ? void 0 : _a.chooseMedia)) {
        (_b = common_vendor.i) == null ? void 0 : _b.chooseMedia({
          count: 1,
          mediaType: ["image", "video"],
          sizeType: ["original", "compressed"],
          sourceType: [props.imageSourceType],
          // Use camera or select from album.
          success: function(res) {
            if (res.tempFiles[0].fileType == "image") {
              sendImageMessage(res);
            } else if (res.tempFiles[0].fileType == "video") {
              sendVideoMessage(res);
            }
          }
        });
      } else {
        (_c = common_vendor.i) == null ? void 0 : _c.chooseImage({
          count: 1,
          sourceType: [props.imageSourceType],
          // Use camera or select from album.
          success: function(res) {
            sendImageMessage(res);
          }
        });
      }
    };
    const sendImageMessage = (files) => {
      var _a, _b, _c, _d, _e;
      if (!files) {
        return;
      }
      const options = {
        to: ((_b = (_a = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a.groupProfile) == null ? void 0 : _b.groupID) || ((_d = (_c = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _c.userProfile) == null ? void 0 : _d.userID),
        conversationType: (_e = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _e.type,
        payload: {
          file: files
        },
        needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
      };
      const sendMessageOptions = {};
      common_vendor.Qt.sendImageMessage(options, sendMessageOptions);
    };
    const sendVideoMessage = (file) => {
      var _a, _b, _c, _d, _e;
      if (!file) {
        return;
      }
      const options = {
        to: ((_b = (_a = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a.groupProfile) == null ? void 0 : _b.groupID) || ((_d = (_c = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _c.userProfile) == null ? void 0 : _d.userID),
        conversationType: (_e = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _e.type,
        payload: {
          file
        },
        needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
      };
      const sendMessageOptions = {};
      common_vendor.Qt.sendVideoMessage(options, sendMessageOptions);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onIconClick),
        b: common_vendor.p({
          iconFile: common_vendor.unref(imageToolbarForShow).icon,
          title: common_vendor.unref(imageToolbarForShow).title,
          iconWidth: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? "32px" : "21px",
          iconHeight: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? "25px" : "18px",
          needDialog: false,
          isH5ToolShow: __props.isH5ToolShow
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1218f204"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input-toolbar/image-upload/index.js.map
