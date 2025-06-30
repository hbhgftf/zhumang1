import { customerServicePayloadType } from '../interface';
import {CUSTOM_MESSAGE_SRC, TYPES, WHITE_LIST} from '../constant';
import { IMessageModel } from '@tencentcloud/chat-uikit-engine';

// Determine if it is a JSON string
export function isJSON(str: string): boolean {
  // eslint-disable-next-line no-useless-escape
  if (typeof str === 'string') {
    try {
      const data = JSON.parse(str);
      if (data) {
        return true;
      }
      return false;
    } catch (error: any) {
      return false;
    }
  }
  return false;
}

// Determine if it is a JSON string
export function JSONToObject(str: string) {
  if (!isJSON(str)) {
    return str;
  }
  return JSON.parse(str);
}

export function isCustomerServiceMessage(message: IMessageModel): boolean {
  const customerServicePayload: customerServicePayloadType = JSONToObject(message?.payload?.data);
  return Number(customerServicePayload?.customerServicePlugin) === 0 || Number(customerServicePayload?.chatbotPlugin) === 1;
}

export const isMessageRating = (message: IMessageModel): boolean => {
  const customerServicePayload: customerServicePayloadType = JSONToObject(message?.payload?.data);
  return isCustomerServiceMessage(message) && customerServicePayload.src === CUSTOM_MESSAGE_SRC.MENU;
};

export const isThinkingMessage = (message: IMessageModel): boolean => {
  const isCustomMessage = message?.type === TYPES.MSG_CUSTOM;
  const customerServicePayload: customerServicePayloadType = JSONToObject(message?.payload?.data);
  return isCustomMessage && customerServicePayload?.src === CUSTOM_MESSAGE_SRC.THINKING && customerServicePayload?.thinkingStatus === 0;
}

export const isThinkingMessageOverTime = (message: IMessageModel): boolean => {
  const messageTime = message.time * 1000;
  const minute = 60 * 1000;
  const now = Date.now();
  if (now - messageTime > minute) {
    return false;
  }
  return true;
}

export const isMessageInvisible = (message: IMessageModel): boolean => {
  const customerServicePayload: customerServicePayloadType = JSONToObject(message?.payload?.data);
  const robotCommandArray = ['feedback', 'updateBotStatus'];
  const isCustomerMessage = message?.type === TYPES.MSG_CUSTOM;
  const isGroupTipMessage = message?.type === TYPES.MSG_GROUP_TIP;
  const isCustomerInvisible = customerServicePayload?.src && !WHITE_LIST.includes(customerServicePayload?.src);
  const isMultiFormMessage:boolean =  customerServicePayload?.src !== null && customerServicePayload?.src === CUSTOM_MESSAGE_SRC.MULTI_FORM && message.flow === 'out';
  const isRobot = customerServicePayload?.src === CUSTOM_MESSAGE_SRC.ROBOT && robotCommandArray.indexOf(customerServicePayload?.content?.command) !== -1;
  return (isCustomerMessage && (isCustomerInvisible || isRobot || isMultiFormMessage)) || isGroupTipMessage;
};

export const isSupportedLang = (lang: string): boolean => {
  return [
    'zh', // Simplified Chinese中文简体：zh
    'zh-TW', // Traditional Chinese中文繁体：zh-TW
    'en', // English英语：en
    'id', // Indonesian印度尼西亚语：id
    'vi', // Vietnamese越南语：vi
    'ja', // Japanese日语：ja
    'fil', // Filipino菲律宾语：fil
    'ru', // Russian俄语：ru
  ].indexOf(lang) !== -1;
}

// 如果用户选择 block cookies，此时访问 localStorage 浏览器会抛错
// Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document
// 通过 navigator.cookieEnabled 短路逻辑规避
const canIUseCookies = () => {
  // When the browser is configured to block third-party cookies, and navigator.cookieEnabled is invoked inside a third-party iframe,
  // it returns true in Safari, Edge Spartan and IE (while trying to set a cookie in such scenario would fail).
  // It returns false in Firefox and Chromium-based browsers.
  if (typeof window !== 'undefined') {
    return window.navigator?.cookieEnabled && localStorage;

  }
  return false;
}

export const clearChatStorage = (SDKAppID, userID) => {
  if (canIUseCookies()) {
    localStorage.removeItem(`TIM_${SDKAppID}_${userID}_conversationMap`);
  }
}
