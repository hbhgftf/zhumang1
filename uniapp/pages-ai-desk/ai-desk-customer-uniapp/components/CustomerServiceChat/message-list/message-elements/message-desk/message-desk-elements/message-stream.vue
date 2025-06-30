<template>
  <div>
    <div class="message-stream">
      <span v-if="isCursorBlinking" class="blinking-cursor">|</span>
      <pre ref="preRef" :class="['message-marked']" v-html="displayedContent" @click="onPreClicked"/>
    </div>
    <div v-if="image" class="markdown-image-previewer" @click="closeImage">
      <img
          class="markdown-image"
          :src="imageSrc"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../../../../adapter-vue';
import { customerServicePayloadType } from '../../../../../../interface';
import { parseMarkdown } from './marked';
import { TypeWriter } from './type-writer';
import { JSONToObject } from "../../../../../../utils";
import { isWeChat, isPC, isH5 } from "../../../../../../utils/env";
import { StoreName, TUIStore } from '@tencentcloud/chat-uikit-engine';
import { isVue3App } from "../../../../../../utils/utils";

const { ref, computed, withDefaults, defineProps, watch, onMounted, onUnmounted } = vue;

interface Props {
  payload: customerServicePayloadType;
  messageID: string;
}

const props = withDefaults(defineProps<Props>(), {
  payload: () => ({} as customerServicePayloadType),
  messageID: '',
});

const isCursorBlinking = ref<boolean>(true);
const isStreaming = ref<boolean>(false);
const image = ref(false);
const imageSrc = ref('');
const chunks = ref<string>('');
const isFinished = ref<boolean>(true);
const prevChunksLength = ref<number>(0);
const streamContent = ref<string>('');
const displayedContent = ref<string>('');
const preRef = ref();
const emits = defineEmits(['heightChanged']);
// uni-app 的 js 运行时版本太低，不支持 ResizeObserver 和 MutationObserver
const canIUseResizeObserver = typeof ResizeObserver === 'undefined' ? false : true;
const messageID = ref<string>('');

let observer;
let prevHeight = 0;
let count = 0;

const typeWriter = new TypeWriter({
  onTyping: (item: string) => {
    streamContent.value += item;
    displayedContent.value = parseMarkdown(streamContent.value);
  },
  onComplete() {
    isStreaming.value = false;
  },
});

function startStreaming(content: string[]) {
  if (!isStreaming.value) {
    isStreaming.value = true;
    typeWriter.add(content);
    typeWriter.start();
  } else {
    typeWriter.add(content);
  }
}

watch(() => props.payload, (newValue: string, oldValue: string) => {
      if (newValue === oldValue) {
        return;
      }

      const _payloadObject = JSONToObject(props.payload);
      chunks.value = Array.isArray(_payloadObject.chunks) ? _payloadObject.chunks.join('') : _payloadObject.chunks;
      isFinished.value = _payloadObject.isFinished === 1;

      // hide blinking cursor
      if (chunks.value.length > 0) {
        isCursorBlinking.value = false;
      }

      if (isWeChat || (newValue && !oldValue && isFinished.value)) {
        streamContent.value = chunks.value;
        prevChunksLength.value = chunks.value.length;
        displayedContent.value = parseMarkdown(streamContent.value);
      } else {
        // 判断长度是为了防御编辑的内容回退和内容重复的异常 case
        if (chunks.value.length > prevChunksLength.value) {
          const _newChunksToAdd = chunks.value?.slice(prevChunksLength.value);
          prevChunksLength.value = chunks.value.length;
          startStreaming([_newChunksToAdd]);
        }
      }
    }, {
      deep: true,
      immediate: true,
    },
);

const onHackedMessageID = (data: string) => {
  if (data !== messageID.value || isFinished.value) {
    return;
  }

  const message = TUIStore.getMessageModel(data);
  if (!message) {
    return;
  }
  if (message.payload.data) {
    const obj = JSONToObject(message.payload.data);
    const chunk2String = Array.isArray(obj.chunks) ? obj.chunks.join('') : obj.chunks;
    if (chunk2String !== streamContent.value) {
      streamContent.value = chunk2String;
      prevChunksLength.value = chunk2String.length;
      displayedContent.value = parseMarkdown(streamContent.value);
    }
    if (chunk2String.length > 0) {
      isCursorBlinking.value = false;
    }
    isFinished.value = obj.isFinished;
  }
}

onMounted(() => {
  messageID.value = props.messageID;
  TUIStore.watch(StoreName.CUSTOM, {
    'hackedMessageID': onHackedMessageID,
  });

  if (canIUseResizeObserver) {
    observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        observeHeightChanged(entry.contentRect.height);
      }
    });
    // 开始观察
    observer.observe(preRef.value);
  } else if (isVue3App) {
    // vue2->app，可能会出现未知的错误，下面代码仅 vue3->app 运行
    observer = setInterval(() => {
      const query = uni.createSelectorQuery().in(this);
      // 注意！用 ID 选择器经测试无效。。。得用 class 选择器
      query.selectAll(".message-stream")
          .boundingClientRect((res) => {
            if (res.length >= 1) {
              const data = res[res.length - 1];
              observeHeightChanged(data.height);
            }
          })
          .exec();
    }, 100);
  }
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CUSTOM, {
    'hackedMessageID': onHackedMessageID,
  });

  if (canIUseResizeObserver) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  } else {
    clearTimer();
  }
});

const observeHeightChanged = (newHeight) => {
  if (prevHeight !== newHeight) {
    prevHeight = newHeight;
    emits('heightChanged');
  } else if (!canIUseResizeObserver) {
    // 过了8秒高度没变化，就认为加载完了，清空定时器
    count += 1;
    if (count >= 80) {
      clearTimer();
    }
  }
};

const clearTimer = () => {
  clearInterval(observer);
  prevHeight = 0;
  count = 0;
};

const closeImage = () => {
  image.value = !image.value;
  imageSrc.value = '';
};

const onPreClicked = (event) => {
  // web 环境支持预览图文混排的图片；app 和小程序暂不支持
  if (isPC || isH5) {
    const target = event.target;
    const tagName = event.target.tagName.toLowerCase();
    if (tagName === 'img' || tagName === 'image') {
      image.value = true;
      imageSrc.value = target.src;
    }
  }
};

</script>
<style lang="scss" scoped>
.message-stream {
  overflow-wrap: break-word;
  word-break: keep-all;
  white-space: normal;
  font-size: 14px;
}

.blinking-cursor {
  animation: blink 0.8s step-end infinite;
  color: #000;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.message-marked {
  overflow: hidden;
  word-break: break-word;
  white-space: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;

  .message-marked_code-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 9px;
    margin: 0 0 10px;
    padding: 1em;
    overflow: hidden;
  }

  .message-marked_code-header {
    display: flex;
    justify-content: space-between;
  }

  .message-marked_code-content {
    overflow: auto;
  }

  body, div, ul, ol, dt, dd, li, dl, h1, h2, h3, h4, p {
    margin: 0 0 1em;
  }

  ul,ol,li {
    list-style: disc;
    list-style-type: disc;
  }

  ul,ol {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  li {
    padding: 0 0 5px;
    margin: 0;
  }

  img {
    overflow: hidden;
    object-fit: contain;
    max-width: 100%;
  }

  a {
    color: #0052d9;
    cursor: pointer;
  }
}

.markdown-image-previewer {
  position: fixed;
  z-index: 101;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.8);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.markdown-image {
  max-width: 90%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
