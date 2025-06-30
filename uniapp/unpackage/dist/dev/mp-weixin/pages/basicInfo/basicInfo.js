"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isVolunteer: false,
      // 新增：是否为志愿者
      userInfo: {
        id: "",
        nickname: "",
        name: "",
        phone: "",
        usualAddress: "",
        voiceSettings: "",
        serviceHours: "",
        serviceRating: "",
        organization: "",
        certificationTime: "",
        username: ""
      }
    };
  },
  onLoad() {
    this.checkVolunteerStatus();
    this.loadUserInfo();
  },
  onShow() {
    this.checkVolunteerStatus();
  },
  methods: {
    // 新增：检查志愿者状态
    checkVolunteerStatus() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.role === "志愿者") {
        this.isVolunteer = true;
      } else {
        this.isVolunteer = false;
      }
    },
    // 加载用户信息
    async loadUserInfo() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        common_vendor.index.__f__("log", "at pages/basicInfo/basicInfo.vue:112", "存储的用户信息:", userInfo);
        if (!userInfo) {
          throw new Error("未找到用户信息，请先登录");
        }
        if (!userInfo.id) {
          common_vendor.index.__f__("error", "at pages/basicInfo/basicInfo.vue:119", "用户信息中缺少ID:", userInfo);
          throw new Error("用户信息不完整，请重新登录");
        }
        const token = common_vendor.index.getStorageSync("token");
        common_vendor.index.__f__("log", "at pages/basicInfo/basicInfo.vue:124", "存储的token:", token);
        if (!token) {
          throw new Error("未找到登录凭证，请重新登录");
        }
        const res = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/getUserInfo?id=${userInfo.id}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`
          }
        });
        common_vendor.index.__f__("log", "at pages/basicInfo/basicInfo.vue:138", "获取用户信息响应:", res);
        if (res.data.code === 200) {
          this.userInfo = { ...this.userInfo, ...res.data.data.userInfo };
          common_vendor.index.__f__("log", "at pages/basicInfo/basicInfo.vue:143", "更新后的用户信息:", this.userInfo);
        } else {
          throw new Error(res.data.message || "获取用户信息失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/basicInfo/basicInfo.vue:148", "加载用户信息失败:", error);
        if (error.message.includes("未找到用户信息") || error.message.includes("未找到登录凭证")) {
          common_vendor.index.showModal({
            title: "提示",
            content: "请先登录",
            showCancel: false,
            success: () => {
              common_vendor.index.switchTab({
                url: "/pages/index/mine"
              });
            }
          });
        } else {
          common_vendor.index.showToast({
            title: error.message || "加载失败，请重试",
            icon: "none"
          });
        }
      }
    },
    // 保存修改
    async handleSave() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (!userInfo || !userInfo.id) {
          throw new Error("用户未登录");
        }
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          throw new Error("未找到登录凭证");
        }
        this.userInfo.id = userInfo.id;
        const res = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/updateUserInfo`,
          method: "POST",
          data: this.userInfo,
          header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.data.code === 200) {
          common_vendor.index.showToast({
            title: "保存成功",
            icon: "success"
          });
          common_vendor.index.setStorageSync("userInfo", {
            ...userInfo,
            ...this.userInfo
          });
        } else {
          throw new Error(res.data.message || "保存失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/basicInfo/basicInfo.vue:210", "保存失败:", error);
        common_vendor.index.showToast({
          title: error.message || "保存失败，请重试",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.nickname,
    b: common_vendor.o(($event) => $data.userInfo.nickname = $event.detail.value),
    c: $data.userInfo.username,
    d: common_vendor.o(($event) => $data.userInfo.username = $event.detail.value),
    e: $data.userInfo.phone,
    f: common_vendor.o(($event) => $data.userInfo.phone = $event.detail.value),
    g: $data.userInfo.usualAddress,
    h: common_vendor.o(($event) => $data.userInfo.usualAddress = $event.detail.value),
    i: $data.isVolunteer
  }, $data.isVolunteer ? {
    j: $data.userInfo.voiceSettings,
    k: common_vendor.o(($event) => $data.userInfo.voiceSettings = $event.detail.value),
    l: $data.userInfo.serviceHours,
    m: common_vendor.o(($event) => $data.userInfo.serviceHours = $event.detail.value),
    n: $data.userInfo.serviceRating,
    o: common_vendor.o(($event) => $data.userInfo.serviceRating = $event.detail.value),
    p: $data.userInfo.organization,
    q: common_vendor.o(($event) => $data.userInfo.organization = $event.detail.value),
    r: $data.userInfo.certificationTime,
    s: common_vendor.o(($event) => $data.userInfo.certificationTime = $event.detail.value)
  } : {}, {
    t: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/basicInfo/basicInfo.js.map
