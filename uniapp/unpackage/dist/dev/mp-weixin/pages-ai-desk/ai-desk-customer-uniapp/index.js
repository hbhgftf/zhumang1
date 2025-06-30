"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_server = require("./server.js");
require("./constant.js");
const TUICustomerServer = pagesAiDesk_aiDeskCustomerUniapp_server.TUICustomerServer.getInstance();
const isCustomerServicePluginMessage = TUICustomerServer.isCustomerServicePluginMessage.bind(TUICustomerServer);
const isCustomerConversation = TUICustomerServer.isCustomerConversation.bind(TUICustomerServer);
exports.TUICustomerServer = TUICustomerServer;
exports.isCustomerConversation = isCustomerConversation;
exports.isCustomerServicePluginMessage = isCustomerServicePluginMessage;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/index.js.map
