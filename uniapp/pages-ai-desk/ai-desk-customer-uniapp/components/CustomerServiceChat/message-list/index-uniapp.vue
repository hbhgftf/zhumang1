<template>
  <div
    :class="{
      'tui-chat': true,
      'tui-chat-h5': isUniFrameWork,
    }"
    @click="onMessageListBackgroundClick"
  >
    <div class="tui-chat-main">
      <scroll-view
        id="messageScrollList"
        class="tui-message-list"
        scroll-y="true"
        :scroll-top="scrollTop"
        :scroll-into-view="`tui-${historyFirstMessageID}`"
        @scroll="handelScrollListScroll"
      >
        <p
          v-if="messageList.length && !isCompleted"
          class="message-more"
          @click="getHistoryMessageList"
        >
          {{ TUITranslateService.t("TUIChat.查看更多") }}
        </p>
        <li
          v-for="(item, index) in messageList"
          :id="`tui-${item.ID}`"
          :key="item.vueForRenderKey"
          :class="'message-li ' + item.flow"
        >
          <MessageTimestamp
            :currTime="item.time"
            :prevTime="index > 0 ? messageList[index - 1].time : 0"
          />
          <div
            class="message-item"
            @click="toggleID = ''"
          >
            <div
              v-if="!item.isRevoked && !isPluginMessage(item)"
              :id="`msg-bubble-${item.ID}`"
              class="message-bubble-container"

            >
              <MessageBubble
                :messageItem="deepCopy(item)"
                :content="item.getMessageContent()"
                :isAudioPlayed="audioPlayedMapping[item.ID]"
                :blinkMessageIDList="blinkMessageIDList"
                @resendMessage="resendMessage(item)"
                @blinkMessage="blinkMessage"
                @scrollTo="scrollTo"
                @handleToggleMessageItem="handleToggleMessageItem($event, item, index, true)"
                @handleTouchStart="handleH5LongPress($event, item, index, 'touchstart')"
                @handleTouchEnd="handleH5LongPress($event, item, index, 'touchend')"
              >
                <MessageThinking v-if="isThinkingMessage(item)"/>
                <MessageText
                  v-else-if="item.type === TYPES.MSG_TEXT"
                  :content="item.getMessageContent()"
                />
                <ProgressMessage
                  v-else-if="item.type === TYPES.MSG_IMAGE"
                  :content="item.getMessageContent()"
                  :messageItem="deepCopy(item)"
                >
                  <MessageImage
                    :content="item.getMessageContent()"
                    :messageItem="item"
                    @previewImage="handleImagePreview(index)"
                  />
                </ProgressMessage>
                <ProgressMessage
                  v-else-if="item.type === TYPES.MSG_VIDEO"
                  :content="item.getMessageContent()"
                  :messageItem="deepCopy(item)"
                >
                  <MessageVideo
                    :content="item.getMessageContent()"
                    :messageItem="item"
                  />
                </ProgressMessage>
                <MessageAudio
                  v-else-if="item.type === TYPES.MSG_AUDIO"
                  :content="item.getMessageContent()"
                  :messageItem="item"
                  :broadcastNewAudioSrc="broadcastNewAudioSrc"
                  @setAudioPlayed="setAudioPlayed"
                  @getGlobalAudioContext="getGlobalAudioContext"
                />
                <MessageRecord
                  v-else-if="item.type === TYPES.MSG_MERGER"
                  :renderData="item.payload"
                  :messageItem="item"
                  @assignMessageIDInUniapp="assignMessageIDInUniapp"
                />
                <MessageFile
                  v-else-if="item.type === TYPES.MSG_FILE"
                  :content="item.getMessageContent()"
                />
                <MessageFace
                  v-else-if="item.type === TYPES.MSG_FACE"
                  :content="item.getMessageContent()"
                />
                <MessageLocation
                  v-else-if="item.type === TYPES.MSG_LOCATION"
                  :content="item.getMessageContent()"
                />
                <MessageCustom
                  v-else-if="item.type === TYPES.MSG_CUSTOM"
                  :content="item.getMessageContent()"
                  :messageItem="item"
                />
              </MessageBubble>
            </div>
            <MessagePlugin
              v-else-if="!item.isRevoked && isPluginMessage(item)"
              :message="deepCopy(item)"
              @resendMessage="resendMessage"
              @handleToggleMessageItem="handleToggleMessageItem"
              @handleH5LongPress="handleH5LongPress"
              @showFormPopup="handleShowFormPopup"
              @heightChanged="onHeightChanged"
            />
            <MessageRevoked
              v-else
              :isEdit="item.type === TYPES.MSG_TEXT"
              :messageItem="item"
              @messageEdit="handleEdit(item)"
            />
            <!-- message tool -->
            <MessageTool
              v-if="item.ID === toggleID"
              :class="{
                'message-tool': true,
                'message-tool-out': item.flow === 'out',
                'message-tool-in': item.flow === 'in',
              }"
              :messageItem="item"
            />
          </div>
        </li>
      </scroll-view>
      <!-- scroll button -->
      <ScrollButton
        ref="scrollButtonInstanceRef"
        @scrollToLatestMessage="scrollToLatestMessage"
      />
      <Dialog
        v-if="reSendDialogShow"
        :show="reSendDialogShow"
        :isH5="true"
        :center="true"
        :isHeaderShow="false"
        @submit="resendMessageConfirm()"
        @update:show="(e) => (reSendDialogShow = e)"
      >
        <p class="delDialog-title">
          {{ TUITranslateService.t("TUIChat.确认重发该消息？") }}
        </p>
      </Dialog>
      <!-- simple message list -->
      <Drawer
        :visible="isShowSimpleMessageList"
        :overlayColor="'transparent'"
        :popDirection="'right'"
      >
        <SimpleMessageList
          :style="{ height: '100%' }"
          :isMounted="isShowSimpleMessageList"
          :messageID="simpleMessageListRenderMessageID"
          @closeOverlay="isShowSimpleMessageList = false"
        />
      </Drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../adapter-vue';
