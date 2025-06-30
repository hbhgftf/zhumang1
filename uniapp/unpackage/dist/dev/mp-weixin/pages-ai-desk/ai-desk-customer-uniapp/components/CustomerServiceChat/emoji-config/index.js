"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_customEmoji = require("./custom-emoji.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji = require("./default-emoji.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_locales_zh_cn = require("./locales/zh_cn.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../constant.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const BASIC_EMOJI_URL = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji.DEFAULT_BASIC_EMOJI_URL;
const BASIC_EMOJI_URL_MAPPING = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji.DEFAULT_BASIC_EMOJI_URL_MAPPING;
const EMOJI_GROUP_LIST = [
  {
    emojiGroupID: 0,
    type: pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE.BASIC,
    url: BASIC_EMOJI_URL,
    list: Object.keys(BASIC_EMOJI_URL_MAPPING)
  },
  ...pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji.BIG_EMOJI_GROUP_LIST,
  ...pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_customEmoji.CUSTOM_BIG_EMOJI_GROUP_LIST
];
const convertKeyToEmojiName = (key) => {
  return pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat ? pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_locales_zh_cn.Emoji[key] : common_vendor.Wt.t(`Emoji.${key}`);
};
const transformTextWithKeysToEmojiNames = (text) => {
  if (!text) {
    return "";
  }
  const reg = /(\[.+?\])/g;
  let txt = text;
  if (reg.test(text)) {
    txt = text.replace(reg, (match) => BASIC_EMOJI_URL_MAPPING[match] ? convertKeyToEmojiName(match) : match);
  }
  return txt;
};
const transformTextWithEmojiNamesToKeys = (text) => {
  if (!text) {
    return "";
  }
  const reg = /(\[.+?\])/g;
  let txt = text;
  if (reg.test(text)) {
    txt = text.replace(reg, (match) => pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji.BASIC_EMOJI_NAME_TO_KEY_MAPPING[match] || match);
  }
  return txt;
};
({
  emojiBaseUrl: BASIC_EMOJI_URL,
  emojiUrlMapping: BASIC_EMOJI_URL_MAPPING,
  emojiNameMapping: {
    ...pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_locales_zh_cn.Emoji
  }
});
const parseTextToRenderArray = (text) => {
  const emojiRegex = /\[([^\]]+)\]/g;
  const result = [];
  let match;
  let lastIndex = 0;
  while ((match = emojiRegex.exec(text)) !== null) {
    const startIndex = match.index;
    const endIndex = emojiRegex.lastIndex;
    const emojiKey = match[0];
    if (startIndex > lastIndex) {
      result.push({ type: "text", content: text.substring(lastIndex, startIndex) });
    }
    const emojiUrl = BASIC_EMOJI_URL + BASIC_EMOJI_URL_MAPPING[emojiKey];
    if (emojiUrl) {
      result.push({ type: "image", content: emojiUrl, emojiKey });
    } else {
      result.push({ type: "text", content: emojiKey });
    }
    lastIndex = endIndex;
    emojiRegex.lastIndex = lastIndex;
  }
  if (lastIndex < text.length) {
    result.push({ type: "text", content: text.substring(lastIndex) });
  }
  return result;
};
exports.BASIC_EMOJI_URL_MAPPING = BASIC_EMOJI_URL_MAPPING;
exports.EMOJI_GROUP_LIST = EMOJI_GROUP_LIST;
exports.convertKeyToEmojiName = convertKeyToEmojiName;
exports.parseTextToRenderArray = parseTextToRenderArray;
exports.transformTextWithEmojiNamesToKeys = transformTextWithEmojiNamesToKeys;
exports.transformTextWithKeysToEmojiNames = transformTextWithKeysToEmojiNames;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/emoji-config/index.js.map
