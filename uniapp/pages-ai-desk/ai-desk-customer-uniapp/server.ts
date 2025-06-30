import TUICore, { TUIConstants } from '@tencentcloud/tui-core';
import {
  isCustomerServiceMessage,
  isThinkingMessage,
  isMessageInvisible,
  clearChatStorage,
} from './utils/index';
import TUIChatEngine, {
  TUIChatService,
  TUIConversationService,
  IMessageModel,
  TUITranslateService,
  SendMessageParams,
  SendMessageOptions,
  TUIUserService,
} from '@tencentcloud/chat-uikit-engine';
import Log from './utils/logger';
import { version } from './package.json'
import { Toast, TOAST_TYPE } from "./components/common/Toast/index-uniapp";
import { vueVersion } from "./adapter-vue-uniapp";
import { switchReadStatus } from "./utils/utils";
import state from "./utils/state";

interface IInitWithProfile {
  SDKAppID: number,
  userID: string,
  userSig: string,
  nickName?: string,
  avatar?: string,
}

interface IProfile {
  nick?: string,
  avatar?: string,
}

export default class TUICustomerServer {
  private isLoggedIn: boolean;
  static instance: TUICustomerServer;
  private customerServiceAccounts: any[];
  private loggedInUserID: string;
  private myProfile: IProfile;
  constructor() {
    TUICore.registerService(TUIConstants.TUICustomerServicePlugin.SERVICE.NAME, this);
    TUICore.registerExtension(TUIConstants.TUIContact.EXTENSION.CONTACT_LIST.EXT_ID, this);
    this.customerServiceAccounts = ['@customer_service_account'];
    this.isLoggedIn = false;
    this.loggedInUserID = '';
    this.myProfile = {};
  }

  static getInstance(): TUICustomerServer {
    if (!TUICustomerServer.instance) {
      TUICustomerServer.instance = new TUICustomerServer();
    }
    return TUICustomerServer.instance;
  }

  private loginCustomerUIKit(SDKAppID:number, userID:string, userSig:string) {
    clearChatStorage(SDKAppID, userID);
    TUIChatEngine.login({
      SDKAppID,
      userID,
      userSig,
      useUploadPlugin: true,
    }).then(() => {
      Log.i(`login success. userID:${userID}`);
      this.isLoggedIn = true;
      this.loggedInUserID = userID;
      TUIConversationService.switchConversation('C2C@customer_service_account');
      switchReadStatus(state.get('showReadStatus'));
      TUIChatEngine.chat.callExperimentalAPI('isFeatureEnabledForStat', Math.pow(2, 42));
    })
    .catch((error) => {
      Toast({
        message: TUITranslateService.t('TUIChat.登录失败'),
        type: TOAST_TYPE.ERROR,
        duration: 30000,
      });
      Log.l(error);
    })
  }

  public init(SDKAppID:number, userID:string, userSig:string) {
    Log.l(`TUICustomerServer.init vue:${vueVersion} version:${version} SDKAppID:${SDKAppID} userID:${userID} isLoggedIn:${this.isLoggedIn} loggedInUserID:${this.loggedInUserID}`);
    if (this.isLoggedIn) {
      if (this.loggedInUserID === userID) {
        return;
      }
      this.unInit().finally(() => {
        this.isLoggedIn = false;
        this.loginCustomerUIKit(SDKAppID, userID, userSig);
      });
    } else {
      this.loginCustomerUIKit(SDKAppID, userID, userSig);
    }
  }

  public initWithProfile(options: IInitWithProfile) {
    const { SDKAppID, userID, userSig, nickName, avatar } = options;
    Log.l(`TUICustomerServer.initWithProfile version:${version}`);
    if (nickName) {
      // chat 个人资料的昵称是 nick
      this.myProfile.nick = nickName;
    }
    if (avatar) {
      this.myProfile.avatar = avatar;
    }
    this.init(SDKAppID, userID, userSig);
  }

  public unInit() {
    return TUIChatEngine.logout();
  }

  public sendTextMessage(options: SendMessageParams, sendMessageOptions?: SendMessageOptions) {
    return TUIChatService.sendTextMessage(options, sendMessageOptions);
  }

  public sendCustomMessage(options: SendMessageParams, sendMessageOptions?: SendMessageOptions) {
    return TUIChatService.sendCustomMessage(options, sendMessageOptions);
  };

  public changeLanguage(language: string) {
    return TUITranslateService.changeLanguage(language).then(() => {
      Log.i(`language changed to ${language}`);
    });
  }

  public getLoggedInUserID() {
    return this.loggedInUserID;
  }

  // Determine if the current session is a customer service session
  public isCustomerConversation(conversationID: string) {
    const userID = (conversationID && conversationID.slice(3)) || '';
    return this.customerServiceAccounts.indexOf(userID) > -1;
  }

  // Determine if the current message is a customer service message
  public isCustomerServicePluginMessage(message: IMessageModel) {
    if (!message || !this.isCustomerConversation(message.conversationID)) {
      return false;
    }
    if (isThinkingMessage(message)) {
      return false;
    }
    return isCustomerServiceMessage(message) || isMessageInvisible(message);
  }

  public onGetExtension(extensionID: string) {
    if (extensionID === TUIConstants.TUIContact.EXTENSION.CONTACT_LIST.EXT_ID) {
      return [
        {
          weight: 0,
          icon: '',
          text: '智能客服',
          data: {
            name: 'customer',
            accountList: this.customerServiceAccounts,
          },
        },
      ];
    }
  }

  public onCall(method: string, params: any) {
    Log.l(`TUICustomerServer.onCall method:${method} params:`, params);
    if (method === TUIConstants.TUICustomerServicePlugin.SERVICE.METHOD.ACTIVE_CONVERSATION) {
      if (this.isCustomerConversation(params.conversationID)) {
        // 如果有资料，确保资料更新完成（或失败）后再激活会话服务流
        if (Object.keys(this.myProfile).length > 0) {
          Log.l(`TUICustomerServer.onCall updateMyProfile:${JSON.stringify(this.myProfile)}`);
          TUIUserService.updateMyProfile({...this.myProfile}).finally(() => {
            this.activeServiceFlow(params);
          });
        } else {
          this.activeServiceFlow(params);
        }
      }
    }
  }

  // 激活会话服务流
  private activeServiceFlow(params: any) {
    TUIChatService.sendCustomMessage({
      to: params.conversationID.slice(3),
      conversationType: TUIChatEngine.TYPES.CONV_C2C,
      payload: {
        data: JSON.stringify({
          src: '7',
          customerServicePlugin: 0,
          triggeredContent: typeof params.robotLang === 'undefined' ? undefined : { language: params.robotLang }
        }),
      },
    }, { onlineUserOnly: true });
  }
}
