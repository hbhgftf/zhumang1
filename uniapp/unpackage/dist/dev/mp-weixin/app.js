"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const config = require("./config.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/course.js";
  "./pages/index/elective.js";
  "./pages/index/volunteer-register.js";
  "./pages/index/mine.js";
  "./pages/test-auth/test-auth.js";
  "./pages/policy/policy.js";
  "./pages/policy/detail.js";
  "./pages/basicInfo/basicInfo.js";
  "./pages/index/spxz/spxz.js";
  "./pages-ai-desk/index/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:5", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:8", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:11", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_vkUviewUi_index.uView);
  app.config.globalProperties.$config = config.config;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
