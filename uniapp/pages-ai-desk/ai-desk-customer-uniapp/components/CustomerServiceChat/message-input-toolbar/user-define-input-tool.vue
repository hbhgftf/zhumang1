<template>
  <ToolbarItemContainer
      :iconFile="getIcon()"
      :title="props.title"
      :iconWidth="isPC ? '20px' : '25px'"
      :iconHeight="isPC ? '20px' : '25px'"
      :needDialog="false"
      @onIconClick="onIconClick"
      :isH5ToolShow="isH5ToolShow">
    <div :class="['image-upload', !isPC && 'image-upload-h5', 'image-video']">
    </div>
  </ToolbarItemContainer>
</template>
<script lang="ts" setup>
import {
  TUIChatService,
  TUIStore,
  StoreName,
  IConversationModel,
} from '@tencentcloud/chat-uikit-engine';
import vue from '../../../adapter-vue';
import { isPC } from '../../../utils/env';
import ToolbarItemContainer from './toolbar-item-container/index.vue';
import { isEnabledMessageReadReceiptGlobal, openSafeUrl, getTo } from '../../../utils/utils';
const { ref } = vue;

const props = defineProps({
  isH5ToolShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '',
  },
  type: {
    type: Number,
    default: 1
  },
  content: {
    type: String,
    default: ''
  }
});

const currentConversation = ref<IConversationModel>();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const getIcon = (): string => {
  return props.icon;
}

const onIconClick = () => {
  if (props.type === 1 && props.content) {
    TUIChatService.sendTextMessage({
      to: getTo(currentConversation?.value),
      conversationType: currentConversation?.value?.type,
      payload: {
        text: props.content
      },
      needReadReceipt: isEnabledMessageReadReceiptGlobal(),
    });
  } else if (props.type === 2 && props.content) {
    openSafeUrl(props.content);
  }
};
</script>

<style lang="scss" scoped>
@import "../style/common";
</style>
