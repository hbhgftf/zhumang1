<template>
  <ToolbarItemContainer
    :iconFile="isH5?fileIconH5:fileIcon"
    :title="TUITranslateService.t('文件')"
    :iconWidth="isUniFrameWork ? '32px' : '21px'"
    :iconHeight="isUniFrameWork ? '25px' : '18px'"
    :needDialog="false"
    @onIconClick="onIconClick"
  >
    <div :class="['file-upload', 'file-upload-h5']">
      <input
        ref="inputRef"
        title="TUITranslateService.t('文件')"
        type="file"
        data-type="file"
        accept="*"
        @change="sendFileMessage"
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
import vue from '../../../../adapter-vue';
import ToolbarItemContainer from '../toolbar-item-container/index.vue';
import fileIcon from '../../../../assets/files.png';
import fileIconH5 from '../../../../assets/file-h5.png';
import {  isUniFrameWork,isH5 } from '../../../../utils/env';
import { isEnabledMessageReadReceiptGlobal } from '../../../../utils/utils';
const { ref } = vue;

const inputRef = ref();
const currentConversation = ref<IConversationModel>();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const onIconClick = () => {
  return;
};

const sendFileMessage = (e: any) => {
  if (e?.target?.files?.length <= 0) {
    return;
  }
  const options = {
    to:
      currentConversation?.value?.groupProfile?.groupID
      || currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type,
    payload: {
      file: e?.target,
    },
    needReadReceipt: isEnabledMessageReadReceiptGlobal(),
  } as SendMessageParams;
  const sendMessageOptions: SendMessageOptions = {};
  TUIChatService.sendFileMessage(options, sendMessageOptions);
  e.target.value = '';
};
</script>
<style lang="scss" scoped>
@import "../../style/common";
</style>
