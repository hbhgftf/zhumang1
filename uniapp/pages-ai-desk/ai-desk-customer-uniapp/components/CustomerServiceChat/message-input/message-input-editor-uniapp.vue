<template>
  <div
    :class="{
      'message-input-container': true,
      'message-input-container-h5': true,
    }"
  >
    <div
      v-if="props.isMuted"
      class="message-input-mute"
    >
      {{ props.muteText }}
    </div>
    <input
      id="editor"
      ref="inputRef"
      v-model="inputText"
      :adjust-position="true"
      cursor-spacing="20"
      confirm-type="send"
      :confirm-hold="true"
      type="text"
      class="message-input-area"
      auto-blur
      @confirm="handleSendMessage"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    >
  </div>
</template>
<script lang="ts" setup>
import vue from '../../../adapter-vue';
import {
  TUIStore,
  StoreName,
  IConversationModel,
  IMessageModel,
} from '@tencentcloud/chat-uikit-engine';
import DraftManager from '../utils/conversationDraft';
import { transformTextWithEmojiNamesToKeys } from '../emoji-config';
import { sendMessages } from '../utils/sendMessage';
import { ISendMessagePayload } from '../../../interface';
const { ref, watch, onMounted, onUnmounted } = vue;

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  replayOrReferenceMessage: {
    type: Object,
    default: () => ({}),
    required: false,
  },
  isMuted: {
    type: Boolean,
    default: true,
  },
  muteText: {
    type: String,
    default: '',
  },
  enableInput: {
    type: Boolean,
    default: true,
  },
  enableTyping: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['onTyping', 'onFocus', 'isInputNotEmpty']);
const inputText = ref('');
const inputRef = ref();
const inputBlur = ref(true);
const inputContentEmpty = ref(true);
const currentConversation = ref<IConversationModel>();
const currentConversationID = ref<string>('');
const currentQuoteMessage = ref<{ message: IMessageModel; type: string }>();

onMounted(() => {
  TUIStore.watch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdated,
  });

  TUIStore.watch(StoreName.CHAT, {
    quoteMessage: onQuoteMessageUpdated,
  });

  uni.$on('insert-emoji', (data) => {
    inputText.value += data?.emoji?.name;
    emits('isInputNotEmpty', true);
  });

  uni.$on('send-message-in-emoji-picker', () => {
    handleSendMessage();
  });
});

onUnmounted(() => {
  if (currentConversationID.value) {
    DraftManager.setStore(
      currentConversationID.value,
      inputText.value,
      inputText.value,
      currentQuoteMessage.value,
    );
  }

  uni.$off('insertEmoji');
  uni.$off('send-message-in-emoji-picker');

  TUIStore.unwatch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdated,
  });

  TUIStore.unwatch(StoreName.CHAT, {
    quoteMessage: onQuoteMessageUpdated,
  });

  reset();
});

const handleSendMessage = () => {
  const messageList = getEditorContent();
  resetEditor();
  sendMessages(messageList as any, currentConversation.value!);
};

const getEditorContent = () => {
  let text = inputText.value;
  text = transformTextWithEmojiNamesToKeys(text);
  const payload: ISendMessagePayload = {
    text,
  };
  return [
    {
      type: 'text',
      payload,
    },
  ];
};

const resetEditor = () => {
  inputText.value = '';
  inputContentEmpty.value = true;
  emits('isInputNotEmpty', false);
};

const setEditorContent = (content: any) => {
  inputText.value = content;
};

const onBlur = () => {
  inputBlur.value = true;
};

const onFocus = (e: any) => {
  inputBlur.value = false;
  emits('onFocus', e?.detail?.height);
};

const isEditorContentEmpty = () => {
  inputContentEmpty.value = inputText?.value?.length ? false : true;
  emits('isInputNotEmpty', !inputContentEmpty.value);
};

const onInput = () => {
  // uni-app recognizes mention messages
  isEditorContentEmpty();
};

watch(
  () => [inputContentEmpty.value, inputBlur.value],
  (newVal: any, oldVal: any) => {
    if (newVal !== oldVal) {
      emits('onTyping', inputContentEmpty.value, inputBlur.value);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function onCurrentConversationUpdated(conversation: IConversationModel) {
  const prevConversationID = currentConversationID.value;
  currentConversation.value = conversation;
  currentConversationID.value = conversation?.conversationID;
  if (prevConversationID !== currentConversationID.value) {
    if (prevConversationID) {
      DraftManager.setStore(
        prevConversationID,
        inputText.value,
        inputText.value,
        currentQuoteMessage.value,
      );
    }
    resetEditor();
    if (currentConversationID.value) {
      DraftManager.getStore(currentConversationID.value, setEditorContent);
    }
  }
}

function onQuoteMessageUpdated(options?: {
  message: IMessageModel;
  type: string;
}) {
  currentQuoteMessage.value = options;
}

function reset() {
  inputBlur.value = true;
  currentConversation.value = null;
  currentConversationID.value = '';
  currentQuoteMessage.value = null;
  resetEditor();
}

defineExpose({
  resetEditor,
  setEditorContent,
  getEditorContent,
});
</script>

<style lang="scss" scoped>
@import "../style/common";

.message-input-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3px 10px 10px;
  overflow: hidden;

  &-h5 {
    flex: 1;
    height: auto;
    background: #fff;
    border-radius: 10px 0 0 10px;
    padding: 7px 0 7px 10px;
    font-size: 16px !important;
    max-height: 86px;
  }

  .message-input-area {
    flex: 1;
    overflow-y: hidden;
    min-height: 25px;
  }

  .message-input-mute {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    text-align: center;
  }
}
</style>
