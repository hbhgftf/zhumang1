<template>
  <div class="message-thinking">
    <div v-for="(icon, index) in icons" :key="index">
        <Icon v-if="icon" :file="loading_message" width="14px" height="14px"/>
    </div>
  </div>
</template>
<script lang="ts">
import vue from '../../../../adapter-vue';
import Icon from '../../../common/Icon.vue';
import loading_message from '../../../../assets/loading_message.svg';
const { ref, watchEffect, onMounted,onUnmounted } = vue;
export default {
  components:{
    Icon
  },
  setup() {
    const icons = ref([false, false, false]);
    const index = ref(0);

    let intervalId:any;

    onMounted(() => {
      intervalId = setInterval(() => {
        if (index.value < icons.value.length) {
          icons.value = icons.value.map((v, i) => (i === index.value ? true : v));
          index.value += 1;
        } else {
          icons.value = icons.value.map(() => false);
          index.value = 0;
        }
      }, 500);
    });

    onUnmounted(() => {
      intervalId && clearInterval(intervalId)
      intervalId = null;
    });

    return { icons,loading_message };
  }
}
</script>
<style lang="scss" scoped>
.message-thinking{
  display: flex;
  flex-direction: row;
  width: 45px;
  height: 16px;
}
</style>
