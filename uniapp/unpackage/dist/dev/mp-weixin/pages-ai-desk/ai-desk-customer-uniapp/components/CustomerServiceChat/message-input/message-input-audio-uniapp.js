"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const common_assets = require("../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../../common/Toast/index-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("../../common/Toast/type.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-input-audio-uniapp",
  props: {
    isEnableAudio: { type: Boolean, default: false }
  },
  emits: ["changeDisplayType"],
  setup(__props, { emit: __emit }) {
    var _a;
    const { ref, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    let recordTime = 0;
    let isManualCancelBySlide = false;
    let recordTimer;
    let firstTouchPageY = -1;
    let isFingerTouchingScreen = false;
    let isFirstAuthrizedRecord = false;
    const recorderManager = (_a = common_vendor.i) == null ? void 0 : _a.getRecorderManager();
    const isRecording = ref(false);
    const touchBarText = ref("按住说话");
    const modalText = ref("正在录音");
    const isAudioTouchBarShow = ref(false);
    const currentConversation = ref();
    const willCancelBySlide = ref(false);
    const recordConfig = {
      // Duration of the recording, in ms, with a maximum value of 600000 (10 minutes)
      duration: 6e4,
      // Sampling rate
      sampleRate: 44100,
      // Number of recording channels
      numberOfChannels: 1,
      // Encoding bit rate
      encodeBitRate: 192e3,
      // Audio format
      // Select this format to create audio messages that can be interoperable across all chat platforms (Android, iOS, WeChat Mini Programs, and Web).
      format: "mp3"
    };
    function switchAudio() {
      emits("changeDisplayType", props.isEnableAudio ? "editor" : "audio");
    }
    onMounted(() => {
      recorderManager.onStart(onRecorderStart);
      recorderManager.onStop(onRecorderStop);
      recorderManager.onError(onRecorderError);
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConverstaionUpdated
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConverstaionUpdated
      });
    });
    function onCurrentConverstaionUpdated(conversation) {
      currentConversation.value = conversation;
    }
    function initRecorder() {
      initRecorderData();
      initRecorderView();
    }
    function initRecorderView() {
      isRecording.value = false;
      touchBarText.value = "按住说话";
      modalText.value = "正在录音";
    }
    function initRecorderData(options) {
      clearInterval(recordTimer);
      recordTimer = void 0;
      recordTime = 0;
      firstTouchPageY = -1;
      isManualCancelBySlide = false;
      if (!(options == null ? void 0 : options.hasError)) {
        recorderManager.stop();
      }
    }
    function handleTouchStart() {
      if (isFingerTouchingScreen) {
        isFirstAuthrizedRecord = true;
      }
    }
    function handleLongPress() {
      isFingerTouchingScreen = true;
      recorderManager.start(recordConfig);
    }
    const handleTouchMove = common_vendor.lodashExports.throttle(function(e) {
      if (isRecording.value) {
        const pageY = e.changedTouches[e.changedTouches.length - 1].pageY;
        if (firstTouchPageY < 0) {
          firstTouchPageY = pageY;
        }
        const offset = firstTouchPageY - pageY;
        if (offset > 110) {
          touchBarText.value = "抬起取消";
          modalText.value = "松开手指 取消发送";
          isManualCancelBySlide = true;
          willCancelBySlide.value = true;
        } else if (offset > 50) {
          touchBarText.value = "抬起发送";
          modalText.value = "继续上滑可取消";
          isManualCancelBySlide = false;
          willCancelBySlide.value = false;
        } else {
          touchBarText.value = "抬起发送";
          modalText.value = "正在录音";
          isManualCancelBySlide = false;
          willCancelBySlide.value = false;
        }
      }
    }, 100);
    function handleTouchEnd() {
      isFingerTouchingScreen = false;
      recorderManager.stop();
    }
    function onRecorderStart() {
      if (!isFingerTouchingScreen) {
        isFirstAuthrizedRecord = true;
        recorderManager.stop();
        return;
      }
      recordTimer = setInterval(() => {
        recordTime += 1;
      }, 1e3);
      touchBarText.value = "抬起发送";
      isRecording.value = true;
    }
    function onRecorderStop(res) {
      var _a2, _b, _c, _d, _e, _f;
      if (isFirstAuthrizedRecord) {
        isFirstAuthrizedRecord = false;
        initRecorder();
        return;
      }
      if (isManualCancelBySlide || !isRecording.value) {
        initRecorder();
        return;
      }
      clearInterval(recordTimer);
      const tempFilePath = res.tempFilePath;
      const duration = res.duration ? res.duration : recordTime * 1e3;
      const fileSize = res.fileSize ? res.fileSize : 48 * recordTime / 8 * 1024;
      if (duration < 1e3) {
        pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
          message: "录音时间太短",
          type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.NORMAL,
          duration: 1500
        });
      } else {
        const options = {
          to: ((_b = (_a2 = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a2.groupProfile) == null ? void 0 : _b.groupID) || ((_d = (_c = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _c.userProfile) == null ? void 0 : _d.userID),
          conversationType: (_e = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _e.type,
          payload: { file: { duration, tempFilePath, fileSize } },
          needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
        };
        (_f = common_vendor.Qt) == null ? void 0 : _f.sendAudioMessage(options);
      }
      initRecorder();
    }
    function onRecorderError() {
      initRecorderData({ hasError: true });
      initRecorderView();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(switchAudio),
        b: common_vendor.p({
          file: props.isEnableAudio ? common_vendor.unref(common_assets.keyboardIcon) : common_vendor.unref(common_assets.audioIcon),
          size: "23px",
          hotAreaSize: "3px"
        }),
        c: props.isEnableAudio
      }, props.isEnableAudio ? common_vendor.e({
        d: common_vendor.t(common_vendor.unref(common_vendor.Wt).t(`TUIChat.${common_vendor.unref(touchBarText)}`)),
        e: common_vendor.unref(isRecording)
      }, common_vendor.unref(isRecording) ? {
        f: common_vendor.p({
          file: common_vendor.unref(willCancelBySlide) ? common_vendor.unref(common_assets.audioBubbleRed) : common_vendor.unref(common_assets.audioBubbleBlue),
          width: "160px",
          height: "74px"
        }),
        g: common_vendor.t(common_vendor.unref(common_vendor.Wt).t(`TUIChat.${common_vendor.unref(modalText)}`)),
        h: common_vendor.p({
          file: common_vendor.unref(willCancelBySlide) ? common_vendor.unref(common_assets.audioDeleteIcon) : common_vendor.unref(common_assets.audioBeforeDeleteIcon),
          width: "54px",
          height: "54px"
        }),
        i: common_vendor.p({
          width: "16px",
          height: "20px",
          file: common_vendor.unref(common_assets.audioRecordIcon)
        })
      } : {}, {
        j: common_vendor.o(handleTouchStart),
        k: common_vendor.o(handleLongPress),
        l: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(handleTouchMove) && common_vendor.unref(handleTouchMove)(...args)
        ),
        m: common_vendor.o(handleTouchEnd)
      }) : {}, {
        n: common_vendor.unref(isAudioTouchBarShow) ? 1 : ""
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb05c1e1"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input/message-input-audio-uniapp.js.map
