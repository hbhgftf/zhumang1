<template>
  <div
    class="message-product-card"
  >
    <image
      v-if="isApp"
      class="product-img"
      :src="props.payload.content.pic"
    />
    <img
      v-else
      class="product-img"
      :src="props.payload.content.pic"
    >
    <div class="product-card-information">
      <div class="product-card-title">
        {{ props.payload.content.header }}
      </div>
      <div class="product-card-description-block">
        <div class="product-card-description">
          {{ props.payload.content.desc }}
        </div>
        <div class="product-card-link"  @click="jumpProductCard">
          {{TUITranslateService.t("AIDesk.跳转")}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { customerServicePayloadType } from '../../../../../../interface';
import { isApp } from '../../../../../../utils/env';
import {TUITranslateService} from '@tencentcloud/chat-uikit-engine';

// eslint-disable-next-line
declare var uni: any;

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
  emits: ['sendMessage'],
  setup(props: Props) {
    const jumpProductCard = () => {
      const { url } = props.payload.content;
      // 支持打开网页或 app 内页面间跳转
      // 小程序内打开网页有安全限制，请开发者参考 https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html 实现
      if (url.startsWith('https://') || url.startsWith('http://')) {
        // #ifdef APP-PLUS
        // @ts-ignore
        plus.runtime.openURL(url);
        // #endif
        // #ifdef H5
        // @ts-ignore
        window.open(url);
        // #endif
      } else {
        uni.navigateTo({
          url,
        });
      }
    };
    return {
      props,
      isApp,
      jumpProductCard,
      TUITranslateService
    };
  },
};
</script>
<style lang="scss" scoped>
.message-product-card {
  min-width: 200px;
  max-width: 400px;
  display: flex;

  .product-img {
    width: 75px;
    height: 75px;
    border-radius: 10px;
    flex-shrink: 0;
    object-fit: cover;
  }

  .product-card-information {
    width: 100%;
    margin-left: 15px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .product-card-title {
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

    .product-card-description-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
    }

    .product-card-description {
      font-size: 12px;
      max-width: 60px;
      color: #1c66e5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      flex: 0 1 60px;
    }

    .product-card-link {
      cursor: pointer;
      background-color: #1c66e5;
      color:#ffffff;
      padding:2px 12px;
      border-radius: 12px;
      flex: 0 0 auto;
      margin-left: auto;
    }
  }
}
</style>
