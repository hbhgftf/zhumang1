<template>
  <a
    class="message-location"
    :href="data.href"
    target="_blank"
    :title="TUITranslateService.t('AIDesk.跳转')"
  >
    <span class="el-icon-location-outline">{{ data.description }}</span>
    <img :src="data.url">
  </a>
</template>

<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';

const { watchEffect, ref } = vue;
const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
});
const data = ref();
watchEffect(() => {
  data.value = props.content;
});
</script>
<style lang="scss" scoped>
@import "../../style/common";

.message-location {
  display: flex;
  flex-direction: column;
}
</style>
