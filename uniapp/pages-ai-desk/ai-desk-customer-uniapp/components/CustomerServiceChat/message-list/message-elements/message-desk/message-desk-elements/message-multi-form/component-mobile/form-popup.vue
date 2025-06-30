<template>
  <BottomPopup
    class="form-item-bottom-popup"
    :show="props.show"
    :title="props.title"
    borderRadius="20px"
    @onClose="onClose"
    @onSubmit="onSubmit"
  >
    <slot></slot>
</BottomPopup>
</template>
<script setup lang="ts">
import vue from "../../../../../../../../adapter-vue";
const { withDefaults, defineProps, defineEmits } = vue;
import BottomPopup from "../../../../../../../common/BottomPopup";
const props = withDefaults(
  defineProps<{
    show: boolean;
    title: string;
  }>(),
  {
    show: false,
    title: "",
  }
);
const emits = defineEmits(["onClose", "onSubmit"]);
function onClose() {
  emits("onClose");
}
function onSubmit() {
  emits("onSubmit");
}
</script>
<style scoped lang="scss"></style>
