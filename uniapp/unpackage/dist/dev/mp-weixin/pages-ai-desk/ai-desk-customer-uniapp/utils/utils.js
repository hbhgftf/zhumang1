"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("./env.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVueUniapp = require("../adapter-vue-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("./index.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../constant.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_logger = require("./logger.js");
function deepCopy(data, hash = /* @__PURE__ */ new WeakMap()) {
  if (typeof data !== "object" || data === null || data === void 0) {
    return data;
  }
  if (hash.has(data)) {
    return hash.get(data);
  }
  const newData = Object.create(Object.getPrototypeOf(data));
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      newData[value] = /* @__PURE__ */ new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      newData[value] = new Map([...currentDataValue]);
    } else {
      hash.set(data, data);
      newData[value] = deepCopy(currentDataValue, hash);
    }
  });
  return newData;
}
function isEnabledMessageReadReceiptGlobal() {
  return common_vendor.Jt.getData(common_vendor.o$1.USER, "displayMessageReadReceipt") && common_vendor.Jt.getData(common_vendor.o$1.APP, "enabledMessageReadReceipt");
}
function shallowCopyMessage(message) {
  return Object.assign({}, message);
}
function calculateTimestamp(timestamp) {
  const todayZero = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
  const thisYear = new Date(
    (/* @__PURE__ */ new Date()).getFullYear(),
    0,
    1,
    0,
    0,
    0,
    0
  ).getTime();
  const target = new Date(timestamp);
  const oneDay = 24 * 60 * 60 * 1e3;
  const oneWeek = 7 * oneDay;
  const diff = todayZero - target.getTime();
  function formatNum(num) {
    return num < 10 ? "0" + num : num.toString();
  }
  if (diff <= 0) {
    return `${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneDay) {
    return `${common_vendor.Wt.t("Time.昨天")} ${formatNum(
      target.getHours()
    )}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneWeek - oneDay) {
    const weekdays = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    const weekday = weekdays[target.getDay()];
    return `${common_vendor.Wt.t("Time." + weekday)} ${formatNum(
      target.getHours()
    )}:${formatNum(target.getMinutes())}`;
  } else if (target.getTime() >= thisYear) {
    return `${target.getMonth() + 1}/${target.getDate()} ${formatNum(
      target.getHours()
    )}:${formatNum(target.getMinutes())}`;
  } else {
    return `${target.getFullYear()}/${target.getMonth() + 1}/${target.getDate()} ${formatNum(target.getHours())}:${formatNum(
      target.getMinutes()
    )}`;
  }
}
const isVue2App = pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp && pagesAiDesk_aiDeskCustomerUniapp_adapterVueUniapp.vueVersion === 2;
const isVue3App = pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp && pagesAiDesk_aiDeskCustomerUniapp_adapterVueUniapp.vueVersion === 3;
const needHackForStreamText = (data) => {
  if (isVue2App && pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(data).src === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.STREAM_TEXT) {
    return true;
  }
  return false;
};
function getSafeUrl(url) {
  try {
    const decodedUrl = decodeURIComponent(url);
    if (typeof URL !== "undefined") {
      const parsedUrl = new URL(decodedUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return null;
      }
      parsedUrl.username = "";
      parsedUrl.password = "";
      return parsedUrl.href;
    }
    return decodedUrl;
  } catch (e) {
    return null;
  }
}
function openSafeUrl(content) {
  const safeUrl = getSafeUrl(content);
  if (safeUrl) {
    if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isApp)
      ;
    else {
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    }
  } else {
    pagesAiDesk_aiDeskCustomerUniapp_utils_logger.Log.w(`Invalid URL provided:${content}`);
  }
}
function switchReadStatus(value) {
  if (value !== 1) {
    common_vendor.Zt.switchMessageReadStatus(false);
  } else {
    common_vendor.Zt.switchMessageReadStatus(true);
  }
}
function getTo(conversation) {
  var _a, _b;
  return ((_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.groupID) || ((_b = conversation == null ? void 0 : conversation.userProfile) == null ? void 0 : _b.userID);
}
exports.calculateTimestamp = calculateTimestamp;
exports.deepCopy = deepCopy;
exports.getTo = getTo;
exports.isEnabledMessageReadReceiptGlobal = isEnabledMessageReadReceiptGlobal;
exports.isVue3App = isVue3App;
exports.needHackForStreamText = needHackForStreamText;
exports.openSafeUrl = openSafeUrl;
exports.shallowCopyMessage = shallowCopyMessage;
exports.switchReadStatus = switchReadStatus;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/utils.js.map
