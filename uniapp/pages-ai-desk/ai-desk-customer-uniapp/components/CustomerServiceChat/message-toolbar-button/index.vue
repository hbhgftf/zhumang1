<template>
  <div class="toolbar-button-container">
    <template v-for="(item, index) in props.toolbarButtonList">
      <ToolbarButtonHumanService v-if="item.presetId === TOOLBAR_BUTTON_TYPE.HUMAN_SERVICE && shouldRender(item) && !isInHumanService" :title="item.title" :icon="item.icon"/>
      <ToolbarButtonServiceRating v-else-if="item.presetId === TOOLBAR_BUTTON_TYPE.SERVICE_RATING && shouldRender(item) && isInHumanService" :title="item.title" :icon="item.icon"/>
      <ToolbarButtonEndHumanService v-else-if="item.presetId === TOOLBAR_BUTTON_TYPE.END_HUMAN_SERVICE && shouldRender(item) && isInHumanService" :title="item.title" :icon="item.icon"/>
      <div v-else-if="shouldRender(item) && !item.presetId" :key="index"
           :class="['toolbar-button', isH5 ? 'toolbar-button-h5' : '']" @click="onClick(item, index)">
        <Icon v-if="item.icon" class="toolbar-button-icon" :file="item.icon" width="18px" height="18px"/>
        <div class="toolbar-button-text">
          {{ item.title }}
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {
  TUIChatService,
  TUIStore,
  StoreName,
  IConversationModel
} from '@tencentcloud/chat-uikit-engine';
import { isH5 } from '../../../utils/env';
import { ToolbarButtonModel } from '../../../interface';
import Icon from '../../common/Icon.vue';
import { TOOLBAR_BUTTON_TYPE } from '../../../constant';
import { isEnabledMessageReadReceiptGlobal, openSafeUrl, getTo } from '../../../utils/utils';
import ToolbarButtonHumanService from './toolbar-button-human-service.vue';
import ToolbarButtonServiceRating from './toolbar-button-service-rating.vue';
import ToolbarButtonEndHumanService from './toolbar-button-end-human-service.vue';

import vue from '../../../adapter-vue';
const { ref, onMounted, onUnmounted } = vue;

interface IProps {
  toolbarButtonList?: ToolbarButtonModel[]
}

const props = withDefaults(defineProps<IProps>(), {
  toolbarButtonList: () => [] as ToolbarButtonModel[]
});

const isInHumanService = ref(false);
const currentConversation = ref<IConversationModel>();

onMounted(() => {
  TUIStore.watch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdate,
  });
  TUIStore.watch(StoreName.CUSTOM, {
    isInHumanService: onInHumanServiceUpdate,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CONV, {
    currentConversation: onCurrentConversationUpdate,
  });
  TUIStore.unwatch(StoreName.CUSTOM, {
    isInHumanService: onInHumanServiceUpdate,
  });
});

const onCurrentConversationUpdate = (conversation: IConversationModel) => {
  currentConversation.value = conversation;
}

const onInHumanServiceUpdate = (value: boolean) => {
  isInHumanService.value = value;
};

function onClick(item: ToolbarButtonModel, index: number) {
  if (item.type === 1 && item.content) {
    TUIChatService.sendTextMessage({
      to: getTo(currentConversation?.value),
      conversationType: currentConversation?.value?.type,
      payload: {
        text: item.content
      },
      needReadReceipt: isEnabledMessageReadReceiptGlobal(),
    });
  } else if (item.type === 2  && item.content) {
    openSafeUrl(item.content);
  } else if (props.toolbarButtonList !== undefined && typeof props.toolbarButtonList[index].clickEvent === 'function') {
    props.toolbarButtonList[index].clickEvent();
  }
}

function shouldRender(item: ToolbarButtonModel) {
  if (item.isEnabled === 1) {
    return true;
  } else if (item.isEnabled === 0) {
    return false;
  } else if (item.renderCondition) {
    return typeof item.renderCondition === 'function' ? item.renderCondition() : false;
  }
  return false;
}

</script>
<style lang="scss" scoped src="./style/index.scss"></style>
