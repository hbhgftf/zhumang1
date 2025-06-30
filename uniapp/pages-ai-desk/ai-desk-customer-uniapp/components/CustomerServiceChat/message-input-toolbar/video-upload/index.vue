<template>
  <ToolbarItemContainer
    :iconFile="handleIcon()"
    :title="handleTitle()"
    :needDialog="false"
    :iconWidth="isUniFrameWork ? '32px' : '21px'"
    :iconHeight="
      isUniFrameWork
        ? props.videoSourceType === 'album'
          ? '20px'
          : '25px'
        : '18px'
    "
    @onIconClick="onIconClick"
  >
    <div :class="['video-upload', 'video-upload-h5']">
      <input
        ref="inputRef"
        :title="TUITranslateService.t('视频')"
        type="file"
        data-type="video"
        accept="video/*"
        @change="sendVideoInWeb"
      >
    </div>
  </ToolbarItemContainer>
</template>
<script lang="ts" setup>
import {
  TUIChatService,
  TUIStore,
  StoreName,
  IConversationModel,
  SendMessageParams,
  SendMessageOptions,
  TUITranslateService,
} from '@tencentcloud/chat-uikit-engine';
import { TUIGlobal } from '@tencentcloud/universal-api';
import vue from '../../../../adapter-vue';
import { isWeChat, isUniFrameWork } from '../../../../utils/env';
import ToolbarItemContainer from '../toolbar-item-container/index.vue';
import videoUniIcon from '../../../../assets/video-uni.png';
import cameraUniIcon from '../../../../assets/camera-uni.png';
import { isEnabledMessageReadReceiptGlobal } from '../../../../utils/utils';
const { ref } = vue;

const props = defineProps({
  // Video source, only valid for uni-app version, web version only supports selecting videos from files
  // album: Select from files
  // camera: Take a video using the camera
  videoSourceType: {
    type: String,
    default: 'album',
  },
});

const inputRef = ref();
const currentConversation = ref<IConversationModel>();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const handleIcon = (): string => {
    switch (props.videoSourceType) {
      case 'album':
        return videoUniIcon;
      case 'camera':
        return cameraUniIcon;
      default:
        return videoUniIcon;
    }

};

const handleTitle = (): string => {
  if (props.videoSourceType === 'camera') {
    return TUITranslateService.t('录制');
  } else {
    return TUITranslateService.t('视频');
  }
};

const onIconClick = () => {
  // uni-app send video
  if (isWeChat && TUIGlobal?.chooseMedia) {
    TUIGlobal?.chooseMedia({
      mediaType: ['video'],
      count: 1,
      sourceType: [props.videoSourceType],
      maxDuration: 60,
      success: function (res: any) {
        sendVideoMessage(res);
      },
    });
  } else {
    TUIGlobal?.chooseVideo({
      count: 1,
      sourceType: [props.videoSourceType],
      compressed: false,
      success: function (res: any) {
        sendVideoMessage(res);
      },
    });
  }

};

const sendVideoInWeb = (e: any) => {
  if (e?.target?.files?.length <= 0) {
    return;
  }
  sendVideoMessage(e?.target);
  e.target.value = '';
};

const sendVideoMessage = (file: any) => {
  if (!file) {
    return;
  }
  const options = {
    to:
      currentConversation?.value?.groupProfile?.groupID
      || currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type,
    payload: {
      file,
    },
    needReadReceipt: isEnabledMessageReadReceiptGlobal(),
  } as SendMessageParams;
  const sendMessageOptions: SendMessageOptions = {};
  TUIChatService.sendVideoMessage(options, sendMessageOptions);
};
</script>

<style lang="scss" scoped>
@import "../../style/common";
</style>
