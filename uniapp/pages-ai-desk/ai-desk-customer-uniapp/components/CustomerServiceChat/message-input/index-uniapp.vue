<template>
  <div>
    <div class="message-quote-uni-container">
      <MessageQuote
        :style="{ minWidth: 0 }"
        :displayType="displayType"
      />
    </div>
    <div :class="['message-input',  'message-input-h5']">

    <div class="audio-main-content-line">
      <MessageInputAudio
        v-if="isWeChat && props.canSendAudio"
        :class="{
          'message-input-wx-audio-open': displayType === 'audio',
        }"
        :isEnableAudio="displayType === 'audio'"
        @changeDisplayType="changeDisplayType"
      />
      <MessageInputEditor
        v-show="displayType === 'editor'"
        ref="editor"
        class="message-input-editor"
        :placeholder="props.placeholder"
        :isMuted="props.isMuted"
        :muteText="props.muteText"
        :enableInput="props.enableInput"
        :enableTyping="props.enableTyping"
        @onTyping="onTyping"
        @onFocus="onFocus"
        @isInputNotEmpty="isInputNotEmpty"
      />
      <div class="icon-face-uniapp" >
        <Icon
          class="icon icon-face"
          :file="faceIcon"
          :size="'23px'"
          :hotAreaSize="'3px'"
          @onClick="changeToolbarDisplayType('emojiPicker')"
        />
      </div>
      <div v-if="!showSendButton" class="icon-tool-uniapp" >
        <Icon
        class="icon icon-more"
        :file="moreIcon"
        :size="'23px'"
        :hotAreaSize="'3px'"
        @onClick="changeToolbarDisplayType('tools')"
      />
      </div>
      <div v-if="showSendButton" class="send-button" @click="sendMessage">
        <Icon :file="sendButtonIcon" width="35px" height="35px"/>
      </div>
    </div>

  </div>
  </div>

</template>
<script setup lang="ts">
import {
  TUIStore,
  StoreName,
  IMessageModel,
  IConversationModel,
} from '@tencentcloud/chat-uikit-engine';
import vue from '../../../adapter-vue';
import MessageInputEditor from './message-input-editor-uniapp.vue';
import MessageInputAudio from './message-input-audio-uniapp.vue';
import MessageQuote from './message-input-quote/index.vue';
import Icon from '../../common/Icon.vue';
import faceIcon from '../../../assets/emoji.png';
import moreIcon from '../../../assets/more_tools.png';
import { isH5, isWeChat } from '../../../utils/env';
import { sendMessages,sendTyping } from '../utils/sendMessage';
import { transformTextWithEmojiNamesToKeys } from '../emoji-config';
import { ToolbarDisplayType, InputDisplayType } from '../../../interface';
import sendButtonIcon from '../../../assets/send-button.svg';

const { ref, watch, onMounted, onUnmounted } = vue;

interface IProps {
  placeholder: string;
  isMuted?: boolean;
  muteText?: string;
  enableInput?: boolean;
  enableTyping?: boolean;
  canSendAudio?: boolean;
  replyOrReference?: Record<string, any>;
  inputToolbarDisplayType: ToolbarDisplayType;
}
interface IEmits {
  (e: 'changeToolbarDisplayType', displayType: ToolbarDisplayType): void;
  (e: 'sendMessage'): void;
}

const emits = defineEmits<IEmits>();
const props = withDefaults(defineProps<IProps>(), {
  placeholder: '',
  replyOrReference: () => ({}),
  isMuted: true,
  muteText: '',
  enableInput: true,
  enableTyping: true,
  canSendAudio: false,
  inputToolbarDisplayType: 'none',
});

const editor = ref();
const currentConversation = ref<IConversationModel>();
const displayType = ref<InputDisplayType>('editor');
const showSendButton = ref(false);

onMounted(() => {
  TUIStore.watch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdated,
  });

  TUIStore.watch(StoreName.CHAT, {
    quoteMessage: onQuoteMessageUpdated,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdated,
  });

  TUIStore.unwatch(StoreName.CHAT, {
    quoteMessage: onQuoteMessageUpdated,
  });
});

watch(
  () => props.inputToolbarDisplayType,
  (newVal: ToolbarDisplayType) => {
    if (newVal !== 'none') {
      changeDisplayType('editor');
    }
  },
);

function changeDisplayType(display: InputDisplayType) {
  displayType.value = display;
  if (display === 'audio') {
    emits('changeToolbarDisplayType', 'none');
  }
}

function changeToolbarDisplayType(displayType: ToolbarDisplayType) {
  emits('changeToolbarDisplayType', displayType);
}

const onTyping = (inputContentEmpty: boolean, inputBlur: boolean) => {
  sendTyping(inputContentEmpty, inputBlur);
};

const onFocus = () => {
  if (isH5) {
    emits('changeToolbarDisplayType', 'none');
  }
};

const insertEmoji = (emoji: any) => {
  editor?.value?.addEmoji && editor?.value?.addEmoji(emoji);
  showSendButton.value = true;
};

const reEdit = (content: any) => {
  editor?.value?.resetEditor();
  showSendButton.value = false;
  editor?.value?.setEditorContent(content);
};

function onCurrentConversationUpdated(conversation: IConversationModel) {
  currentConversation.value = conversation;
}

function onQuoteMessageUpdated(options?: {
  message: IMessageModel;
  type: string;
}) {
  // switch text input mode when there is a quote message
  if (options?.message && options?.type === 'quote') {
    changeDisplayType('editor');
  }
}

const sendMessage = async () => {
  const _editorContentList = editor.value?.getEditorContent();
  if (!_editorContentList || !currentConversation.value) return;
  const editorContentList = _editorContentList.map((editor: any) => {
    if (editor.type === 'text') {
      editor.payload.text = transformTextWithEmojiNamesToKeys(
        editor.payload.text,
      );
    }
    return editor;
  });
  await sendMessages(editorContentList, currentConversation.value);
  editor.value?.resetEditor();
  showSendButton.value = false;
};

const isInputNotEmpty = (show: boolean) => {
  showSendButton.value = show;
}

defineExpose({
  insertEmoji,
  reEdit,
});
</script>

<style scoped lang="scss">
@import "../style/common";

.icon-face-uniapp{
  background-color: #fff;
  padding:5px;
  border-radius: 0 10px 10px 0;
}
.icon-tool-uniapp{
  background-color: #fff;
  padding: 3px;
  margin-left: 10px;
  border-radius: 10px;
}

:not(not) {
  display: flex;
  flex-direction: column;
  min-width: 0;
  box-sizing: border-box;
}

.message-quote-uni-container{
  margin-left:5px;
}

.message-input {
  position: relative;
  display: flex;
  flex-direction: column;
  border: none;
  overflow: hidden;
  background: #ebf0f6;

  &-h5 {
    background-color: transparent;
    padding: 10px;
  }

  &-editor {
    flex: 1;
    display: flex;
  }

  .icon {
  }

  &-wx-audio-open {
    flex: 1;
  }
}

.audio-main-content-line {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.send-button {
  margin-left: 10px;
  animation: scaleOnShow 0.4s;
}

@keyframes scaleOnShow {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
