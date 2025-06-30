"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_index = require("../../../../../index.js");
function isPluginMessage(message) {
  return message.type === common_vendor.qt.TYPES.MSG_CUSTOM && pagesAiDesk_aiDeskCustomerUniapp_index.isCustomerServicePluginMessage(message);
}
exports.isPluginMessage = isPluginMessage;
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/index.js.map