import TUIChatEngine, {
  IMessageModel,
  TUIStore,
  StoreName,
  TUITranslateService,
  TUIChatService,
} from '@tencentcloud/chat-uikit-engine';
import { throttle } from 'lodash';
import {
  setInstanceMapping,
  getBoundingClientRect,
  getScrollInfo,
} from '@tencentcloud/universal-api';
import SimpleMessageList from './message-elements/simple-message-list/index.vue';
import MessageText from './message-elements/message-text.vue';
import MessageImage from './message-elements/message-image-uniapp.vue';
import MessageAudio from './message-elements/message-audio-uniapp.vue';
import MessageRecord from './message-elements/message-record/index.vue';
import MessageFile from './message-elements/message-file.vue';
import MessageFace from './message-elements/message-face.vue';
import MessageCustom from './message-elements/message-custom.vue';
import MessageBubble from './message-elements/message-bubble-uniapp.vue';
import MessageLocation from './message-elements/message-location.vue';
import MessageTimestamp from './message-elements/message-timestamp.vue';
import MessageVideo from './message-elements/message-video-uniapp.vue';
import MessageTool from './message-tool/index-uniapp.vue';
import MessageRevoked from './message-tool/message-revoked.vue';
import MessagePlugin from './message-elements/message-desk/message-plugin-uniapp.vue';
import MessageThinking from './message-elements/message-thinking.vue';
import ScrollButton from './scroll-button/index.vue';
import { isPluginMessage } from './message-elements/message-desk/index';
import Dialog from '../../common/Dialog/index.vue';
import Drawer from '../../common/Drawer/index.vue';
import { Toast, TOAST_TYPE } from '../../common/Toast/index-uniapp';
import ProgressMessage from '../../common/ProgressMessage/index.vue';
import {
  isEnabledMessageReadReceiptGlobal,
  deepCopy,
} from '../../../utils/utils';
import { isH5, isUniFrameWork} from '../../../utils/env';
import chatStorage from '../../../utils/chatStorage';
import { IAudioContext } from '../../../interface';
import {isMessageInvisible, isThinkingMessage, isThinkingMessageOverTime, JSONToObject} from '../../../utils/index';
const { ref, nextTick, onMounted, onUnmounted, getCurrentInstance } = vue;
import {isCustomerConversation} from '../../../index';
import {CUSTOM_MESSAGE_SRC} from "../../../constant";
interface IEmits {
  (e: 'closeInputToolBar'): void;
  (e: 'handleEditor', message: IMessageModel, type: string): void;
  (e:'showFormPopup',data:boolean):void;
}

