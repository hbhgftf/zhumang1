<template>
  <div :class="['message-text-container']">
    <span
      v-for="(item, index) in data.text"
      :key="index"
    >
      <span
        v-if="item.name === 'text'"
        class="text"
      >{{ item.text }}</span>
      <img
        v-else
        class="emoji"
        :src="item.src"
        :alt="item.emojiKey"
      >
    </span>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import {
  CUSTOM_BASIC_EMOJI_URL,
  CUSTOM_BASIC_EMOJI_URL_MAPPING,
} from '../../emoji-config';
const { watchEffect, ref } = vue;
interface IProps {
  content: Record<string, any>;
}
const props = withDefaults(defineProps<IProps>(), {
  content: () => ({}),
});
const data = ref();
watchEffect(() => {
  data.value = props.content;
  data.value.text?.forEach(
    (item: {
      name: string;
      text?: string;
      src?: string;
      type?: string;
      emojiKey?: string;
    }) => {
      if (item.name === 'img' && item?.type === 'custom') {
        if (!CUSTOM_BASIC_EMOJI_URL) {
          console.warn(
            'CUSTOM_BASIC_EMOJI_URL is required for custom emoji, please check your CUSTOM_BASIC_EMOJI_URL.',
          );
        } else if (
          !item.emojiKey
          || !CUSTOM_BASIC_EMOJI_URL_MAPPING[item.emojiKey]
        ) {
          console.warn(
            'emojiKey is required for custom emoji, please check your emojiKey.',
          );
        } else {
          item.src
            = CUSTOM_BASIC_EMOJI_URL
            + CUSTOM_BASIC_EMOJI_URL_MAPPING[item.emojiKey];
        }
      }
    },
  );
});
</script>
<style lang="scss" scoped>
.message-text-container {
  display: inline;
}

.text-select {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.emoji {
  vertical-align: bottom;
  width: 20px;
  height: 20px;
}

.text {
  white-space: pre-wrap;
  font-size: 14px;
  text-size-adjust: none;
  font-family: PingFangSC-Regular;
  overflow-wrap: break-word;
  word-break: break-all;
}

.text:lang(en) {
  white-space: pre-wrap;
  font-size: 14px;
  text-size-adjust: none;
  font-family: PingFangSC-Regular;
  overflow-wrap: break-word;
  word-break: normal;
}
</style>
