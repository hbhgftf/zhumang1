"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isVolunteer: false,
      isOnline: false
      // 新增：志愿者在线状态
    };
  },
  onLoad() {
    this.checkVolunteerStatus();
  },
  onShow() {
    this.checkVolunteerStatus();
  },
  methods: {
    // 检查志愿者状态并获取在线状态
    async checkVolunteerStatus() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo || typeof userInfo === "string") {
        this.isVolunteer = false;
        this.isOnline = false;
        return;
      }
      if (userInfo.role === "志愿者") {
        this.isVolunteer = true;
        try {
          const res = await common_vendor.index.request({
            url: `${this.$config.baseUrl}/api/volunteer/status/${userInfo.openid}`,
            method: "GET",
            header: { "Authorization": `Bearer ${userInfo.token}` }
          });
          if (res.data.code === 200) {
            this.isOnline = res.data.data;
          } else {
            common_vendor.index.__f__("error", "at pages/index/elective.vue:95", "获取志愿者在线状态失败:", res.data.msg);
            this.isOnline = false;
            common_vendor.index.showToast({
              title: res.data.msg || "获取状态失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/elective.vue:104", "请求获取志愿者在线状态失败:", error);
          this.isOnline = false;
          common_vendor.index.showToast({
            title: "请求获取状态失败",
            icon: "none"
          });
        }
      } else {
        this.isVolunteer = false;
        this.isOnline = false;
      }
    },
    // 切换志愿者在线状态
    async toggleOnlineStatus(event) {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo || userInfo.role !== "志愿者") {
        common_vendor.index.showToast({ title: "您不是志愿者", icon: "none" });
        this.$nextTick(() => {
          this.isOnline = !event.detail.value;
        });
        return;
      }
      const newStatus = event.detail.value;
      const openid = userInfo.openid;
      common_vendor.index.showLoading({ title: "更新状态中..." });
      const url = `${this.$config.baseUrl}/api/volunteer/status?openid=${openid}&isOnline=${newStatus}`;
      common_vendor.index.__f__("log", "at pages/index/elective.vue:136", "请求URL:", url);
      try {
        const res = await common_vendor.index.request({
          url,
          // 使用带有参数的URL
          method: "POST",
          // data: {}, // POST请求通常可以没有body，或者发送空对象
          header: {
            "Authorization": `Bearer ${userInfo.token}`
            // 对于URL参数，通常不需要指定 Content-Type
          }
        });
        if (res.data.code === 200) {
          this.isOnline = newStatus;
          common_vendor.index.showToast({ title: "状态更新成功", icon: "success" });
        } else {
          common_vendor.index.__f__("error", "at pages/index/elective.vue:153", "更新志愿者在线状态失败:", res.data.msg);
          this.$nextTick(() => {
            this.isOnline = !newStatus;
          });
          common_vendor.index.showToast({
            title: res.data.msg || "更新状态失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/elective.vue:162", "请求更新志愿者在线状态失败:", error);
        this.$nextTick(() => {
          this.isOnline = !newStatus;
        });
        common_vendor.index.showToast({
          title: "请求更新状态失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    goToRegister() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/mine/"
          });
        }, 1500);
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/index/volunteer-register"
      });
    },
    // 跳转到视频协助页面
    goToVideoAssist() {
      common_vendor.index.navigateTo({
        url: "/pages/spxz/spxz"
        // 假设 spxz.vue 页面路径为 /pages/spxz/spxz
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isVolunteer
  }, !$data.isVolunteer ? {
    b: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args))
  } : {
    c: $data.isOnline,
    d: common_vendor.o((...args) => $options.toggleOnlineStatus && $options.toggleOnlineStatus(...args)),
    e: common_vendor.t($data.isOnline ? "在线" : "离线"),
    f: common_vendor.o((...args) => $options.goToVideoAssist && $options.goToVideoAssist(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8424e307"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/elective.js.map
