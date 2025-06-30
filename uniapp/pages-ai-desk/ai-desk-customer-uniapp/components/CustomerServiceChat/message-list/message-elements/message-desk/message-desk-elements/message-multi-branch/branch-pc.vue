<template>
  <div class="form-branch-container">
    <div
      v-if="props.payload.content.header"
      :class="['card-title-container',isPC ? 'card-title' : 'card-title-h5']"
    >
      {{ props.payload.content.header }}
    </div>
    <div
      v-if="props.payload.status == 0 && !isClicked"
      v-for="(item, index) in props.payload.content.items"
      :key="index"
      :class="['form-branch-item', item.content ? '' : 'warning-item']"
      @click="listItemClick(item)"
    >
      {{ item.content || TUITranslateService.t('AIDesk.分支选项异常') }}
    </div>
  </div>
</template>

<script lang="ts">
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';
import { customerServicePayloadType } from '../../../../../../../interface';
import { isPC } from '../../../../../../../utils/env';

interface branchItem {
  content: string;
  desc: string;
}

interface Props {
  payload: customerServicePayloadType;
}

export default {
  props: {
    payload: {
      type: Object as () => customerServicePayloadType,
      default: () => ({content: { header: '', items: [] },status:0}),
    },
  },
  emits: ['input-click'],
  setup(props: Props, { emit }) {
    let isClicked = false;
    const listItemClick = (branch: branchItem): void => {
      if (!branch.content) {
        return;
      }
      emit('input-click', branch);
      isClicked = true;
    };

    return {
      props,
      isClicked,
      listItemClick,
      isPC,
      TUITranslateService,
    };
  },
};
</script>
<style lang="scss">
.form-branch-container {
  .card-title-container {
    padding: 12px;
    border-radius: 0 10px 10px;
    width: fit-content;
    font-family: PingFangSC-Regular;
  }
  .card-title {
    background-color: #f3f4f7;
  }
  .card-title-h5 {
    background-color: #fff;
  }

  .form-branch-item {
    font-weight: 500;
    color: #1C66E5;
    background-color: #fff;
    border: 1px solid rgba(0, 110, 255, 0.3);
    padding: 12px;
    border-radius: 20px;
    margin-top: 8px;
    cursor: pointer;
    line-height: 16px;
    width: fit-content;
    font-family: PingFangSC-Regular;
    min-width: 50px;
    text-align: center;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: normal;
  }
  .warning-item {
    color: #ff9800;
  }
}
</style>
