<template>

    <div class="emojiDialog">
        <ul ref="emojiPickerListRef" class="emojiDialogList">
            <li
                v-for="(childrenItem, childrenIndex) in currentEmojiList"
                :key="childrenIndex"
                class="emojiDialogList-item"
                @click="select(childrenItem, childrenIndex)"
            >
                <img
                    v-if="currentTabItem.type === EMOJI_TYPE.BASIC"
                    class="emoji"
                    :src="currentTabItem.url + BASIC_EMOJI_URL_MAPPING[childrenItem]"
                    >
            </li>
        </ul>
        <div class="sendButtonContainer">
            <div class="sendButton" @click="sendMessage">
              {{ TUITranslateService.t("发送") }}
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import { IEmojiGroupList, IEmojiGroup } from '../../../../interface';
const { ref, onMounted, onUnmounted } = vue;
import {
  TUIChatService,
  TUIStore,
  StoreName,
  IConversationModel,
  SendMessageParams,
  TUITranslateService,
} from '@tencentcloud/chat-uikit-engine';
import {
  EMOJI_GROUP_LIST,
  BASIC_EMOJI_URL_MAPPING,
  convertKeyToEmojiName,
} from '../../emoji-config';
import { EMOJI_TYPE } from '.././../../../constant';

const emits = defineEmits(['insertEmoji', 'onClose', 'sendMessage']);
const list = ref<IEmojiGroupList>(initEmojiList());
const currentConversation = ref();
const emojiPickerListRef = ref();
const currentTabIndex = ref<number>(0);
const currentEmojiList = ref<string[]>(list?.value[0]?.list);
    const currentTabItem = ref<IEmojiGroup>(list?.value[0]);

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

const select = (item: any, index: number) => {
  const options: any = {
    emoji: { key: item, name: convertKeyToEmojiName(item) },
    type: currentTabItem?.value?.type,
  };
  switch (currentTabItem?.value?.type) {
    case EMOJI_TYPE.BASIC:
      options.url = currentTabItem?.value?.url + BASIC_EMOJI_URL_MAPPING[item];
      emits('insertEmoji', options);
      break;
    case EMOJI_TYPE.BIG:
    //   sendFaceMessage(index, currentTabItem.value);
      break;
    case EMOJI_TYPE.CUSTOM:
    //   sendFaceMessage(index, currentTabItem.value);
      break;
    default:
      break;
  }
};

function sendMessage(){
    emits('sendMessage');
}

function onCurrentConversationUpdate(conversation: IConversationModel) {
  currentConversation.value = conversation;
}

function initEmojiList() {
  return EMOJI_GROUP_LIST;
}
</script>
<style lang="scss" scoped>
.emojiDialog {
    height: 25vh;
    position:relative;
    .emojiDialogList {
        width: 100%;
        display:flex;
        flex-wrap: wrap;
        overflow-y: auto;
        margin:2px;
        justify-content: space-between;
        .emojiDialogList-item {
            cursor: pointer;
            padding: 5px;
            .emoji {
                width: 30px;
        height: 30px;
            }
        }
    }
    .emojiDialogList::after{
        content: "";
        display: block;
        flex: 1 1 auto;
    }
}
.sendButtonContainer {
    display:flex;
    justify-content: flex-end;
    width: 100%;
    height: 45px;
    margin-top:5px;
    .sendButton {
        background-color: #1C66E5;
        color: white;
        border-radius: 5px;
        margin-right: 10px;
        align-self: center;
        padding: 5px 10px;
    }

}
</style>
