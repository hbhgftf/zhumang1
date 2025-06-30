<template>
  <ToolbarItemContainer
    :iconFile="imageToolbarForShow.icon"
    :title="imageToolbarForShow.title"
    :iconWidth="isUniFrameWork ? '32px' : '21px'"
    :iconHeight="isUniFrameWork ? '25px' : '18px'"
    :needDialog="false"
    @onIconClick="onIconClick"
    :isH5ToolShow="isH5ToolShow"
  >
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
import { isH5,isWeChat, isUniFrameWork } from '../../../../utils/env';
import ToolbarItemContainer from '../toolbar-item-container/index.vue';
import imageUniIcon from '../../../../assets/image-uni.png';
import cameraUniIcon from '../../../../assets/camera-uni.png';
import { isEnabledMessageReadReceiptGlobal } from '../../../../utils/utils';
const { ref, computed } = vue;

const props = defineProps({
  // Image source: only valid for uni-app version, web version only supports selecting images from the album.
  // album: Select from album
  // camera: Take a photo using the camera
  imageSourceType: {
    type: String,
    default: 'album',
  },
  isH5ToolShow:{
    type:Boolean,
    default:false,
  }
});

const inputRef = ref();
const currentConversation = ref<IConversationModel>();
const IMAGE_TOOLBAR_SHOW_MAP = {
  uni_album: {
    icon: imageUniIcon,
    title: TUITranslateService.t("图片"),
  },
  uni_camera: {
    icon: cameraUniIcon,
    title: TUITranslateService.t("拍照"),
  },
};

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const imageToolbarForShow = computed((): { icon: string; title: string } => {
    return props.imageSourceType === 'camera'
      ? IMAGE_TOOLBAR_SHOW_MAP['uni_camera']
      : IMAGE_TOOLBAR_SHOW_MAP['uni_album'];
});

const onIconClick = () => {
  // uni-app send image
  if (isWeChat && TUIGlobal?.chooseMedia) {
    TUIGlobal?.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sizeType: ['original', 'compressed'],
      sourceType: [props.imageSourceType], // Use camera or select from album.
      success: function (res: any) {
        if(res.tempFiles[0].fileType == 'image'){
          sendImageMessage(res);
        } else if(res.tempFiles[0].fileType == 'video'){
          sendVideoMessage(res);
        }
      },
    });
  } else {
    // uni-app H5/App send image
    TUIGlobal?.chooseImage({
      count: 1,
      sourceType: [props.imageSourceType], // Use camera or select from album.
      success: function (res) {
        sendImageMessage(res);
      },
    });
  }

};

const sendImageMessage = (files: any) => {
  if (!files) {
    return;
  }
  const options = {
    to:
      currentConversation?.value?.groupProfile?.groupID
      || currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type,
    payload: {
      file: files,
    },
    needReadReceipt: isEnabledMessageReadReceiptGlobal(),
  } as SendMessageParams;
  const sendMessageOptions: SendMessageOptions = {};
  TUIChatService.sendImageMessage(options, sendMessageOptions);
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
