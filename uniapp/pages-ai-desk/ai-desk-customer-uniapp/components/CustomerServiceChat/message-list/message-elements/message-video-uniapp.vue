<template>
  <div>
    <div class="message-video">
      <div
          class="message-video-box"
          @click="playVideo"
      >
        <image
            :src="props.content.snapshotUrl"
            class="message-video-box"
            mode="widthFix"
        />
        <Icon
            v-if="
          props.messageItem.status === 'success' ||
            props.messageItem.progress === 1
        "
            class="video-play"
            :file="playIcon"
        />
      </div>
    </div>
    <view class="video-overlay" v-if="showVideo">
      <!-- 半透明背景 -->
      <view class="overlay-background" @click="closeVideo"></view>
      <video class="video-container" :src="videoData" controls></video>
    </view>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import type { IMessageModel } from '@tencentcloud/chat-uikit-engine';
import Icon from '../../../common/Icon.vue';
import playIcon from '../../../../assets/video-play.png';
import type { IVideoMessageContent } from '../../../../interface';
const { withDefaults, ref } = vue;

const props = withDefaults(
  defineProps<{
    content: IVideoMessageContent;
    messageItem: IMessageModel;
  }>(),
  {
    content: () => ({} as IVideoMessageContent),
    messageItem: () => ({} as IMessageModel),
  },
);

const videoData = ref();
const showVideo = ref(false);

function playVideo() {
  showVideo.value = true;
  videoData.value = props.content.url;
}

function closeVideo() {
  showVideo.value = false;
}
</script>
<style lang="scss" scoped>
.message-video {
  position: relative;

  &-box {
    width: 120px;
    max-width: 120px;
    background-color: rgba(#000, 0.3);
    border-radius: 6px;
    height:auto;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.message-video-box image {
  height: 100%; /* 设置高度为100% */
}

.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.overlay-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
}

.video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  object-fit: contain;
  width: 80%;
  height: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

video {
  object-fit: contain;
}

</style>
