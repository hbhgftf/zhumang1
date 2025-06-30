"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      voiceEnabled: true,
      features: [
        {
          title: "视频协助",
          desc: "志愿者实时视频帮助",
          icon: "/static/video-help.png",
          path: "/pages/index/spxz/spxz",
          color: "#FFB74D"
        },
        {
          title: "出行预约",
          desc: "地铁/机场无障碍服务",
          icon: "/static/travel.png",
          path: "/pages/travel/travel",
          color: "#81C784"
        },
        {
          title: "政策查询",
          desc: "最新补贴政策解读",
          icon: "/static/policy.png",
          path: "/pages/policy/policy",
          color: "#64B5F6"
        }
      ]
    };
  },
  computed: {
    voiceIcon() {
      return this.voiceEnabled ? "/static/voice-on.png" : "/static/voice-off.png";
    }
  },
  methods: {
    toggleVoiceGuide() {
      this.voiceEnabled = !this.voiceEnabled;
      common_vendor.index.vibrateShort();
    },
    makeEmergencyCall() {
      common_vendor.index.__f__("log", "at pages/index/course.vue:82", "紧急求助按钮被点击");
      common_vendor.index.makePhoneCall({ phoneNumber: "110" });
    },
    handleEmergency() {
      common_vendor.index.__f__("log", "at pages/index/course.vue:86", "紧急求助按钮被点击");
    },
    confirmEmergency() {
      common_vendor.index.__f__("log", "at pages/index/course.vue:89", "紧急求助按钮被双击");
    },
    speak(text) {
      if (this.voiceEnabled) {
        const innerAudioContext = common_vendor.index.createInnerAudioContext();
        innerAudioContext.src = `https://tts-api.example.com/speak?text=${encodeURIComponent(text)}`;
        innerAudioContext.play();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.t($data.voiceEnabled ? "语音开启" : "语音关闭"),
    c: common_vendor.o((...args) => $options.toggleVoiceGuide && $options.toggleVoiceGuide(...args)),
    d: common_vendor.f($data.features, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: item.path,
        f: item.color
      };
    }),
    e: common_assets._imports_1$1,
    f: common_vendor.o((...args) => $options.makeEmergencyCall && $options.makeEmergencyCall(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eea67d82"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/course.js.map
