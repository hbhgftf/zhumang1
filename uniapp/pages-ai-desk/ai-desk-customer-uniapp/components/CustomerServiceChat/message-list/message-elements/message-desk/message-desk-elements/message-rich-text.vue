<template>
  <div>
    <div>
      <mpHtml :content="parsedContent"/>
    </div>
  </div>
</template>

<script lang="ts">
import vue  from '../../../../../../adapter-vue';
import { parseMarkdown } from './marked';
import { customerServicePayloadType } from '../../../../../../interface';
import mpHtml from '../../../../../common/RichText/dist/uni-app/components/mp-html/mp-html.vue';
const { computed, ref } = vue;
interface Props {
  payload: customerServicePayloadType;
}
export default {
  components: {
    mpHtml
  },
  props: {
    payload: {
      type: Object as () => customerServicePayloadType,
      default: () => ({}),
    },
  },
  setup(props: Props) {
    const parsedContent = computed(() => {
      return parseMarkdown(props.payload.content);
    });

    return {
      props,
      parsedContent,
    };
  },
};
</script>
<style lang="scss">
</style>
