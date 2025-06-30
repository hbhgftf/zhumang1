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
    // Video source, only valid for uni-app version, web version only supports selecting videos from files
    // album: Select from files
    // camera: Take a video using the camera
    videoSourceType: {
      type: String,
      default: "album"
    }
  },
  setup(__props) {
    const { ref } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    ref();
    const currentConversation = ref();
    common_vendor.Jt.watch(common_vendor.o$1.CONV, {
      currentConversation: (conversation) => {
        currentConversation.value = conversation;
      }
    });
    const handleIcon = () => {
      switch (props.videoSourceType) {
        case "album":
          return common_assets.videoUniIcon;
        case "camera":
          return common_assets.cameraUniIcon;
        default:
          return common_assets.videoUniIcon;
      }
    };
    const handleTitle = () => {
      if (props.videoSourceType === "camera") {
        return common_vendor.Wt.t("录制");
      } else {
        return common_vendor.Wt.t("视频");
      }
    };
    const onIconClick = () => {
      var _a, _b, _c;
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat && ((_a = common_vendor.i) == null ? void 0 : _a.chooseMedia)) {
        (_b = common_vendor.i) == null ? void 0 : _b.chooseMedia({
          mediaType: ["video"],
          count: 1,
          sourceType: [props.videoSourceType],
          maxDuration: 60,
          success: function(res) {
            sendVideoMessage(res);
          }
        });
      } else {
        (_c = common_vendor.i) == null ? void 0 : _c.chooseVideo({
          count: 1,
          sourceType: [props.videoSourceType],
          compressed: false,
          success: function(res) {
            sendVideoMessage(res);
          }
        });
      }
    };
    const sendVideoInWeb = (e) => {
      var _a, _b;
      if (((_b = (_a = e == null ? void 0 : e.target) == null ? void 0 : _a.files) == null ? void 0 : _b.length) <= 0) {
        return;
      }
      sendVideoMessage(e == null ? void 0 : e.target);
      e.target.value = "";
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
        a: common_vendor.unref(common_vendor.Wt).t("视频"),
        b: common_vendor.o(sendVideoInWeb),
        c: common_vendor.o(onIconClick),
        d: common_vendor.p({
          iconFile: handleIcon(),
          title: handleTitle(),
          needDialog: false,
          iconWidth: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? "32px" : "21px",
          iconHeight: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? props.videoSourceType === "album" ? "20px" : "25px" : "18px"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f813683"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input-toolbar/video-upload/index.js.map
