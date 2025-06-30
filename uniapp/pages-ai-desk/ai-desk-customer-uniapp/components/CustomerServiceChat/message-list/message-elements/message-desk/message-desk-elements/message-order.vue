<template>
  <div
      class="message-order"
  >
    <div class="order-guide">
      {{ props.payload.content.guide }}
    </div>
    <div class="order-main">
      <img
          v-if="props.payload.content.pic"
          class="order-img"
          :src="props.payload.content.pic"
      >
      <div class="order-information">
        <div class="order-name">
          {{ props.payload.content.name }}
        </div>
        <div class="order-description">
          {{ props.payload.content.desc }}
        </div>
      </div>
    </div>
    <div class="order-custom" v-for="item in props.payload.content.customField">
      <div class="order-field">
        <span class="field-name"> {{ item.name }} </span>
        <span class="field-value"> {{ item.value }} </span>
        <span class="field-customer-value"> {{ item.customerValue }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { customerServicePayloadType } from '../../../../../../interface';

interface Props {
  payload: customerServicePayloadType;
}

export default {
  props: {
    payload: {
      type: Object as () => customerServicePayloadType,
      default: () => ({}),
    },
  },
  setup(props: Props) {
    return {
      props,
    };
  },
};
</script>
<style lang="scss" scoped>
.message-order {
  min-width: 200px;
  max-width: 400px;
  color: #000;
  font-family: PingFangSC-Regular;

  .order-guide {
    font-size: 14px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .order-main {
    display:flex;

    .order-img {
      width: 65px;
      height: 65px;
      border-radius: 10px;
      flex-shrink: 0;
      object-fit: cover;
      margin-right: 15px;
    }

    .order-information {
      width:100%;
      margin-right:5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .order-name {
        max-width: 200px;
        min-width: 100px;
        color: #000000;
        font-size: 14px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }

      .order-description {
        font-size: 14px;
        max-width: 200px;
        min-width: 100px;
        color: rgba(0, 0, 0, 0.55);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
      }
    }
  }

  .order-field {
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;
    display: flex;
    gap: 8px;

    .field-name {
      color: rgba(0, 0, 0, 0.55);
      flex: 0 0 auto;
      width: 70px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .field-value {
      color: #333;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
      padding-left: 4px;
    }
  }
}
</style>
