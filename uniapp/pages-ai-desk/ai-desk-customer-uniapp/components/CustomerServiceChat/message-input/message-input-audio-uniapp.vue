<template>
  <div
    :class="{
      'message-input-audio': true,
      'message-input-audio-open': isAudioTouchBarShow,
    }"
  >
  <div class="audio-message-icon-container">
    <Icon
      class="audio-message-icon"
      :file="props.isEnableAudio ? keyboardIcon:audioIcon"
      :size="'23px'"
      :hotAreaSize="'3px'"
      @onClick="switchAudio"
    />
  </div>
    
    <view
      v-if="props.isEnableAudio"
      class="audio-input-touch-bar"
      @touchstart="handleTouchStart"
      @longpress="handleLongPress"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <span>{{ TUITranslateService.t(`TUIChat.${touchBarText}`) }}</span>

      <view
        v-if="isRecording"
         class="record-container"
      >
      
        <view class="audio-bubble-blue">
          <Icon
              :file="willCancelBySlide?audioBubbleRed:audioBubbleBlue"
              width="160px"
              height="74px"
            />
            <view class="loading">
              <view class="line1"></view>
              <view class="line3"></view>
              <view class="line2"></view>
              <view class="line4"></view>
              <view class="line1"></view>
              <view class="line3"></view>
              <view class="line4"></view>
              <view class="line1"></view>
              <view class="line2"></view>
              <view class="line1"></view>
              <view class="line4"></view>
              <view class="line3"></view>
            </view>
        </view>
          

        <view class="modal-text">
            {{ TUITranslateService.t(`TUIChat.${modalText}`) }}
        </view>
        <Icon
          class="audio-delete-icon"
          :file="willCancelBySlide? audioDeleteIcon:audioBeforeDeleteIcon"
          width="54px"
          height="54px"
        />
        <Icon
            class="audio-record-icon"
            width="16px"
            height="20px"
            :file="audioRecordIcon"
            
          />
        <view class="icon-container">
          
        </view>
      </view>
    </view>
  </div>
</template>

<script setup lang="ts">
import vue from '../../../adapter-vue';
import {
  TUIStore,
  StoreName,
  TUIChatService,
  SendMessageParams,
  IConversationModel,
  TUITranslateService,
} from '@tencentcloud/chat-uikit-engine';
import { TUIGlobal } from '@tencentcloud/universal-api';
import { throttle } from 'lodash';
import Icon from '../../common/Icon.vue';
import audioIcon from '../../../assets/audio-blue.png';
import keyboardIcon from '../../../assets/keyboard_icon.png';
import { Toast, TOAST_TYPE } from '../../common/Toast/index-uniapp';
import { isEnabledMessageReadReceiptGlobal } from '../../../utils/utils';
import { InputDisplayType } from '../../../interface';
import audioRecordIcon from '../../../assets/msg-audio.svg';
import audioBeforeDeleteIcon from '../../../assets/audio-before-delete.svg';
import audioDeleteIcon from '../../../assets/audio-delete.svg';
import audioBubbleBlue from '../../../assets/audio-bubble-blue.svg';
import audioBubbleRed from '../../../assets/audio-bubble-red.svg';
const { ref, onMounted, onUnmounted } = vue;

interface IProps {
  isEnableAudio: boolean;
}

interface IEmits {
  (e: 'changeDisplayType', type: InputDisplayType): void;
}

interface RecordResult {
  tempFilePath: string;
  duration?: number;
  fileSize?: number;
}

type TouchBarText = '按住说话' | '抬起发送' | '抬起取消';
type ModalText = '正在录音' | '继续上滑可取消' | '松开手指 取消发送';

const emits = defineEmits<IEmits>();
const props = withDefaults(defineProps<IProps>(), {
  isEnableAudio: false,
});

let recordTime: number = 0;
let isManualCancelBySlide = false;
let recordTimer: number | undefined;
let firstTouchPageY: number = -1;
let isFingerTouchingScreen = false;
let isFirstAuthrizedRecord = false;
const recorderManager = TUIGlobal?.getRecorderManager();

