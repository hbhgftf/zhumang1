"use strict";
const common_vendor = require("../../common/vendor.js");
const debug_GenerateTestUserSig = require("../../debug/GenerateTestUserSig.js");
const pagesAiDesk_aiDeskCustomerUniapp_index = require("../ai-desk-customer-uniapp/index.js");
const TUIKit = () => "../ai-desk-customer-uniapp/components/CustomerServiceChat/index-uniapp.js";
const _sfc_main = {
  components: {
    TUIKit
    // Register TUIKit component
  },
  data() {
    return {
      userID: "customer_" + Math.floor(Math.random() * 1e6),
      // 生成随机用户ID
      // 简化的 config
      simpleConfig: {
        sdkAppID: 1600089018,
        // 使用您的SDKAppID
        groupID: "59887"
        // 添加客服群组ID
        // 暂时移除其他配置
      }
    };
  },
  computed: {
    userSig() {
      return debug_GenerateTestUserSig.genTestUserSig(this.userID).userSig;
    }
  },
  methods: {
    // 收到新消息时的回调
    onMessageReceived(message) {
      common_vendor.index.__f__("log", "at pages-ai-desk/index/index.vue:44", "收到新消息:", message);
      common_vendor.index.vibrateShort();
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.src = "/static/notification.mp3";
      innerAudioContext.play();
    },
    // 会话列表更新时的回调
    onConversationListUpdated(conversationList) {
      common_vendor.index.__f__("log", "at pages-ai-desk/index/index.vue:56", "会话列表更新:", conversationList);
    },
    // 错误处理
    onError(error) {
      common_vendor.index.__f__("error", "at pages-ai-desk/index/index.vue:61", "TUIKit错误:", error);
      common_vendor.index.showToast({
        title: "连接异常，请稍后重试",
        icon: "none",
        duration: 2e3
      });
    }
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages-ai-desk/index/index.vue:71", "聊天页面已加载");
    pagesAiDesk_aiDeskCustomerUniapp_index.TUICustomerServer.initWithProfile({
      SDKAppID: this.simpleConfig.sdkAppID,
      userID: this.userID,
      userSig: this.userSig
    });
    common_vendor.index.getNetworkType({
      success: (res) => {
        if (res.networkType === "none") {
          common_vendor.index.showToast({
            title: "网络连接已断开",
            icon: "none",
            duration: 2e3
          });
        }
      }
    });
  },
  onUnload() {
    common_vendor.index.__f__("log", "at pages-ai-desk/index/index.vue:95", "聊天页面已卸载");
  }
};
if (!Array) {
  const _component_TUIKit = common_vendor.resolveComponent("TUIKit");
  _component_TUIKit();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onMessageReceived),
    b: common_vendor.o($options.onConversationListUpdated),
    c: common_vendor.o($options.onError),
    d: common_vendor.p({
      config: $data.simpleConfig,
      userID: $data.userID,
      userSig: $options.userSig
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-ai-desk/index/index.js.map
