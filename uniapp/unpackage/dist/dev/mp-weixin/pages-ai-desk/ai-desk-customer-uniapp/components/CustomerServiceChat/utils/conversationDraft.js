"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../emoji-config/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../utils/index.js");
const _ConversationDraftManager = class _ConversationDraftManager {
  constructor() {
    __publicField(this, "quoteMessageMap", /* @__PURE__ */ new Map());
  }
  static getInstance() {
    if (!_ConversationDraftManager.instance) {
      _ConversationDraftManager.instance = new _ConversationDraftManager();
    }
    return _ConversationDraftManager.instance;
  }
  setStore(conversationID, draftContent, abstract, quoteMessage) {
    var _a, _b;
    if (conversationID && (this.isEditorNotEmpty(draftContent) || ((_a = quoteMessage == null ? void 0 : quoteMessage.message) == null ? void 0 : _a.ID))) {
      let additionalDraftInfo = {};
      if ((_b = quoteMessage == null ? void 0 : quoteMessage.message) == null ? void 0 : _b.ID) {
        this.quoteMessageMap.set(quoteMessage.message.ID, quoteMessage.message);
        additionalDraftInfo = { messageID: quoteMessage.message.ID, type: quoteMessage.type };
      }
      const draftParams = {
        conversationID,
        draftInfo: {
          html: draftContent,
          abstract,
          ...additionalDraftInfo
        }
      };
      common_vendor.Xt.setConversationDraft(draftParams);
      common_vendor.Jt.update(common_vendor.o$1.CHAT, "quoteMessage", { message: void 0, type: "quote" });
    }
  }
  getStore(conversationID, setEditorContentCallback) {
    const conversation = common_vendor.Jt.getConversationModel(conversationID);
    if (!conversation) {
      return;
    }
    if (conversation.conversationID && conversation.draftText) {
      const draftObject = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(conversation.draftText);
      common_vendor.Jt.update(common_vendor.o$1.CHAT, "quoteMessage", { message: this.quoteMessageMap.get(draftObject.messageID) || void 0, type: draftObject.type });
      setEditorContentCallback(draftObject.html);
    }
    common_vendor.Xt.setConversationDraft({ conversationID: conversation.conversationID });
  }
  generateAbstract(editorContent) {
    let abstract = "";
    editorContent == null ? void 0 : editorContent.forEach((item) => {
      switch (item.type) {
        case "text":
          abstract += pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithKeysToEmojiNames(item.payload.text || "");
          break;
        case "image":
          abstract += common_vendor.Wt.t("TUIChat.图片");
          break;
        case "video":
          abstract += common_vendor.Wt.t("TUIChat.视频");
          break;
        case "file":
          abstract += common_vendor.Wt.t("TUIChat.文件");
          break;
      }
    });
    return abstract;
  }
  isEditorNotEmpty(editorHTML) {
    return editorHTML && !editorHTML.includes("is-empty") && editorHTML !== "<p></p>";
  }
};
__publicField(_ConversationDraftManager, "instance", null);
let ConversationDraftManager = _ConversationDraftManager;
const DraftManager = ConversationDraftManager.getInstance();
exports.DraftManager = DraftManager;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/utils/conversationDraft.js.map
