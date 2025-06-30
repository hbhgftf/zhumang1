"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_enableSampleTaskStatus = require("../../../utils/enableSampleTaskStatus.js");
const sendMessages = async (messageList, currentConversation) => {
  if (common_vendor.Jt.getData(common_vendor.o$1.CHAT, "messageSource")) {
    common_vendor.Jt.update(common_vendor.o$1.CHAT, "messageSource", void 0);
  }
  messageList == null ? void 0 : messageList.forEach(async (content) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const options = {
        to: ((_a = currentConversation == null ? void 0 : currentConversation.groupProfile) == null ? void 0 : _a.groupID) || ((_b = currentConversation == null ? void 0 : currentConversation.userProfile) == null ? void 0 : _b.userID),
        conversationType: currentConversation == null ? void 0 : currentConversation.type,
        payload: {},
        needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
      };
      let textMessageContent;
      const sendMessageOptions = {
        offlinePushInfo: {}
      };
      switch (content == null ? void 0 : content.type) {
        case "text":
          textMessageContent = JSON.parse(JSON.stringify((_c = content.payload) == null ? void 0 : _c.text));
          if (!textMessageContent) {
            break;
          }
          options.payload = {
            text: textMessageContent
          };
          if ((_d = content.payload) == null ? void 0 : _d.atUserList) {
            options.payload.atUserList = content.payload.atUserList;
            await common_vendor.Qt.sendTextAtMessage(options, sendMessageOptions);
          } else {
            await common_vendor.Qt.sendTextMessage(options, sendMessageOptions);
          }
          break;
        case "image":
          options.payload = {
            file: (_e = content.payload) == null ? void 0 : _e.file
          };
          await common_vendor.Qt.sendImageMessage(options, sendMessageOptions);
          break;
        case "video":
          options.payload = {
            file: (_f = content.payload) == null ? void 0 : _f.file
          };
          await common_vendor.Qt.sendVideoMessage(options, sendMessageOptions);
          break;
        case "file":
          options.payload = {
            file: (_g = content.payload) == null ? void 0 : _g.file
          };
          await common_vendor.Qt.sendFileMessage(options, sendMessageOptions);
          break;
        default:
          break;
      }
      pagesAiDesk_aiDeskCustomerUniapp_utils_enableSampleTaskStatus.enableSampleTaskStatus("sendMessage");
    } catch (error) {
      common_vendor.index.__f__("error", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/utils/sendMessage.ts:114", error);
      if (common_vendor.Jt.getData(common_vendor.o$1.CHAT, "quoteMessage")) {
        common_vendor.Jt.update(common_vendor.o$1.CHAT, "quoteMessage", {});
      }
    }
  });
};
const sendTyping = (inputContentEmpty, inputBlur) => {
  if (!inputContentEmpty && !inputBlur) {
    common_vendor.Qt.enterTypingState();
  } else {
    common_vendor.Qt.leaveTypingState();
  }
};
exports.sendMessages = sendMessages;
exports.sendTyping = sendTyping;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/utils/sendMessage.js.map