const emits = defineEmits<IEmits>();

let selfAddValue = 0;
let observer: any = null;
const sentReceiptMessageID = new Set<string>();
const thisInstance = getCurrentInstance()?.proxy || getCurrentInstance();

const messageList = ref<IMessageModel[]>([]);
const isCompleted = ref(false);
const currentConversationID = ref('');
const toggleID = ref('');
const scrollTop = ref(5000); // The initial number of messages is 15, and the maximum message height is 300.
const TYPES = ref(TUIChatEngine.TYPES);
const isLoadingMessage = ref(false);
const isLongpressing = ref(false);
const blinkMessageIDList = ref<string[]>([]);
const messageTarget = ref<IMessageModel>();
const scrollButtonInstanceRef = ref<InstanceType<typeof ScrollButton>>();
const historyFirstMessageID = ref<string>('');
const isShowSimpleMessageList = ref<boolean>(false);
const simpleMessageListRenderMessageID = ref<string>();
const audioPlayedMapping = ref<Record<string, boolean>>({});

// audio control
const broadcastNewAudioSrc = ref<string>('');

// Resend Message Dialog
const reSendDialogShow = ref(false);
const resendMessageData = ref();

const scrollToBottom = () => {
  scrollTop.value += 300;
  // Solve the issue where swiping to the bottom for the first time after packaging Uniapp into an app has a delay,
  // which can be set to 300 ms.
  const timer = setTimeout(() => {
    scrollTop.value += 1;
    clearTimeout(timer);
  }, 300);
};

const onCurrentConversationIDUpdated = (conversationID: string) => {
  currentConversationID.value = conversationID;

  if (Object.keys(audioPlayedMapping.value).length > 0) {
    // Synchronize storage about whether the audio has been played when converstaion switched
    chatStorage.setChatStorage('audioPlayedMapping', audioPlayedMapping.value);
  }
};

onMounted(() => {
  // Retrieve the information about whether the audio has been played from localStorage
  audioPlayedMapping.value
    = chatStorage.getChatStorage('audioPlayedMapping') || {};

  TUIStore.watch(StoreName.CONV, {
    currentConversationID: onCurrentConversationIDUpdated,
  });

  TUIStore.watch(StoreName.CHAT, {
    messageList: onMessageListUpdated,
    messageSource: onMessageSourceUpdated,
    isCompleted: onChatCompletedUpdated,
    newMessageList: onNewMessageList,
  });

  setInstanceMapping('messageList', thisInstance);

  uni.$on('scroll-to-bottom', scrollToLatestMessage);
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CHAT, {
    messageList: onMessageListUpdated,
    messageSource: onMessageSourceUpdated,
    isCompleted: onChatCompletedUpdated,
    newMessageList: onNewMessageList,
  });

  TUIStore.unwatch(StoreName.CONV, {
    currentConversationID: onCurrentConversationIDUpdated,
  });

  observer?.disconnect();
  observer = null;

  uni.$off('scroll-to-bottom');

  if (Object.keys(audioPlayedMapping.value).length > 0) {
    // Synchronize storage about whether the audio has been played when the component is unmounted
    chatStorage.setChatStorage('audioPlayedMapping', audioPlayedMapping.value);
  }
});

const handelScrollListScroll = throttle(
  function (e: Event) {
    scrollButtonInstanceRef.value?.judgeScrollOverOneScreen(e);
  },
  500,
  { leading: true },
);

function getGlobalAudioContext(
  audioMap: Map<string, IAudioContext>,
  options?: { newAudioSrc: string },
) {
  if (options?.newAudioSrc) {
    broadcastNewAudioSrc.value = options.newAudioSrc;
  }
}

function onNewMessageList(list: IMessageModel[]) {
  list.forEach((message: IMessageModel) => {
    if (message?.type === TUIChatEngine.TYPES.MSG_CUSTOM) {
      const data = JSONToObject(message?.payload?.data);
      if (data?.src === CUSTOM_MESSAGE_SRC.SEAT_STATUS) {
        if (data?.content.command === "updateSeatStatus") {
          if (data.content.content === 'inSeat') {
            TUIStore.update(StoreName.CUSTOM, "isInHumanService", true);
          } else if (data.content.content === 'outSeat') {
            TUIStore.update(StoreName.CUSTOM, "isInHumanService", false);
          }
        }
      } else if (data?.src === CUSTOM_MESSAGE_SRC.TYPING_STATE) {
        if (data?.typingStatus === 1) {
          TUIStore.update(StoreName.CUSTOM, 'isTyping', true);
        } else {
          TUIStore.update(StoreName.CUSTOM, 'isTyping', false);
        }
      }
    }
  });
}

