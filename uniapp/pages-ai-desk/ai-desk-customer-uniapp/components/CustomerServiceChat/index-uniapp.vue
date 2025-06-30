<template>
  <div :class="['tui-chat', 'tui-chat-h5']">
    <div
      v-if="currentConversationID"
      :class="['tui-chat', 'tui-chat-h5']"
    >
      <MessageList
        ref="messageListRef"
        :class="['tui-chat-message-list', 'tui-chat-h5-message-list']"
        @handleEditor="handleEditor"
        @closeInputToolBar="() => changeToolbarDisplayType('none')"
        @showFormPopup="handleShowFormPopup"
      />
      <MessageToolbarButton
        :toolbarButtonList="props.toolbarButtonList"
      />
      <MessageInputToolbar
        v-if="isInputToolbarShow"
        :class="[
          'tui-chat-message-input-toolbar',
          'tui-chat-h5-message-input-toolbar',
          isUniFrameWork && 'tui-chat-uni-message-input-toolbar',
        ]"
        :displayType="inputToolbarDisplayType"
        @insertEmoji="insertEmoji"
        @changeToolbarDisplayType="changeToolbarDisplayType"
        @scrollToLatestMessage="scrollToLatestMessage"
      />
      <MessageInput
        ref="messageInputRef"
        :class="[
          'tui-chat-message-input',
          'tui-chat-h5-message-input',
          isUniFrameWork && !isH5 && 'tui-chat-uni-message-input',
          isWeChat && 'tui-chat-wx-message-input',
          isUniFormShow && 'tui-chat-uni-message-input-hide',
        ]"
        :isMuted="isMuted"
        :muteText="muteText"
        :canSendAudio="props.canSendAudio"
        placeholder=""
        :inputToolbarDisplayType="inputToolbarDisplayType"
        @changeToolbarDisplayType="changeToolbarDisplayType"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import vue from '../../adapter-vue';
import TUIChatEngine, {
  TUITranslateService,
  TUIStore,
  StoreName,
  IMessageModel,
} from '@tencentcloud/chat-uikit-engine';
import TUICore, { TUIConstants } from '@tencentcloud/tui-core';
import MessageList from './message-list/index-uniapp.vue';
import MessageInput from './message-input/index-uniapp.vue';
import MessageInputToolbar from './message-input-toolbar/index-uniapp.vue';
import { isWeChat, isUniFrameWork, isH5, isApp } from '../../utils/env';
import { ToolbarButtonModel, InputToolbarModel, ToolbarDisplayType } from '../../interface';
import { isSupportedLang } from '../../utils/';
import Log from '../../utils/logger';
import MessageToolbarButton from './message-toolbar-button/index.vue';
import TUILocales from '../../locales';
import { Toast, TOAST_TYPE } from "../common/Toast/index-uniapp";
import state from '../../utils/state.js';

const { ref, onMounted, onUnmounted, computed } = vue;
const emits = defineEmits(['closeChat']);
const currentConversationID = ref();
const inputToolbarDisplayType = ref<ToolbarDisplayType>('none');
const messageInputRef = ref();
const messageListRef = ref<InstanceType<typeof MessageList>>();
const isMuted = ref(false);
const muteText = ref('');
const isUniFormShow = ref<boolean>(false);
const languages = Object.keys(TUILocales);

interface IProps {
  robotLang?:string;
  userLang?:string;
  canSendAudio?:boolean;
  toolbarButtonList?:ToolbarButtonModel[];
  showAvatar?: number;
  robotAvatar?: string;
  staffAvatar?: string;
  userAvatar?: string;
  showNickName?: number;
  robotNickName?: string;
  staffNickName?: string;
  userNickName?: string;
  inputToolbarList?: InputToolbarModel[];
  showReadStatus?: number;
  showTyping?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  robotLang: '',
  userLang: '',
  canSendAudio: false,
  toolbarButtonList: () => [] as ToolbarButtonModel[],
  showReadStatus: 1,
  showAvatar: 1,
  robotAvatar: '',
  staffAvatar: '',
  userAvatar: '',
  showNickName: 0,
  robotNickName: '',
  staffNickName: '',
  userNickName: '',
  inputToolbarList: () => [] as InputToobarModel[],
  showTyping: 0,
});

const convertLanguageToLowercase = (language) => {
  if (!language) {
    return 'zh';
  }
  let lowercase = language.toLowerCase();
  if (lowercase === 'zh-cn' || lowercase === 'zh_cn') {
    lowercase = 'zh';
  } else if (lowercase === 'zh-tw' || lowercase === 'zh-hk') {
    lowercase = 'zh_tw';
  }
  return lowercase;
}

