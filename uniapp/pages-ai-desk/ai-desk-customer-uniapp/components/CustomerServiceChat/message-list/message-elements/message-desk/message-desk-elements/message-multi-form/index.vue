<template>
    <div>
        <FormMobile :payload="payloads" @sendMessage="handleSendForm" @showFormPopup="handleShowFormPopup"/>
    </div>
</template>

<script lang="ts">
import vue from '../../../../../../../adapter-vue';
import FormMobile from './form-mobile.vue';
import { customerServicePayloadType } from '../../../../../../../interface';

const { computed} = vue;

interface branchItem {
  content: string;
  desc: string;
}

interface Props {
  payload: customerServicePayloadType;
}

export default {
  components: {
    FormMobile
  },
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['sendMessage','showFormPopup'],
  setup(props: Props, { emit }) {
  const payloads = computed<customerServicePayloadType>(() => {
    return props.payload;
  });
    const handleSendForm = (data: any) => {
      emit('sendMessage', data);
    };
    const handleShowFormPopup = (data: boolean) => {
      emit('showFormPopup', data);
    }

    return {
      payloads,
      handleSendForm,
      handleShowFormPopup
    };
  },
};
</script>
<style lang="scss">

</style>
