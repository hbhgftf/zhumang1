<template>
  <div
    v-if="!isAllActionItemInvalid && !messageItem.hasRiskContent"
    ref="messageToolDom"
    :class="['dialog-item', 'dialog-item-h5']"
  >
    <div
      class="dialog-item-list"
      :class="'dialog-item-list-h5'"
    >
      <template v-for="(item, index) in actionItems">
        <div
          v-if="item.renderCondition()"
          :key="item.key"
          class="list-item"
          @click="getFunction(index)"
          @mousedown="beforeCopy(item.key)"
        >
          <Icon
            :file="item.iconUrl"
            :size="'15px'"
          />
          <span class="list-item-text">{{ item.text }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TUIChatEngine, {
  TUIStore,
  TUITranslateService,
  IMessageModel,
} from '@tencentcloud/chat-uikit-engine';
import { TUIGlobal } from '@tencentcloud/universal-api';
import vue from '../../../../adapter-vue';
import Icon from '../../../common/Icon.vue';
import { Toast, TOAST_TYPE } from '../../../common/Toast/index-uniapp';
import delIcon from '../../../../assets/msg-del.svg';
import copyIcon from '../../../../assets/msg-copy.svg';
import quoteIcon from '../../../../assets/msg-quote.svg';
import revokeIcon from '../../../../assets/msg-revoke.svg';
import imgIcon from '../../../../assets/image-uni.png';
import { CUSTOM_MESSAGE_SRC } from '../../../../constant';
import { enableSampleTaskStatus } from '../../../../utils/enableSampleTaskStatus';
import { transformTextWithKeysToEmojiNames } from '../../emoji-config';
import { isH5, isUniFrameWork } from '../../../../utils/env';
import {JSONToObject} from '../../../../utils/index';
const { ref, watchEffect, computed } = vue;

// uni-app conditional compilation will not run the following code
// #ifndef APP || APP-PLUS || MP || H5
import CopyManager from '../../../../utils/copy-web';
// #endif

interface IProps {
  messageItem: IMessageModel;
}

const props = withDefaults(defineProps<IProps>(), {
  messageItem: () => ({} as IMessageModel),
});

const TYPES = TUIChatEngine.TYPES;

const actionItems = ref([
  {
    key: 'copy',
    text: TUITranslateService.t('TUIChat.复制'),
    iconUrl: copyIcon,
    renderCondition() {
      if (!message.value) return false;
      return message.value.type === TYPES.MSG_TEXT;
    },
    clickEvent: copyMessage,
  },
  {
    key: 'revoke',
    text: TUITranslateService.t('TUIChat.撤回'),
    iconUrl: revokeIcon,
    renderCondition() {
      if (!message.value) return false;
      return message.value.flow === 'out' && message.value.status === 'success';
    },
    clickEvent: revokeMessage,
  },
  // {
  //   key: 'delete',
  //   text: TUITranslateService.t('TUIChat.删除'),
  //   iconUrl: delIcon,
  //   renderCondition() {
  //     if (!message.value) return false;
  //     return message.value.status === 'success';
  //   },
  //   clickEvent: deleteMessage,
  // },
  // {
  //   key: 'quote',
  //   text: TUITranslateService.t('TUIChat.引用'),
  //   iconUrl: quoteIcon,
  //   renderCondition() {
  //     if (!message.value) return false;
  //     const _message = TUIStore.getMessageModel(message.value.ID);
  //     return message.value.status === 'success' && !_message.getSignalingInfo();
  //   },
  //   clickEvent: quoteMessage,
  // },
  // {
  //   key:'image',
  //   text:'查看图片',
  //   iconUrl:imgIcon,
  //   renderCondition() {
  //     if (!message.value || !isUniFrameWork) return false;
  //     return message.value.type === TYPES.MSG_CUSTOM && JSONToObject(message.value.payload.data).src === CUSTOM_MESSAGE_SRC.RICH_TEXT;
  //   },
  //   clickEvent:showImageInRichText,
  // }
]);

const message = ref<IMessageModel>();
const messageToolDom = ref<HTMLElement>();

watchEffect(() => {
  message.value = TUIStore.getMessageModel(props.messageItem.ID);
});

const isAllActionItemInvalid = computed(() => {
  for (let i = 0; i < actionItems.value.length; ++i) {
    if (actionItems.value[i].renderCondition()) {
      return false;
    }
  }
  return true;
});

function getFunction(index: number) {
  // Compatible with Vue2 and WeChat Mini Program syntax, dynamic binding is not allowed.
  actionItems.value[index].clickEvent();
}

function openMessage() {
  let url = '';
  switch (message.value?.type) {
    case TUIChatEngine.TYPES.MSG_FILE:
      url = message.value.payload.fileUrl;
      break;
    case TUIChatEngine.TYPES.MSG_VIDEO:
      url = message.value.payload.remoteVideoUrl;
      break;
    case TUIChatEngine.TYPES.MSG_IMAGE:
      url = message.value.payload.imageInfoArray[0].url;
      break;
  }
  window?.open(url, '_blank');
}

function revokeMessage() {
  if (!message.value) return;
  const messageModel = TUIStore.getMessageModel(message.value.ID);
  messageModel
    .revokeMessage()
    .then(() => {
      enableSampleTaskStatus('revokeMessage');
    })
    .catch((error: any) => {
      if (error.code === 20016) {
        const message = TUITranslateService.t('TUIChat.已过撤回时限');
        Toast({
          message,
          type: TOAST_TYPE.ERROR,
        });
      }
    });
}

function deleteMessage() {
  if (!message.value) return;
  const messageModel = TUIStore.getMessageModel(message.value.ID);
  messageModel.deleteMessage();
}

async function copyMessage() {
  TUIGlobal?.setClipboardData({
    data: transformTextWithKeysToEmojiNames(message.value?.payload?.text),
  });
}

function beforeCopy(key: string) {
  // uni-app and h5 only support copy full message text
  if (key !== 'copy' || isH5) {
    return;
  }
}

function quoteMessage() {
  if (!message.value) return;
  message.value.quoteMessage();
}

// function showImageInRichText(){
//   const imgList:Array<string> = [];
//   const rendererMD = new marked.Renderer();
//   marked.setOptions({
//       renderer: rendererMD,
//       gfm: true,
//       breaks: true,
//       pedantic: false,
//       sanitize: false,
//       smartLists: true,
//       smartypants: false,
//     });
//   rendererMD.image = (href, title, text) => {
//         imgList.push(href);
//         return ''
//       }
//   const text = marked.parse(message.value.payload.data);
//   uni.previewImage({
//     current: '0',
//     urls: imgList,
//     // #ifdef APP-PLUS
//     indicator: 'number',
//     // #endif
//   });
// }

defineExpose({
  messageToolDom,
});
</script>

<style lang="scss" scoped>
@import "../../style/common";

.dialog-item-web {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 12px 0;

  .dialog-item-list {
    display: flex;
    align-items: baseline;
    white-space: nowrap;
    flex-wrap: wrap;
    max-width: 280px;

    .list-item {
      padding: 4px 12px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .list-item-text {
        padding-left: 4px;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
}

.dialog-item-h5 {
  @extend .dialog-item-web;

  padding: 0;

  .dialog-item-list {
    margin: 10px;
    white-space: nowrap;
    flex-wrap: wrap;
    max-width: 280px;

    .list-item {
      padding: 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #4f4f4f;

      .list-item-text {
        padding-left: 0;
      }
    }
  }
}
</style>
