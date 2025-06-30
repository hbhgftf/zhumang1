"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../constant.js");
function isJSON(str) {
  if (typeof str === "string") {
    try {
      const data = JSON.parse(str);
      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
}
function JSONToObject(str) {
  if (!isJSON(str)) {
    return str;
  }
  return JSON.parse(str);
}
function isCustomerServiceMessage(message) {
  var _a;
  const customerServicePayload = JSONToObject((_a = message == null ? void 0 : message.payload) == null ? void 0 : _a.data);
  return Number(customerServicePayload == null ? void 0 : customerServicePayload.customerServicePlugin) === 0 || Number(customerServicePayload == null ? void 0 : customerServicePayload.chatbotPlugin) === 1;
}
const isThinkingMessage = (message) => {
  var _a;
  const isCustomMessage = (message == null ? void 0 : message.type) === pagesAiDesk_aiDeskCustomerUniapp_constant.TYPES.MSG_CUSTOM;
  const customerServicePayload = JSONToObject((_a = message == null ? void 0 : message.payload) == null ? void 0 : _a.data);
  return isCustomMessage && (customerServicePayload == null ? void 0 : customerServicePayload.src) === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.THINKING && (customerServicePayload == null ? void 0 : customerServicePayload.thinkingStatus) === 0;
};
const isThinkingMessageOverTime = (message) => {
  const messageTime = message.time * 1e3;
  const minute = 60 * 1e3;
  const now = Date.now();
  if (now - messageTime > minute) {
    return false;
  }
  return true;
};
const isMessageInvisible = (message) => {
  var _a, _b;
  const customerServicePayload = JSONToObject((_a = message == null ? void 0 : message.payload) == null ? void 0 : _a.data);
  const robotCommandArray = ["feedback", "updateBotStatus"];
  const isCustomerMessage = (message == null ? void 0 : message.type) === pagesAiDesk_aiDeskCustomerUniapp_constant.TYPES.MSG_CUSTOM;
  const isGroupTipMessage = (message == null ? void 0 : message.type) === pagesAiDesk_aiDeskCustomerUniapp_constant.TYPES.MSG_GROUP_TIP;
  const isCustomerInvisible = (customerServicePayload == null ? void 0 : customerServicePayload.src) && !pagesAiDesk_aiDeskCustomerUniapp_constant.WHITE_LIST.includes(customerServicePayload == null ? void 0 : customerServicePayload.src);
  const isMultiFormMessage = (customerServicePayload == null ? void 0 : customerServicePayload.src) !== null && (customerServicePayload == null ? void 0 : customerServicePayload.src) === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.MULTI_FORM && message.flow === "out";
  const isRobot = (customerServicePayload == null ? void 0 : customerServicePayload.src) === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.ROBOT && robotCommandArray.indexOf((_b = customerServicePayload == null ? void 0 : customerServicePayload.content) == null ? void 0 : _b.command) !== -1;
  return isCustomerMessage && (isCustomerInvisible || isRobot || isMultiFormMessage) || isGroupTipMessage;
};
const isSupportedLang = (lang) => {
  return [
    "zh",
    // Simplified Chinese中文简体：zh
    "zh-TW",
    // Traditional Chinese中文繁体：zh-TW
    "en",
    // English英语：en
    "id",
    // Indonesian印度尼西亚语：id
    "vi",
    // Vietnamese越南语：vi
    "ja",
    // Japanese日语：ja
    "fil",
    // Filipino菲律宾语：fil
    "ru"
    // Russian俄语：ru
  ].indexOf(lang) !== -1;
};
const canIUseCookies = () => {
  var _a;
  if (typeof window !== "undefined") {
    return ((_a = window.navigator) == null ? void 0 : _a.cookieEnabled) && localStorage;
  }
  return false;
};
const clearChatStorage = (SDKAppID, userID) => {
  if (canIUseCookies()) {
    localStorage.removeItem(`TIM_${SDKAppID}_${userID}_conversationMap`);
  }
};
exports.JSONToObject = JSONToObject;
exports.clearChatStorage = clearChatStorage;
exports.isCustomerServiceMessage = isCustomerServiceMessage;
exports.isMessageInvisible = isMessageInvisible;
exports.isSupportedLang = isSupportedLang;
exports.isThinkingMessage = isThinkingMessage;
exports.isThinkingMessageOverTime = isThinkingMessageOverTime;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/index.js.map
