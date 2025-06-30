<template>
  <div :class="['toolbar-button', isH5 ? 'toolbar-button-h5' : '']" @click="onClick">
    <Icon v-if="props.icon" class="toolbar-button-icon" :file="props.icon" width="14px" height="14px"/>
    <div class="toolbar-button-text">
      {{ props.title || TUITranslateService.t('AIDesk.转人工服务') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { isH5 } from '../../../utils/env';
import Icon from '../../common/Icon.vue';
import { TUITranslateService, TUIChatService, IConversationModel, StoreName, TUIStore } from '@tencentcloud/chat-uikit-engine';
import { isEnabledMessageReadReceiptGlobal, getTo } from '../../../utils/utils';
import vue from '../../../adapter-vue';

const { ref, onMounted, onUnmounted } = vue;
const currentConversation = ref<IConversationModel>();
interface IProps {
  title?:string;
  icon?:string | undefined;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  icon: ''
});

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

const onCurrentConversationUpdate = (conversation: IConversationModel) => {
  currentConversation.value = conversation;
};

const onClick = () => {
  TUIChatService.sendTextMessage({
    to: getTo(currentConversation?.value),
    conversationType: currentConversation?.value?.type,
    payload: {
      text: TUITranslateService.t('AIDesk.转人工服务')
    },
    needReadReceipt: isEnabledMessageReadReceiptGlobal(),
  });
}

</script>
<style lang="scss" scoped src="./style/index.scss"></style>
