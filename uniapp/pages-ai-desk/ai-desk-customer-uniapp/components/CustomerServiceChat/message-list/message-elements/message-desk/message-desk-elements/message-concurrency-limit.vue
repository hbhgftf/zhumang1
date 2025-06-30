<template>
  <div :class="['message-text-container']">
      <span class="text">{{ TUITranslateService.t('AIDesk.并发限制') }}</span>
  </div>
</template>

<script lang="ts" setup>
import {TUITranslateService} from "@tencentcloud/chat-uikit-engine";

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
