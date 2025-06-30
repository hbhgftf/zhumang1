<template>
  <div
    :class="[
      'message-input-toolbar',
      'message-input-toolbar-h5',
      'message-input-toolbar-uni',
    ]"
  >
    <div v-if="props.displayType === 'emojiPicker'">
      <EmojiPickerDialog />
    </div>
    <div v-else>
      <swiper
        :class="['message-input-toolbar-swiper']"
        :indicator-dots="isSwiperIndicatorDotsEnable"
        :autoplay="false"
        :circular="false"
      >
        <swiper-item
          :class="[
            'message-input-toolbar-list',
            'message-input-toolbar-h5-list',
            'message-input-toolbar-uni-list',
          ]"
        >
          <ImageUpload imageSourceType="camera" />
          <ImageUpload imageSourceType="album" />
          <VideoUpload v-if="isWeChat && TUIGlobal.chooseMedia !== undefined" videoSourceType="album" />
          <VideoUpload v-if="isWeChat && TUIGlobal.chooseMedia !== undefined" videoSourceType="camera" />
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import vue from '../../../adapter-vue';
import TUIChatEngine, {
  IConversationModel,
  TUIStore,
  StoreName,
} from '@tencentcloud/chat-uikit-engine';
import { TUIGlobal } from '@tencentcloud/universal-api';
import { isWeChat } from '../../../utils/env';
import ImageUpload from './image-upload/index.vue';
import VideoUpload from './video-upload/index.vue';
import EmojiPickerDialog from './emoji-picker/emoji-picker-dialog.vue';
import { ToolbarDisplayType } from '../../../interface';
const { ref, onUnmounted, onMounted } = vue;

interface IProps {
  displayType: ToolbarDisplayType;
  isH5EmojiShow?:boolean;
  isH5ToolShow?:boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

const currentConversation = ref<IConversationModel>();
const isGroup = ref<boolean>(false);
const isSwiperIndicatorDotsEnable = ref<boolean>(false);

const onCurrentConversationUpdate = (conversation: IConversationModel) => {
  currentConversation.value = conversation;
  isGroup.value
    = currentConversation?.value?.type === TUIChatEngine.TYPES.CONV_GROUP;
};

onMounted(() => {
  TUIStore.watch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdate,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdate,
  });
});
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
};
</script>
<style lang="scss">
@import "../style/common";
@import "./style/uni";
</style>
