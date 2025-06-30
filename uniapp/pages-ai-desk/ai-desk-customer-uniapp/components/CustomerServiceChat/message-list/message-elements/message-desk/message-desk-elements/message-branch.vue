<template>
  <div class="branch-card">
    <div
      v-if="content.header || content.title"
      :class="['branch-body',isPC ? 'branch-bubble':'branch-bubble-h5']"
    >
      <Icon :src="iconQuestion" class="branch-title-icon"/>
      {{ content.header || content.title }}
    </div>
    <div
      v-for="(item, index) in content.items"
      :key="index"
      :class="['branch-body',isPC ? 'branch-bubble' : 'branch-bubble-h5','branch-item',isSelected ? 'branch-item-selected' : '',item.content ? '' : 'warning-item']"
      :style="{ borderWidth: content.header ? '1px 0 0px 0' : '' }"
      @click="handleContentListItemClick(item)"
    >
      {{ item.content || TUITranslateService.t('AIDesk.分支选项异常') }}
    </div>
  </div>
</template>

<script lang="ts">
import vue from '../../../../../../adapter-vue';
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';
import { customerServicePayloadType } from '../../../../../../interface';
import iconRight from '../../../../../../assets/iconRight.svg';
import iconQuestion from '../../../../../../assets/icon_question.png';
import Icon from './customer-icon.vue';
import { isPC } from '../../../../../../utils/env';

const { computed, ref } = vue;

interface Props {
  payload: customerServicePayloadType;
}

interface branchItem {
  content: string;
  desc: string;
}

export default {
  components: {
    Icon,
  },
  props: {
    payload: {
      type: Object as () => customerServicePayloadType,
      default: () => ({}),
    },
  },
  emits: ['sendMessage', 'heightChanged'],
  setup(props: Props, { emit }) {
    const isSelected = ref<boolean>(false);
    const content = computed(() => {
      return (
        props?.payload?.content || {
          header: undefined,
          items: [],
        }
      );
    });

    const handleContentListItemClick = (branch: branchItem) => {
      if (!branch.content) {
        return;
      }
      if (!isSelected.value) {
        isSelected.value = true;
        emit('sendMessage', { text: branch.content });
      }
    };

    return {
      content,
      handleContentListItemClick,
      iconRight,
      iconQuestion,
      isSelected,
      isPC,
      TUITranslateService,
    };
  },
  mounted() {
    this.$emit('heightChanged');
  },
};
</script>

<style lang="scss">
.branch-body {
  display: flex;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 14px;
  font-size: 14px;
  color: #000;
  letter-spacing: 0;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;

  .branch-main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-content: flex-start;
    border: 0 solid black;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
}
.branch-bubble {
  background: #f3f4f7;
  border-radius: 0 10px 10px;
  margin-bottom: 8px;
}
.branch-bubble-h5 {
  background: #fff;
  border-radius: 0 10px 10px;
  margin-bottom: 8px;
}
.branch-item {
  color:#1c66e5;
  cursor: pointer;
}
.warning-item {
  color: #ff9800;
}
.branch-card {
  min-width: 250px;
  max-width: 350px;
  display:flex;
  flex-direction:column;
  align-items: flex-start;
}
.branch-item-selected {
  cursor:none;
  color: #a0a7b8;
  opacity:0.6;
}
.branch-title-icon {
  margin-right: 5px;
  align-items: flex-start !important;
  margin-top: 2px;
}
</style>
