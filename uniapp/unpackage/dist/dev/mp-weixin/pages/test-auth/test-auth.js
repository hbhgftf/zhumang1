"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    async handleAuth() {
      try {
        const { userInfo } = await common_vendor.index.getUserProfile({
          desc: "测试授权",
          lang: "zh_CN"
        });
        common_vendor.index.__f__("log", "at pages/test-auth/test-auth.vue:16", "测试用户信息:", userInfo);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/test-auth/test-auth.vue:18", "测试授权错误:", error);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleAuth && $options.handleAuth(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test-auth/test-auth.js.map
