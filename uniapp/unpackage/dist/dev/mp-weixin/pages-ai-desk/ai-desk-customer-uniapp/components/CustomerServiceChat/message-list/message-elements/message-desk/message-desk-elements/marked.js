"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_libMarked = require("./lib-marked.js");
const rendererMD = new pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_libMarked.marked.Renderer();
rendererMD.image = (href, title, text) => {
  return `
        <img src="${href}" alt="${text}" style="max-width: 100%;">
    `;
};
rendererMD.link = (href, title, text) => {
  if (href && /[^\x00-\x7F]/g.test(href)) {
    return text;
  }
  return `<a target="_blank" rel="noreferrer noopenner" class="message-marked_link" href="${href || ""}" title="${title}">${text}</a>`;
};
pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_libMarked.marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
const parseMarkdown = (text) => {
  return pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_libMarked.marked.parse(text, { renderer: rendererMD });
};
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/marked.js.map
