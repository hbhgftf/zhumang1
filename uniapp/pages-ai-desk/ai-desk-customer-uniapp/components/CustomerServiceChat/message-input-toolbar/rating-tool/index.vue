<template>
  <ToolbarItemContainer
      :iconFile="getIcon()"
      :title="props.title"
      :iconWidth="isPC ? '21px' : '25px'"
      :iconHeight= "isPC ? '18px' : '25px'"
      :needDialog="false"
      @onIconClick="onIconClick"
      :isH5ToolShow="isH5ToolShow"
  >
    <div
        :class="['image-upload', !isPC && 'image-upload-h5','image-video']"
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
  TUITranslateService,
  TUIChatEngine
} from '@tencentcloud/chat-uikit-engine';
import vue from '../../../../adapter-vue';
import { isPC, isH5 } from '../../../../utils/env';
import ToolbarItemContainer from '../toolbar-item-container/index.vue';
import ratingToolIcon from '../../../../assets/rating_tool_icon.svg'
import ratingToolIconH5 from '../../../../assets/rating_tool_icon_h5.svg';
import { CUSTOM_MESSAGE_SRC } from '../../../../constant';
const { ref } = vue;

const props = defineProps({
  isH5ToolShow:{
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: TUITranslateService.t('AIDesk.提交评价')
  },
  icon: {
    type: String,
    default: '',
  }
});

const currentConversation = ref<IConversationModel>();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const  getIcon = (): string => {
  return props.icon || (isH5 ? ratingToolIconH5 : ratingToolIcon);
}

const onIconClick = () => {
  TUIChatService.sendCustomMessage({
    to:
        currentConversation?.value?.groupProfile?.groupID
        || currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type === 'C2C' ? TUIChatEngine.TYPES.CONV_C2C : TUIChatEngine.TYPES.CONV_GROUP,
    payload:{
      data:JSON.stringify({
        src: CUSTOM_MESSAGE_SRC.USER_SATISFACTION,
        customerServicePlugin: 0,
      }),
    },
  },{ onlineUserOnly: true })
};
</script>

<style lang="scss" scoped>
@import "../../style/common";
</style>