async function onMessageListUpdated(list: IMessageModel[]) {
  if(!isCustomerConversation(currentConversationID.value)){
    return;
  }
  observer?.disconnect();

  messageList.value = list
    .filter((message) => {
      if (isThinkingMessage(message)) {
        return isThinkingMessageOverTime(message);
      }
      return !message.isDeleted && !isMessageInvisible(message as any);
    })
    .map((message) => {
      message.vueForRenderKey = `${message.ID}`;
      return message;
    });

  if (messageTarget.value) {
    // scroll to target message
    scrollAndBlinkMessage(messageTarget.value);
  } else if (
    !isLoadingMessage.value
    && !(
      scrollButtonInstanceRef.value?.isScrollButtonVisible
      && newLastMessage?.flow === 'in'
    )
  ) {
    // scroll to bottom
    nextTick(() => {
      scrollToBottom();
    });
  }
  if (isEnabledMessageReadReceiptGlobal()) {
    nextTick(() => bindIntersectionObserver());
  }
}

async function scrollToLatestMessage() {
  try {
    const { scrollHeight } = await getScrollInfo(
      '#messageScrollList',
      'messageList',
    );
    if (scrollHeight) {
      scrollTop.value === scrollHeight
        ? (scrollTop.value = scrollHeight + 1)
        : (scrollTop.value = scrollHeight);
    } else {
      scrollToBottom();
    }
  } catch (error) {
    scrollToBottom();
  }
  scrollButtonInstanceRef.value?.hideScrollButton();
}

async function onMessageSourceUpdated(message: IMessageModel) {
  messageTarget.value = message;
  scrollAndBlinkMessage(messageTarget.value);
}

function scrollAndBlinkMessage(message: IMessageModel) {
  if (
    messageList.value?.some(
      messageListItem => messageListItem?.ID === message?.ID,
    )
  ) {
    nextTick(async () => {
      await scrollToTargetMessage(message);
      await blinkMessage(message?.ID);
      messageTarget.value = undefined;
    });
  }
}

function onChatCompletedUpdated(flag: boolean) {
  isCompleted.value = flag;
}

const getHistoryMessageList = () => {
  isLoadingMessage.value = true;
  const currentFirstMessageID = messageList.value?.[0]?.ID || '';
  TUIChatService.getMessageList().then(() => {
    nextTick(() => {
      historyFirstMessageID.value = currentFirstMessageID;
      const timer = setTimeout(() => {
        historyFirstMessageID.value = '';
        isLoadingMessage.value = false;
        clearTimeout(timer);
      }, 500);
    });
  });
};

// toggle message
const handleToggleMessageItem = (
  e: any,
  message: IMessageModel,
  index: number,
  isLongpress = false,
) => {
  if (isLongpress) {
    isLongpressing.value = true;
  }
  toggleID.value = message.ID;
};

// h5 long press
let timer: number;
const handleH5LongPress = (
  e: any,
  message: IMessageModel,
  index: number,
  type: string,
) => {
  if (!isH5) return;
  function longPressHandler() {
    clearTimeout(timer);
    handleToggleMessageItem(e, message, index, true);
  }
  function touchStartHandler() {
    timer = setTimeout(longPressHandler, 500);
  }
  function touchEndHandler() {
    clearTimeout(timer);
  }
  switch (type) {
    case 'touchstart':
      touchStartHandler();
      break;
    case 'touchend':
      touchEndHandler();
      setTimeout(() => {
        isLongpressing.value = false;
      }, 200);
      break;
  }
};

// reedit message
const handleEdit = (message: IMessageModel) => {
  emits('handleEditor', message, 'reedit');
};

const resendMessage = (message: IMessageModel) => {
  reSendDialogShow.value = true;
  resendMessageData.value = message;
};

