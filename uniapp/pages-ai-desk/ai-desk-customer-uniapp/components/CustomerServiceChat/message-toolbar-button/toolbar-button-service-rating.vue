<template>
  <div :class="['toolbar-button', isH5 ? 'toolbar-button-h5' : '']" @click="onClick">
    <Icon v-if="props.icon" class="toolbar-button-icon" :file="props.icon" width="14px" height="14px"/>
    <div class="toolbar-button-text">
      {{ props.title || TUITranslateService.t('AIDesk.服务评价') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import vue from '../../../adapter-vue';
const { ref, onMounted, onUnmounted } = vue;
import { isH5 } from '../../../utils/env';
import Icon from '../../common/Icon.vue';
import { TUITranslateService, TUIChatService, IConversationModel, StoreName, TUIStore } from '@tencentcloud/chat-uikit-engine';
import { CUSTOM_MESSAGE_SRC } from '../../../constant';
import { isEnabledMessageReadReceiptGlobal, getTo } from '../../../utils/utils';
const currentConversation = ref<IConversationModel>();
interface IProps {
  title?:string;
  icon?:string | undefined;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  icon: ''
})

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
  TUIChatService.sendCustomMessage({
    to: getTo(currentConversation?.value),
    conversationType: currentConversation?.value?.type,
    payload: {
      data:JSON.stringify({
        src: CUSTOM_MESSAGE_SRC.USER_SATISFACTION,
        customerServicePlugin: 0,
      }),
    },
    needReadReceipt: isEnabledMessageReadReceiptGlobal(),
  },{ onlineUserOnly: true });
}

</script>
<style lang="scss" scoped src="./style/index.scss"></style>
