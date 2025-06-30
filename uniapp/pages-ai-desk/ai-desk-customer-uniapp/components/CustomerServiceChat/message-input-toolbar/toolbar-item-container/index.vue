<template>
  <div
    ref="toolbarItemRef"
    :class="[
      'toolbar-item-container',
      'toolbar-item-container-h5',
      'toolbar-item-container-uni',
    ]"
  >
    <div
      v-if=" (isH5 && !isH5Emoji && isH5ToolShow) || isUniFrameWork"
      :class="[
        'toolbar-item-container-icon',
        'toolbar-item-container-uni-icon',
        isH5 && 'toolbar-item-container-h5-icon'
      ]"
      @click="toggleToolbarItem"
    >
      <Icon
        :file="props.iconFile"
        class="icon"
        :width="props.iconWidth"
        :height="props.iconHeight"
      />
    </div>
    <div
      v-if="isUniFrameWork || (isH5 && !isH5Emoji && isH5ToolShow)"
      :class="['toolbar-item-container-uni-title']"
    >
      {{ props.title }}
    </div>
    <div
      v-show="showDialog || isH5EmojiShow"
      ref="dialogRef"
      :class="[
        'toolbar-item-container-dialog',
         'toolbar-item-container-h5-dialog',
        'toolbar-item-container-uni-dialog',
      ]"
    >
      <BottomPopup
        v-if="props.needBottomPopup"
        class="toolbar-bottom-popup"
        :show="showDialog || isH5EmojiShow"
        @touchmove.stop.prevent
        @onClose="onPopupClose"
      >
        <slot />
      </BottomPopup>
      <slot v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import { outsideClick } from '@tencentcloud/universal-api';
import Icon from '../../../common/Icon.vue';
import BottomPopup from '../../../common/BottomPopup/index.vue';
import { isUniFrameWork,isH5 } from '../../../../utils/env';
const { ref } = vue;

const props = defineProps({
  iconFile: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  needDialog: {
    type: Boolean,
    default: true,
  },
  iconWidth: {
    type: String,
    default: '20px',
  },
  iconHeight: {
    type: String,
    default: '20px',
  },
  // Whether to display the bottom popup dialog on mobile devices
  // Invalid on PC
  needBottomPopup: {
    type: Boolean,
    default: false,
  },
  isH5EmojiShow:{
    type:Boolean,
    default:false
  },
  isH5Emoji:{
    type:Boolean,
    default:false,
  },
  isH5ToolShow : {
    type:Boolean,
    default:false,
  }
});

const emits = defineEmits(['onIconClick', 'onDialogClose', 'onDialogShow']);

const showDialog = ref(false);
const toolbarItemRef = ref();
const dialogRef = ref();
const toggleToolbarItem = () => {
  emits('onIconClick', dialogRef);
  if (!props.needDialog) {
    return;
  }
  toggleDialogDisplay(!showDialog.value);
};

const closeToolbarItem = () => {
  showDialog.value = false;
  emits('onDialogClose', dialogRef);
};

const toggleDialogDisplay = (showStatus: boolean) => {
  if (showDialog.value === showStatus) {
    return;
  }
  showDialog.value = showStatus;
  switch (showStatus) {
    case true:
      emits('onDialogShow', dialogRef);
      break;
    case false:
      emits('onDialogClose', dialogRef);
  }
};

const onPopupClose = () => {
  showDialog.value = false;
};

defineExpose({
  toggleDialogDisplay,
});
</script>
<style lang="scss" scoped src="./style/index.scss"></style>
