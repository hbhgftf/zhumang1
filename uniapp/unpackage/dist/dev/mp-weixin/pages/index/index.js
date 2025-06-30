"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      faqs: [
        {
          question: "如何申请志愿者帮助？",
          answer: "在首页点击'视频协助'按钮，系统将自动匹配在线志愿者...",
          expanded: false
        },
        {
          question: "地铁预约需要提前多久？",
          answer: "建议至少提前2小时预约，紧急情况可致电客服...",
          expanded: false
        }
      ]
    };
  },
  methods: {
    toggleAnswer(index) {
      this.faqs[index].expanded = !this.faqs[index].expanded;
      common_vendor.index.vibrateShort();
    },
    playIntroduction() {
    },
    repeatLastMessage() {
    },
    makeCall() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:102", "拨打求助热线按钮被点击");
      common_vendor.index.makePhoneCall({ phoneNumber: "110" });
    },
    openChat() {
      common_vendor.index.navigateTo({ url: "/pages-ai-desk/index/index" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.playIntroduction && $options.playIntroduction(...args)),
    c: common_assets._imports_1,
    d: common_vendor.o((...args) => $options.repeatLastMessage && $options.repeatLastMessage(...args)),
    e: common_vendor.f($data.faqs, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.question),
        b: item.expanded ? 1 : "",
        c: item.expanded
      }, item.expanded ? {
        d: common_vendor.t(item.answer)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.toggleAnswer(index), index)
      });
    }),
    f: common_assets._imports_2,
    g: common_vendor.o((...args) => $options.makeCall && $options.makeCall(...args)),
    h: common_assets._imports_3,
    i: common_vendor.o((...args) => $options.openChat && $options.openChat(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