const initLanguage = () => {
  Log.i(`initLanguage ${props.userLang}`);
  TUITranslateService.provideLanguages({ ...TUILocales });
  TUITranslateService.useI18n();
  let language;
  if (props.userLang !== '') {
    language = convertLanguageToLowercase(props.userLang);
    if (!languages.includes(language)) {
      Log.w(`userLang:${props.userLang} is not supported`);
      language = 'en';
    }
  } else {
    if (isApp) {
      const { osLanguage } = uni.getDeviceInfo();
      Log.i(`initLanguage osLanguage:${osLanguage}`);
      language = convertLanguageToLowercase(osLanguage);
    } else if (isWeChat) {
      language = 'zh';
    } else if (navigator) {
      language = convertLanguageToLowercase(navigator.language);
    }

    if (!languages.includes(language)) {
      language = 'en';
    }
  }
  TUITranslateService.changeLanguage(language);
}

const setAvatarNickName = () => {
  state.set('avatarNickName',{
    showAvatar: props.showAvatar,
    showNickName: props.showNickName,
    userAvatar: props.userAvatar,
    staffAvatar: props.staffAvatar,
    robotAvatar: props.robotAvatar,
    userNickName: props.userNickName,
    staffNickName: props.staffNickName,
    robotNickName: props.robotNickName
  });
}

const setShowReadStatus = () => {
  state.set('showReadStatus', props.showReadStatus);
}

const setShowTyping = () => {
  state.set('showTyping', props.showTyping);
}

// 小程序平台暂不支持切换语言
if (!isWeChat) {
  initLanguage();
}
setAvatarNickName();
setShowReadStatus();
setShowTyping();

onMounted(() => {
  const logPrefix = 'CustomerServiceChat onMounted.';
  Log.l(`${logPrefix} engineReady:${TUIChatEngine.isReady()}`);
  if (props.robotLang && !isSupportedLang(props.robotLang)) {
    Log.w(`${logPrefix} robotLang:${props.robotLang} is not supported`);
  }

  TUIStore.watch(StoreName.CONV, {
    currentConversationID: onCurrentConversationIDUpdate,
  });
  TUIStore.watch(StoreName.USER, {
    kickedOut: onKickedOut
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CONV, {
    currentConversationID: onCurrentConversationIDUpdate,
  });
  TUIStore.unwatch(StoreName.USER, {
    kickedOut: onKickedOut
  });
});

const isInputToolbarShow = computed<boolean>(() => {
  return isUniFrameWork ? inputToolbarDisplayType.value !== 'none' : true;
});

const insertEmoji = (emojiObj: object) => {
  messageInputRef.value?.insertEmoji(emojiObj);
};

const handleEditor = (message: IMessageModel, type: string) => {
  if (!message || !type) return;
  switch (type) {
    case 'reference':
      // todo
      break;
    case 'reply':
      // todo
      break;
    case 'reedit':
      if (message?.payload?.text) {
        messageInputRef?.value?.reEdit(message?.payload?.text);
      }
      break;
    default:
      break;
  }
};

function changeToolbarDisplayType(type: ToolbarDisplayType) {
  inputToolbarDisplayType.value
    = inputToolbarDisplayType.value === type ? 'none' : type;
  if (inputToolbarDisplayType.value !== 'none' && isUniFrameWork) {
    uni.$emit('scroll-to-bottom');
  }
}

function scrollToLatestMessage() {
  messageListRef.value?.scrollToLatestMessage();
}

function onKickedOut(type: string) {
  if (type) {
    isMuted.value = true;
    // muteText.value = TUITranslateService.t('TUIChat.账号被强制下线');
    Toast({
      message: TUITranslateService.t('TUIChat.账号被强制下线'),
      type: TOAST_TYPE.ERROR,
      duration: 30000,
    });
  }
}

function onCurrentConversationIDUpdate(conversationID: string) {
  if (!conversationID) {
    return;
  }

  if (currentConversationID.value === conversationID) {
    return;
  }

  currentConversationID.value = conversationID;

  // The TUICustomerServicePlugin plugin determines if the current conversation is a customer service conversation, then sets chatType and activates the conversation.
  TUICore.callService({
    serviceName: TUIConstants.TUICustomerServicePlugin.SERVICE.NAME,
    method: TUIConstants.TUICustomerServicePlugin.SERVICE.METHOD.ACTIVE_CONVERSATION,
    params: {
      conversationID: conversationID,
      robotLang: props.robotLang && isSupportedLang(props.robotLang) ? props.robotLang : undefined,
    },
  });
}
function handleShowFormPopup(data: boolean) {
  isUniFormShow.value = data;
}
</script>

<style scoped lang="scss" src="./style/index.scss"></style>
