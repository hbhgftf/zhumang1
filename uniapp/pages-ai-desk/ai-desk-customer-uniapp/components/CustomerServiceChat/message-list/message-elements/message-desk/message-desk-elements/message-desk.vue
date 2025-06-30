<template>
  <div class="message-custom">

    <div class="custom">
      <div
        v-if="
          payload.src === CUSTOM_MESSAGE_SRC.BRANCH ||
            payload.src === CUSTOM_MESSAGE_SRC.BRANCH_NUMBER ||
            (payload.src === CUSTOM_MESSAGE_SRC.ROBOT_MSG &&
              payload.subtype !== 'welcome_msg')
        "
      >
        <MessageBranch
          :payload="payload"
          @sendMessage="sendTextMessage"
          @heightChanged="onHeightChanged"
        />
      </div>
      <div
        v-if="
          payload.src === CUSTOM_MESSAGE_SRC.ROBOT_MSG
        "
      >
        <MessageIMRobotWelcome
          :payload="payload"
          @sendMessage="sendTextMessage"
        />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.FROM_INPUT">
        <MessageForm
          :payload="payload"
          @sendMessage="sendTextMessage"
        />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.PRODUCT_CARD">
        <MessageProductCard :payload="payload" />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.RICH_TEXT">
        <MessageRichText :payload="payload" />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.STREAM_TEXT">
        <MessageStream
          :payload="payload"
          :messageID="messageID"
          @heightChanged="onHeightChanged"
        />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.MULTI_BRANCH">
        <MessageMultiBranch
          :payload="payload"
          @sendMessage="sendTextMessage"
          @heightChanged="onHeightChanged"
        />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.MULTI_FORM && message.flow == 'in'">
        <MessageMultiForm :payload="payload"
          @sendMessage="sendCustomMessage"
          @showFormPopup="handleShowFormPopup"
          />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.MENU">
        <MessageRating
          :message="props.message"
          @sendMessage="sendCustomMessage"
        />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.CONCURRENCY_LIMIT">
        <MessageConcurrencyLimit />
      </div>
      <div v-if="payload.src === CUSTOM_MESSAGE_SRC.ORDER">
        <MessageOrder :payload="payload" />
      </div>
  </div>
  </div>
</template>
<script lang="ts">
import { CustomMessagePayload, TextMessagePayload, customerServicePayloadType } from '../../../../../../interface';
import MessageRating from './message-rating/index.vue';
import vue from '../../../../../../adapter-vue';
import { JSONToObject } from '../../../../../../utils/index';
import { CUSTOM_MESSAGE_SRC } from '../../../../../../constant';
import MessageBranch from './message-branch.vue';
import MessageForm from './message-single-form/index.vue';
import MessageIMRobotWelcome from './message-robot-welcome.vue';
import MessageProductCard from './message-product-card.vue';
import MessageRichText from './message-rich-text.vue';
import MessageStream from './message-stream.vue';
import MessageMultiBranch from './message-multi-branch/index.vue';
import MessageMultiForm from './message-multi-form/index.vue';
import {
  IMessageModel,
  TUIChatService,
} from '@tencentcloud/chat-uikit-engine';
import MessageConcurrencyLimit from "./message-concurrency-limit.vue";
import MessageOrder from './message-order.vue';

interface Props {
  message: IMessageModel;
}
const { computed } = vue;
export default {
  components: {
    MessageConcurrencyLimit,
    MessageBranch,
    MessageForm,
    MessageProductCard,
    MessageRichText,
    MessageIMRobotWelcome,
    MessageStream,
    MessageMultiBranch,
    MessageMultiForm,
    MessageRating,
    MessageOrder,
  },
  props: {
    message: {
      type: Object as () => IMessageModel,
      default: () => ({}),
    },
  },
  emits: ['showFormPopup', 'heightChanged'],
  setup(props: Props, { emit }) {
    const payload = computed<customerServicePayloadType>(() => {
      return props.message && JSONToObject(props.message?.payload?.data);
    });
    const messageID = computed<string>(() => {
      return props.message.ID;
    });
    const sendTextMessage = (payload: TextMessagePayload) => {
      TUIChatService.sendTextMessage({payload});
    };
    const sendCustomMessage = (payload: CustomMessagePayload) => {
      TUIChatService.sendCustomMessage({payload});
    };
    const handleShowFormPopup = (data: boolean) => {
      emit('showFormPopup', data);
    };
    const onHeightChanged = () => {
      emit('heightChanged');
    };

    return {
      payload,
      messageID,
      props,
      sendTextMessage,
      CUSTOM_MESSAGE_SRC,
      sendCustomMessage,
      handleShowFormPopup,
      onHeightChanged,
    };
  },
};
</script>
