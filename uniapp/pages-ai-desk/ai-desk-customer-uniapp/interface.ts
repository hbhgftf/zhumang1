import { TOOLBAR_BUTTON_TYPE, INPUT_TOOLBAR_TYPE } from './constant';

export interface customerServicePayloadType {
  chatbotPlugin?: number | string;
  customerServicePlugin?: number | string;
  src: string | number;
  content: any;
  subtype?: string;
  isFinished?: number;
  chunks?: string[];
  status?:number;
  nodeStatus?:number;
  thinkingStatus?:number;
}

interface IMenuItem {
  content: string;
  id: string;
}

export interface ratingTemplateType {
  allowClientSendRating: boolean;
  effectiveHour: number;
  head: string;
  tail: string;
  type: number;
  menu: IMenuItem[];
  expireTime: number;
  selected?: IMenuItem;
  sessionId?: string;
}

export interface TextMessagePayload {
  text: string;
}

export interface CustomMessagePayload {
  data: string;
  description: string;
  extension: string;
}

export interface IMessageModel {
  ID: string;
  type: string;
  payload: any;
  conversationID: string;
  conversationType: string;
  to: string;
  from: string;
  flow: string;
  time: number;
  status: string;
  isRevoked: boolean;
  priority: string;
  nick: string;
  avatar: string;
  isPeerRead: boolean;
  nameCard: string;
  atUserList: string[];
  cloudCustomData: string;
  isDeleted: boolean;
  isModified: boolean;
  needReadReceipt: boolean;
  readReceiptInfo: any;
  isBroadcastMessage: boolean;
  isSupportExtension: boolean;
  receiverList?: string[];
  revoker: string;
  sequence: number;
  progress: number;
  revokerInfo: {
    userID: string;
    nick: string;
    avatar: string;
  };
  revokeReason: string;
  hasRiskContent: boolean;
  [key: string]: any;
}

export type ToolbarDisplayType = 'emojiPicker' | 'tools' | 'none';

export interface IEmojiGroup {
  type: string;
  emojiGroupID: number;
  url: string;
  list: string[];
}

export type IEmojiGroupList = IEmojiGroup[];

export interface IImageMessageContent {
  showName?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface IMergeMessageContent {
  abstractList: string[];
  compatibleText: string;
  downloadKey: string;
  layersOverLimit: boolean;
  messageList: Array<{
    avatar: string;
    ID: string;
    cloudCustomData: string;
    from: string;
    messageBody: Array<{
      type: string;
      payload: Record<string, any>;
    }>;
    messageReceiver: string;
    messageRandom: number;
    messageSender: string;
    messageSequence: number;
    messageTime: number;
    nick: string;
    receiverUserID: string;
    time: number;
  }>;
  pbDownloadKey: string;
  showName: string;
  title: string;
  version: number;
}

export interface IFileMessageContent {
  name: string;
  url: string;
  size: number;
}

export interface IVideoMessageContent {
  showName: string; // video message sender name
  url: string; // video url
  snapshotUrl: string; // video snapshot url
  snapshotWidth: number; // video snapshot width
  snapshotHeight: number; // video snapshot height
}

export interface IAudioMessageContent {
  showName: string;
  url: string;
  second: number;
}

export interface IAudioContext {
  src: string | undefined;
  startTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  destroy: () => void;
  onPlay: (callback: (...args: any[]) => void) => void;
  onPause: (callback: (...args: any[]) => void) => void;
  onStop: (callback: (...args: any[]) => void) => void;
  onEnded: (callback: (...args: any[]) => void) => void;
  onError: (callback: (...args: any[]) => void) => void;
}

export interface ITipTapEditorContent {
  type: 'text' | 'image' | 'video' | 'file';
  payload: {
    text?: string;
    file?: File;
    atUserList?: string[];
  };
}

export type InputDisplayType = 'editor' | 'audio';

export interface ISendMessagePayload {
  text?: string;
  file?: any;
  atUserList?: string[];
}

// 快捷按钮已有功能
export type ToolbarButtonPresetType = typeof TOOLBAR_BUTTON_TYPE[keyof typeof TOOLBAR_BUTTON_TYPE];

export interface ToolbarButtonModel {
  title: string, // 名称
  icon?: string, // 图标
  type?: number,  // 类型 1:关键词回复 2:跳转链接
  content?: string, // 发送的文本或跳转的链接
  presetId?: ToolbarButtonPresetType, // 若要显示已有功能，填写相关type
  isPreset?: number, // 是否是预置功能  0:非预置 1:预置类型
  isEnabled?: number,  // 是否显示
  renderCondition?: () => {},  // [UIKit] 是否显示
  clickEvent?: () => void, // [UIKit] 点击事件
}

// 输入框功能 已有功能
export type InputToolbarPresetType = typeof INPUT_TOOLBAR_TYPE[keyof typeof INPUT_TOOLBAR_TYPE];

export interface InputToolbarModel {
  title?: string, // 名称
  icon?: string, // 图标
  type?: number,  // 类型 1:关键词回复 2:跳转链接
  content?: string, // 发送的文本或跳转的链接
  isPreset?: number, // 是否是预置功能  0:非预置 1:预置类型
  presetId?: InputToolbarPresetType, // 若要显示已有功能，填写相关type
  isEnabled?: number,  // 是否显示
  renderCondition?: () => {},// [UIKit] 是否显示
  clickEvent?: () => void,// [UIKit] 点击事件
}