const isRecording = ref(false);
const touchBarText = ref<TouchBarText>('按住说话');
const modalText = ref<ModalText>('正在录音');
const isAudioTouchBarShow = ref<boolean>(false);
const currentConversation = ref<IConversationModel>();
const willCancelBySlide = ref(false);

const recordConfig = {
  // Duration of the recording, in ms, with a maximum value of 600000 (10 minutes)
  duration: 60000,
  // Sampling rate
  sampleRate: 44100,
  // Number of recording channels
  numberOfChannels: 1,
  // Encoding bit rate
  encodeBitRate: 192000,
  // Audio format
  // Select this format to create audio messages that can be interoperable across all chat platforms (Android, iOS, WeChat Mini Programs, and Web).
  format: 'mp3',
};

function switchAudio() {
  emits('changeDisplayType', props.isEnableAudio ? 'editor' : 'audio');
}


onMounted(() => {
  // Register events for the audio recording manager
  recorderManager.onStart(onRecorderStart);
  recorderManager.onStop(onRecorderStop);
  recorderManager.onError(onRecorderError);

  TUIStore.watch(StoreName.CONV, {
    currentConversation: onCurrentConverstaionUpdated,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CONV, {
    currentConversation: onCurrentConverstaionUpdated,
  });
});

function onCurrentConverstaionUpdated(conversation: IConversationModel) {
  currentConversation.value = conversation;
}

function initRecorder() {
  initRecorderData();
  initRecorderView();
}

function initRecorderView() {
  isRecording.value = false;
  touchBarText.value = '按住说话';
  modalText.value = '正在录音';
}

function initRecorderData(options?: { hasError: boolean }) {
  clearInterval(recordTimer);
  recordTimer = undefined;
  recordTime = 0;
  firstTouchPageY = -1;
  isManualCancelBySlide = false;
  if (!options?.hasError) {
    recorderManager.stop();
  }
}

function handleTouchStart() {
  if (isFingerTouchingScreen) {
    // Compatibility: Ignore the recording generated by the user's first authorization on the APP.
    isFirstAuthrizedRecord = true;
  }
}

function handleLongPress() {
  isFingerTouchingScreen = true;
  recorderManager.start(recordConfig);
}

const handleTouchMove = throttle(function (e) {
  if (isRecording.value) {
    const pageY = e.changedTouches[e.changedTouches.length - 1].pageY;
    if (firstTouchPageY < 0) {
      firstTouchPageY = pageY;
    }
    const offset = (firstTouchPageY as number) - pageY;
    if (offset > 110) {
      touchBarText.value = '抬起取消';
      modalText.value = '松开手指 取消发送';
      isManualCancelBySlide = true;
      willCancelBySlide.value = true;
    } else if (offset > 50) {
      touchBarText.value = '抬起发送';
      modalText.value = '继续上滑可取消';
      isManualCancelBySlide = false;
      willCancelBySlide.value = false;
    } else {
      touchBarText.value = '抬起发送';
      modalText.value = '正在录音';
      isManualCancelBySlide = false;
      willCancelBySlide.value = false;
    }
  }
}, 100);

function handleTouchEnd() {
  isFingerTouchingScreen = false;
  recorderManager.stop();
}

function onRecorderStart() {
  if (!isFingerTouchingScreen) {
    // If recording starts but the finger leaves the screen,
    // it means that the initial authorization popup interrupted the recording and it should be ignored.
    isFirstAuthrizedRecord = true;
    recorderManager.stop();
    return;
  }
  recordTimer = setInterval(() => {
    recordTime += 1;
  }, 1000);
  touchBarText.value = '抬起发送';
  isRecording.value = true;
}

function onRecorderStop(res: RecordResult) {
  if (isFirstAuthrizedRecord) {
    // Compatibility: Ignore the recording generated by the user's first authorization on WeChat. This is not applicable to the APP.
    isFirstAuthrizedRecord = false;
    initRecorder();
    return;
  }
  if (isManualCancelBySlide || !isRecording.value) {
    initRecorder();
    return;
  }
  clearInterval(recordTimer);
  /**
   * Compatible with uniapp for building apps
   * Compatible with uniapp voice messages without duration
   * Duration and fileSize need to be supplemented by the user
   * File size = (Audio bitrate) * Length of time (in seconds) / 8
   * res.tempFilePath stores the temporary path of the recorded audio file
   */
  const tempFilePath = res.tempFilePath;
  const duration = res.duration ? res.duration : recordTime * 1000;
  const fileSize = res.fileSize ? res.fileSize : ((48 * recordTime) / 8) * 1024;

  if (duration < 1000) {
    Toast({
      message: '录音时间太短',
      type: TOAST_TYPE.NORMAL,
      duration: 1500,
    });
  } else {
    const options = {
      to:
        currentConversation?.value?.groupProfile?.groupID
        || currentConversation?.value?.userProfile?.userID,
      conversationType: currentConversation?.value?.type,
      payload: { file: { duration, tempFilePath, fileSize } },
      needReadReceipt: isEnabledMessageReadReceiptGlobal(),
    } as SendMessageParams;
    TUIChatService?.sendAudioMessage(options);
  }
  initRecorder();
}

function onRecorderError() {
  initRecorderData({ hasError: true });
  initRecorderView();
}
</script>

<style lang="scss" scoped>
@import "../style/common";

@keyframes voiceBar {
  from,
  10%{
    height:10rpx;
  }
  to,
  90%{
    height:50rpx;
  }
}

.message-input-audio {
  display: flex;
  flex-direction: row;
  align-items: center;

  .audio-message-icon-container{
    background-color: #fff;
    padding: 3px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .audio-message-icon {
  }

  .audio-input-touch-bar {
    height: 39px;
    flex: 1;
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .record-container{
      height:60vh;
      width: 100vw;
      position:fixed;
      overflow: hidden;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0));
      .audio-record-icon{
        position:absolute;
        bottom:50px;
        left: 50%;
        transform: translateX(-50%);
        z-index:2;
      }
      .audio-delete-icon{
        position:absolute;
        bottom:32%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
      }
      .icon-container{
        position: absolute;
        bottom: -183%;
        left: -70%;
        width: 950px;
        height: 950px;
        border-radius: 50%;
        background: linear-gradient(180deg, #E8EDF3 -1.18%, #FBFBFB 4.94%);
        box-shadow: 0px -7.5px 5px 0px rgba(218, 224, 232, 0.15);
      }
      .modal-text{
        position:absolute;
        top:43%;
        left: 50%;
        transform: translateX(-50%);
        color:#4E5461;
        
      }
      .audio-bubble-blue{
        position:absolute;
        top:20%;
        left: 50%;
        transform: translateX(-50%);
        .loading{
          position:absolute;
          top:35rpx;
          left:25rpx;
        }
        .loading>view {
          display:inline-block;
          vertical-align: middle;
          width: 8rpx;
          background-color: #fff;
          margin-right: 16rpx;
          border-radius: 50rpx;
        }
        .line1 {
          animation: voiceBar 0.6s infinite ease-in-out alternate;
        }
        .line2 {
          animation: voiceBar 0.4s infinite ease-in-out alternate;
        }
        .line3 {
          animation: voiceBar 0.5s infinite ease-in-out alternate;
        }
        .line4 {
          animation: voiceBar 0.3s infinite ease-in-out alternate;
        }
      }
    }

    .record-modal {
      height: 300rpx;
      width: 60vw;
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      border-radius: 24rpx;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .red-mask {
        position: absolute;
        inset: 0;
        background-color: rgba(#ff3e48, 0.5);
        opacity: 0;
        transition: opacity 10ms linear;
        z-index: 1;
      }

      .moving-slider {
        margin: 10vw;
        width: 40rpx;
        height: 16rpx;
        border-radius: 4rpx;
        background-color: #006fff;
        animation: loading 1s ease-in-out infinite alternate;
        z-index: 2;
      }

      .float-element {
        position: relative;
        z-index: 2;
      }
    }

    @keyframes loading {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(30vw, 0);
        background-color: #f5634a;
        width: 40px;
      }
    }

    .modal-title {
      text-align: center;
      color: #fff;
    }
  }

  &-open {
    flex: 1;
  }
}
</style>
