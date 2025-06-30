<template>
  <MessagePluginLayout
    :message="props.message"
    :showStyle="pluginMessageType.showStyle"
    :bubbleClassNameList="[
      pluginMessageType.pluginType === 'room' ? 'message-bubble-room' : '',
    ]"
    @resendMessage="resendMessage"
    @handleToggleMessageItem="handleToggleMessageItem"
    @handleH5LongPress="handleH5LongPress"
  >
    <template #messageBubble>
      <MessageCustomerService
        v-if="pluginMessageType.pluginType === 'customer'"
        :message="props.message"
        @showFormPopup="handleShowFormPopup"
        @heightChanged="onHeightChanged"
      />
    </template>
  </MessagePluginLayout>
</template>

<script lang="ts" setup>
import vue from '../../../../../adapter-vue';
import { IMessageModel, StoreName, TUIStore } from '@tencentcloud/chat-uikit-engine';
import { isCustomerServicePluginMessage, isCustomServiceMessageInvisible } from './message-desk-elements/index';
import MessagePluginLayout from './message-plugin-layout-uniapp.vue';
import MessageCustomerService from './message-desk-elements/message-desk.vue';
import { needHackForStreamText } from "../../../../../utils/utils";
const { computed } = vue;

interface IProps {
  message: IMessageModel;
  blinkMessageIDList?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  message: () => ({} as IMessageModel),
  blinkMessageIDList: () => [] as string[],
});

const emits = defineEmits([
  'resendMessage',
  'handleToggleMessageItem',
  'handleH5LongPress',
  'showFormPopup',
  'heightChanged',
]);
const messageModel = computed(() => TUIStore.getMessageModel(props.message.ID));

const pluginMessageType = computed<{ pluginType: string; showStyle: string }>(
  () => {
    // vue2->app 兼容逻辑
    if (needHackForStreamText(messageModel.value.payload.data)) {
      TUIStore.update(StoreName.CUSTOM, 'hackedMessageID', props.message.ID);
    }

    let typeObj = { pluginType: '', showStyle: '' };
    if (isCustomerServicePluginMessage(messageModel.value)) {
      typeObj = {
        pluginType: 'customer',
        showStyle: isCustomServiceMessageInvisible(messageModel.value as any)
          ? ''
          : 'bubble',
      };
    }
    return typeObj;
  },
);

// The following are for external interaction such as messageTool, no special processing is required, please do not touch
const resendMessage = (message: IMessageModel) => {
  emits('resendMessage', message);
};
const handleToggleMessageItem = (
  e: any,
  message: IMessageModel,
  isLongpress = false,
) => {
  emits('handleToggleMessageItem', e, message, isLongpress);
};
const handleH5LongPress = (e: any, message: IMessageModel, type: string) => {
  emits('handleH5LongPress', e, message, type);
};
const handleShowFormPopup = (data: boolean) => {
  emits('showFormPopup', data);
};
const onHeightChanged = () => {
  emits('heightChanged');
};
</script>

<style lang="scss" scoped>
/* stylelint-disable-next-line no-empty-source */
</style>
