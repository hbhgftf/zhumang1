<template>
  <div class="message-form">
    <BranchPc
      :payload ="payload"
      @input-click="handleContentListItemClick"
    />
  </div>
</template>
<script lang="ts">
import vue from '../../../../../../../adapter-vue';
import BranchPc from './branch-pc.vue';
import { customerServicePayloadType } from '../../../../../../../interface';
const { computed } = vue;

interface branchItem {
  content: string;
  desc: string;
}

interface Props {
  payload: customerServicePayloadType;
}

export default {
  components: {
    BranchPc
  },
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['sendMessage', 'heightChanged'],
  setup(props: Props, { emit }) {
    const payload = computed<customerServicePayloadType>(() => {
      return props.payload;
    });
    const handleContentListItemClick = (branch: branchItem) => {
      emit('sendMessage', { text: branch.content });
    };

    const handleFormSaveInputSubmit = (text: string) => {
      emit('sendMessage', { text });
    };
    return {
      payload,
      handleContentListItemClick,
      handleFormSaveInputSubmit,
    };
  },
  mounted() {
    this.$emit('heightChanged');
  }
};
</script>
<style lang="scss">

</style>
