"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../../../common/Toast/index-uniapp.js");
const common_assets = require("../../../../../../common/assets.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-audio-uniapp",
  props: {
    broadcastNewAudioSrc: {},
    messageItem: { default: () => ({}) },
    content: { default: () => ({}) }
  },
  emits: ["getGlobalAudioContext", "setAudioPlayed"],
  setup(__props, { emit: __emit }) {
    const { onUnmounted, ref, watch } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const audioMap = /* @__PURE__ */ new Map();
    const isAudioPlaying = ref(false);
    onUnmounted(() => {
      var _a;
      const audioContext = getAudio();
      if (isAudioPlaying.value) {
        stopAudio();
      }
      (_a = audioContext == null ? void 0 : audioContext.destroy) == null ? void 0 : _a.call(audioContext);
      audioMap.delete("audio");
    });
    watch(
      () => props.broadcastNewAudioSrc,
      (newSrc) => {
        if (newSrc !== props.content.url && isAudioPlaying.value) {
          stopAudio();
          isAudioPlaying.value = false;
        }
      }
    );
    function toggleClick() {
      emits("getGlobalAudioContext", audioMap, { newAudioSrc: props.content.url });
      if (props.messageItem.hasRiskContent || !props.content.url) {
        pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
          message: "暂不支持播放"
        });
        return;
      }
      const audioContext = getAudio();
      if (!audioContext) {
        audioMap.set("audio", common_vendor.index.createInnerAudioContext());
        common_vendor.index.setInnerAudioOption({
          obeyMuteSwitch: false
        });
        initAudioSrc();
      }
      toggleAudioPlayState();
    }
    function toggleAudioPlayState() {
      if (!isAudioPlaying.value) {
        playAudio();
      } else {
        stopAudio();
      }
    }
    function initAudioSrc() {
      const audioContext = getAudio();
      if (!audioContext) {
        return;
      }
      audioContext.src = props.content.url;
      isAudioPlaying.value = false;
      audioContext.onPlay(onAudioPlay);
      audioContext.onStop(onAudioStop);
      audioContext.onEnded(onAudioEnded);
      audioContext.onError(onAudioError);
    }
    function playAudio() {
      const audioContext = getAudio();
      if (!audioContext) {
        return;
      }
      audioContext.play();
      if (props.messageItem.flow === "in") {
        emits("setAudioPlayed", props.messageItem.ID);
      }
    }
    function stopAudio() {
      const audioContext = getAudio();
      if (!audioContext) {
        return;
      }
      try {
        audioContext.stop();
      } catch {
      }
    }
    function onAudioPlay() {
      isAudioPlaying.value = true;
    }
    function onAudioStop() {
      isAudioPlaying.value = false;
    }
    function onAudioEnded() {
      isAudioPlaying.value = false;
    }
    function onAudioError() {
      common_vendor.index.__f__("warn", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-audio-uniapp.vue:160", "audio played error");
    }
    function getAudio() {
      return audioMap.get("audio");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(isAudioPlaying) ? 1 : "",
        b: common_vendor.p({
          width: "15px",
          height: "20px",
          file: common_vendor.unref(common_assets.audioRecordIcon)
        }),
        c: common_vendor.t(props.content.second || 1),
        d: `${props.content.second * 5}px`,
        e: props.messageItem.flow === "out" ? 1 : "",
        f: common_vendor.o(toggleClick)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a15eca10"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-audio-uniapp.js.map