const handleImagePreview = (index: number) => {
  if (!messageList.value) {
    return;
  }
  const imageMessageIndex: number[] = [];
  const imageMessageList: IMessageModel[] = messageList.value.filter(
    (item, index) => {
      if (
        !item.isRevoked
        && !item.hasRiskContent
        && item.type === TYPES.value.MSG_IMAGE
      ) {
        imageMessageIndex.push(index);
        return true;
      }
      return false;
    },
  );
  uni.previewImage({
    current: imageMessageIndex.indexOf(index),
    urls: imageMessageList.map(
      message => message.payload.imageInfoArray?.[2].url,
    ),
    // #ifdef APP-PLUS
    indicator: 'number',
    // #endif
  });
};

const resendMessageConfirm = () => {
  reSendDialogShow.value = !reSendDialogShow.value;
  const messageModel = resendMessageData.value;
  messageModel.resendMessage();
};

function blinkMessage(messageID: string): Promise<void> {
  return new Promise((resolve) => {
    const index = blinkMessageIDList.value.indexOf(messageID);
    if (index < 0) {
      blinkMessageIDList.value.push(messageID);
      const timer = setTimeout(() => {
        blinkMessageIDList.value.splice(
          blinkMessageIDList.value.indexOf(messageID),
          1,
        );
        clearTimeout(timer);
        resolve();
      }, 3000);
    }
  });
}

function scrollTo(scrollHeight: number) {
  scrollTop.value = scrollHeight;
}

async function bindIntersectionObserver() {
  if (!messageList.value || messageList.value.length === 0) {
    return;
  }

  observer?.disconnect();
  observer = uni
    .createIntersectionObserver(thisInstance, {
      threshold: [0.7],
      observeAll: true,
      // In Uni-app, the `safetip` is also included, so a negative margin is needed to exclude it.
    })
    .relativeTo('#messageScrollList', { top: -70 });

  observer?.observe('.message-li.in .message-bubble-container', (res: any) => {
    if (sentReceiptMessageID.has(res.id)) {
      return;
    }
    const matchingMessage = messageList.value.find((message: IMessageModel) => {
      return res.id.indexOf(message.ID) > -1;
    });
    if (
      matchingMessage
      && matchingMessage.needReadReceipt
      && matchingMessage.flow === 'in'
      && !matchingMessage.readReceiptInfo?.isPeerRead
    ) {
      TUIChatService.sendMessageReadReceipt([matchingMessage]);
      sentReceiptMessageID.add(res.id);
    }
  });
}

async function scrollToTargetMessage(message: IMessageModel) {
  const targetMessageID = message.ID;
  const isTargetMessageInScreen
    = messageList.value
    && messageList.value.some(msg => msg.ID === targetMessageID);
  if (targetMessageID && isTargetMessageInScreen) {
    const timer = setTimeout(async () => {
      try {
        const scrollViewRect = await getBoundingClientRect(
          '#messageScrollList',
          'messageList',
        );
        const originalMessageRect = await getBoundingClientRect(
          '#tui-' + targetMessageID,
          'messageList',
        );
        const { scrollTop } = await getScrollInfo(
          '#messageScrollList',
          'messageList',
        );
        const finalScrollTop
          = originalMessageRect.top
          + scrollTop
          - scrollViewRect.top
          - (selfAddValue++ % 2);
        scrollTo(finalScrollTop);
        clearTimeout(timer);
      } catch (error) {
        // todo
      }
    }, 500);
  } else {
    Toast({
      message: TUITranslateService.t('TUIChat.无法定位到原消息'),
      type: TOAST_TYPE.WARNING,
    });
  }
}

function onMessageListBackgroundClick() {
  emits('closeInputToolBar');
}

function assignMessageIDInUniapp(messageID: string) {
  simpleMessageListRenderMessageID.value = messageID;
  isShowSimpleMessageList.value = true;
}

function setAudioPlayed(messageID: string) {
  audioPlayedMapping.value[messageID] = true;
}

function handleShowFormPopup(data: boolean) {
  console.log("handleshowformpopup-messagelist", data);
  emits('showFormPopup', data);
}

function onHeightChanged() {
  scrollToBottom();
}

defineExpose({
  scrollToLatestMessage,
});
</script>
<style lang="scss" scoped src="./style/index.scss"></style>
