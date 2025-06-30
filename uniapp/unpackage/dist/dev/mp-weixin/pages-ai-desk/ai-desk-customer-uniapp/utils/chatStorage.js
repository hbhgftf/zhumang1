"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("./env.js");
const common_vendor = require("../../../common/vendor.js");
const _ChatStorage = class _ChatStorage {
  constructor() {
    __publicField(this, "chatStorage", null);
  }
  static getInstance() {
    if (!_ChatStorage.instance) {
      _ChatStorage.instance = new _ChatStorage();
    }
    return _ChatStorage.instance;
  }
  getChatStorage(key) {
    if (!this.chatStorage) {
      this.chatStorage = this.getChatStorageFromLocalStorage();
    }
    if (key) {
      return this.chatStorage[key];
    } else {
      throw new Error("No key provided");
    }
  }
  setChatStorage(key, value) {
    if (!this.chatStorage) {
      this.chatStorage = this.getChatStorageFromLocalStorage();
    }
    this.chatStorage[key] = value;
    try {
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) {
        common_vendor.i.setStorageSync(_ChatStorage.CHAT_STORAGE_KEY, JSON.stringify(this.chatStorage));
      } else {
        localStorage.setItem(_ChatStorage.CHAT_STORAGE_KEY, JSON.stringify(this.chatStorage));
      }
    } catch (error) {
      throw new Error("Fail to set chat storage");
    }
  }
  getChatStorageFromLocalStorage() {
    let chatStorageString = "";
    if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) {
      chatStorageString = common_vendor.i.getStorageSync(_ChatStorage.CHAT_STORAGE_KEY) || "";
    } else {
      chatStorageString = localStorage.getItem(_ChatStorage.CHAT_STORAGE_KEY) || "";
    }
    if (!chatStorageString) {
      return {};
    }
    try {
      this.chatStorage = JSON.parse(chatStorageString);
    } catch (error) {
      this.chatStorage = {};
    }
    return this.chatStorage;
  }
};
__publicField(_ChatStorage, "instance", null);
__publicField(_ChatStorage, "CHAT_STORAGE_KEY", "TUI_CHAT_STORAGE");
let ChatStorage = _ChatStorage;
const chatStorage = ChatStorage.getInstance();
exports.chatStorage = chatStorage;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/chatStorage.js.map
