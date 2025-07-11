<template>
  <div>
    <div
      class="message-record-container"
      @click="openMergeDetail"
    >
      <div class="record-title">
        {{ props.renderData.title }}
      </div>
      <div class="record-abstract-container">
        <div
          v-for="(item, index) in props.renderData.abstractList.slice(0, 7)"
          :key="index"
          class="record-abstract-item"
        >
          {{ transformTextWithKeysToEmojiNames(item) }}
        </div>
      </div>
      <div class="record-footer">
        {{ TUITranslateService.t("TUIChat.聊天记录") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../../../adapter-vue';
import {
  TUITranslateService,
  IMessageModel,
} from '@tencentcloud/chat-uikit-engine';
import { transformTextWithKeysToEmojiNames } from '../../../emoji-config/index';
import { IMergeMessageContent } from '../../../../../interface';
const { ref, withDefaults } = vue;

interface IEmits {
  (e: 'assignMessageIDInUniapp', messageID: string): void;
}

interface IProps {
  // Core data for rendering message record card and message list
  renderData: IMergeMessageContent;
  /**
   * The MessageRecord component has two main functions:
   * 1. display message record cards primarily.
   * 2. clicking on it and show the simple message list.
   * When used as a nested component with the disabled prop
   * it is only need renderData to render message record cards.
   * Therefore, 'messageItem' and 'disabled' is not a required prop.
   */
  disabled?: boolean;
  messageItem?: IMessageModel;
}

const emits = defineEmits<IEmits>();
const props = withDefaults(defineProps<IProps>(), {
  messageItem: () => ({} as IMessageModel),
  disabled: false,
});

const isMessageListVisible = ref(false);

function openMergeDetail() {
  if (props.disabled) {
    return;
  }
  emits('assignMessageIDInUniapp', props.messageItem.ID);
}

function closeMergeDetail() {
  isMessageListVisible.value = false;
}
</script>
<style lang="scss" scoped>
:not(not) {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
}

.message-record-container {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  max-width: 400px;
  min-width: 180px;
  overflow: hidden;

  .record-abstract-container {
    color: #bbb;
    font-size: 12px;
    margin: 8px 0;
  }

  .record-footer {
    color: #888;
    font-size: 11px;
    padding-top: 5px;
    border-top: 1px solid #eee;
  }
}
</style>
