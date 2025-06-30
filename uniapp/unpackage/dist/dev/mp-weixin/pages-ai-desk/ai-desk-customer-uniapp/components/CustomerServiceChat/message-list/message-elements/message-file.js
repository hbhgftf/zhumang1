"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
require("../../../../adapter-vue-uniapp.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-file",
  props: {
    content: { default: () => ({}) },
    messageItem: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const download = () => {
      if (props.messageItem.hasRiskContent || props.messageItem.flow === "out") {
        return;
      }
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat) {
        common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:47", "isWechat", props.content.url);
        common_vendor.wx$1.downloadFile({
          url: props.content.url,
          filePath: common_vendor.wx$1.env.USER_DATA_PATH + "/" + props.content.name,
          success: function(res) {
            var filePath = res.filePath;
            const lastIndex = filePath.lastIndexOf(".");
            const fileType = filePath.substring(lastIndex + 1);
            common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:56", fileType);
            common_vendor.wx$1.openDocument({
              filePath,
              showMenu: true,
              fileType,
              success: function(res2) {
                common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:62", "打开文档成功");
              },
              fail: function() {
                common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:65", "fail");
              }
            });
          }
        });
      } else if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) {
        const lastIndex = props.content.url.lastIndexOf(".");
        const fileType = props.content.url.substring(lastIndex + 1);
        common_vendor.index.downloadFile({
          url: props.content.url,
          success: function(res) {
            if (res.statusCode == 200) {
              common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:77", res);
              const tempFilePaths = res.tempFilePath;
              common_vendor.index.showToast({
                title: "下载成功" + tempFilePaths,
                icon: "success",
                duration: 2e3
              });
              common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:84", tempFilePaths);
              common_vendor.index.openDocument({
                filePath: tempFilePaths,
                fileType,
                success: function() {
                  common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:89", "打开文档成功");
                },
                fail: function() {
                  common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:92", "打开文档失败");
                }
              });
            }
          }
        });
      } else {
        common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.vue:111", "no window here");
        const a = document.createElement("a");
        a.href = props.content.url;
        a.target = "_blank";
        a.download = props.content.name;
        a.click();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          file: common_vendor.unref(common_assets.files)
        }),
        b: common_vendor.t(props.content.name),
        c: common_vendor.t(props.content.size),
        d: common_vendor.n(_ctx.messageItem.flow === "in" ? "file-in" : ""),
        e: common_vendor.unref(common_vendor.Wt).t("TUIChat.单击下载"),
        f: common_vendor.o(download)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f99a2a7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-file.js.map
