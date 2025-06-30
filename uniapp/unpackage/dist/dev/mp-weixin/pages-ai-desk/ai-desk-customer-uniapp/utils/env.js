"use strict";
const common_vendor = require("../../../common/vendor.js");
const isPC = common_vendor.g() === "pc";
const isH5 = common_vendor.g() === "h5";
const isWeChat = common_vendor.g() === "wechat";
const isApp = common_vendor.g() === "app";
const isUniFrameWork = typeof common_vendor.index !== "undefined";
const isMobile = isH5 || isWeChat || isApp;
exports.isApp = isApp;
exports.isH5 = isH5;
exports.isMobile = isMobile;
exports.isPC = isPC;
exports.isUniFrameWork = isUniFrameWork;
exports.isWeChat = isWeChat;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/env.js.map
