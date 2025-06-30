"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      login: {
        show: false,
        // 是否已登录
        avatar: "/static/default_avatar.png",
        // 默认头像
        nickname: ""
        // 存储昵称
      },
      userId: "",
      // 用户ID
      tempLocalPath: "",
      // 本地临时文件路径（下载后的头像路径）
      loading: false,
      // 加载状态
      email: "",
      // 邮箱
      code: "",
      // 验证码
      isSendingCode: false,
      // 是否正在发送验证码
      countdown: 60
      // 验证码倒计时
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.id) {
      this.login.show = true;
      this.userId = userInfo.id;
      this.login.avatar = userInfo.avatarUrl || this.login.avatar;
      this.login.nickname = userInfo.nickname || "";
    }
  },
  methods: {
    // 发送验证码
    async handleSendCode() {
      if (!this.email) {
        common_vendor.index.showToast({ title: "请输入邮箱", icon: "none" });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        common_vendor.index.showToast({ title: "请输入正确的邮箱格式", icon: "none" });
        return;
      }
      if (this.isSendingCode)
        return;
      this.isSendingCode = true;
      this.countdown = 60;
      try {
        const response = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/sendEmail/${this.email}`,
          method: "GET"
        });
        if (response.data === "验证码发送成功！") {
          common_vendor.index.showToast({ title: "验证码已发送", icon: "none" });
          this.startCountdown();
        } else {
          common_vendor.index.showToast({ title: response.data, icon: "none" });
          this.isSendingCode = false;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/mine.vue:196", "发送验证码失败:", error);
        common_vendor.index.showToast({ title: "发送验证码失败", icon: "none" });
        this.isSendingCode = false;
      }
    },
    // 开始倒计时
    startCountdown() {
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
          this.isSendingCode = false;
        }
      }, 1e3);
    },
    // 邮箱验证码登录
    async handleEmailLogin() {
      if (!this.email || !this.code) {
        common_vendor.index.showToast({ title: "请输入邮箱和验证码", icon: "none" });
        return;
      }
      if (this.loading)
        return;
      this.loading = true;
      common_vendor.index.showLoading({ title: "登录中..." });
      try {
        const loginResponse = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/login/email`,
          method: "POST",
          data: {
            email: this.email,
            code: this.code
          },
          header: {
            "Content-Type": "application/json"
          }
        });
        common_vendor.index.__f__("log", "at pages/index/mine.vue:239", "邮箱登录响应:", loginResponse);
        if (loginResponse.data.code === 200 && loginResponse.data.success) {
          const token = loginResponse.data.data.userInfo.token;
          const userInfoFromResponse = loginResponse.data.data.userInfo;
          const userInfoToSave = {
            ...userInfoFromResponse,
            id: userInfoFromResponse.id
            // 显式提取id
          };
          common_vendor.index.setStorageSync("token", token);
          common_vendor.index.setStorageSync("userInfo", userInfoToSave);
          common_vendor.index.__f__("log", "at pages/index/mine.vue:255", "保存的用户信息:", userInfoToSave);
          common_vendor.index.__f__("log", "at pages/index/mine.vue:256", "保存的token:", token);
          this.login.show = true;
          this.login.avatar = userInfoToSave.avatarUrl || "/static/default_avatar.png";
          this.login.nickname = userInfoToSave.nickname || "默认昵称";
          common_vendor.index.showToast({ title: "登录成功", icon: "none" });
        } else {
          common_vendor.index.showToast({
            title: loginResponse.data.msg || "登录失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/mine.vue:271", "登录失败:", error);
        common_vendor.index.showToast({ title: "登录请求失败，请重试", icon: "none" });
      } finally {
        this.loading = false;
        common_vendor.index.hideLoading();
      }
    },
    // 微信登录
    async handleAuth() {
      if (this.loading)
        return;
      this.loading = true;
      common_vendor.index.showLoading({ title: "登录中..." });
      try {
        const { code } = await common_vendor.index.login({ provider: "weixin" });
        const loginRes = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/login`,
          method: "POST",
          data: { code },
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        if (loginRes.data.code === 200) {
          const userInfo = loginRes.data.data.userInfo;
          common_vendor.index.setStorageSync("userInfo", userInfo);
          this.login.show = true;
          this.userId = userInfo.id;
          this.login.avatar = userInfo.avatarUrl || "/static/default_avatar.png";
          this.login.nickname = userInfo.nickname || "默认昵称";
          common_vendor.index.showToast({ title: "登录成功", icon: "none" });
        } else {
          common_vendor.index.showToast({
            title: `登录失败：${loginRes.data.msg || "未知错误"}`,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/mine.vue:314", "登录失败:", error);
        common_vendor.index.showToast({ title: "登录请求失败，请重试", icon: "none" });
      } finally {
        this.loading = false;
        common_vendor.index.hideLoading();
      }
    },
    // 选择头像（核心修正：先下载到本地）
    async handleChooseAvatar(e) {
      if (!this.login.show) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        return;
      }
      const avatarUrl = e.detail.avatarUrl;
      const { tempFilePath } = await common_vendor.index.downloadFile({ url: avatarUrl });
      this.tempLocalPath = tempFilePath;
      await this.uploadAvatarToMinIO();
    },
    // 上传头像到MinIO（使用本地路径）
    async uploadAvatarToMinIO() {
      if (!this.tempLocalPath)
        return;
      common_vendor.index.showLoading({ title: "上传中..." });
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          throw new Error("未找到登录凭证");
        }
        const uploadRes = await common_vendor.index.uploadFile({
          url: `${this.$config.baseUrl}/minio/upload`,
          filePath: this.tempLocalPath,
          name: "file",
          header: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (uploadRes.statusCode === 200) {
          const result = JSON.parse(uploadRes.data);
          if (result.code === 200) {
            const avatarUrl = result.data.url;
            const userInfo = common_vendor.index.getStorageSync("userInfo");
            await this.updateUserInfo({
              id: userInfo.id,
              avatarUrl
            });
          } else {
            throw new Error(result.message || "上传失败");
          }
        } else {
          throw new Error(`上传失败，状态码: ${uploadRes.statusCode}`);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/mine.vue:374", "头像上传失败:", error);
        common_vendor.index.showToast({ title: "头像上传失败", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 处理昵称变化
    async handleNicknameChange(e) {
      if (!this.login.show) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        return;
      }
      const nickname = e.detail.value;
      if (nickname && nickname.trim() !== "") {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        await this.updateUserInfo({
          id: userInfo.id,
          nickname: nickname.trim(),
          avatarUrl: userInfo.avatarUrl || this.login.avatar
        });
      }
    },
    // 通用更新方法
    async updateUserInfo(params) {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (!userInfo || !userInfo.id) {
          throw new Error("用户未登录或ID缺失");
        }
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          throw new Error("未找到登录凭证");
        }
        const requestData = {
          id: params.id || userInfo.id,
          avatarUrl: params.avatarUrl || userInfo.avatarUrl || this.login.avatar,
          ...params
        };
        const updateRes = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/updateUserInfo`,
          method: "POST",
          data: requestData,
          header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (updateRes.data.code === 200) {
          const updatedUserInfo = {
            ...userInfo,
            ...params
          };
          common_vendor.index.setStorageSync("userInfo", updatedUserInfo);
          if (params.nickname) {
            this.login.nickname = params.nickname;
          }
          if (params.avatarUrl) {
            this.login.avatar = params.avatarUrl;
          }
          common_vendor.index.showToast({ title: "更新成功", icon: "none" });
        } else {
          throw new Error(updateRes.data.message || "更新失败");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/mine.vue:448", "更新失败:", error);
        common_vendor.index.showToast({ title: error.message, icon: "none" });
      }
    },
    // 导航功能
    navigateTo(page) {
      if (page === "basicInfo") {
        common_vendor.index.navigateTo({
          url: "/pages/basicInfo/basicInfo"
        });
      } else {
        common_vendor.index.navigateTo({ url: `/pages/${page}/${page}` });
      }
    },
    // 退出登录
    handleLogout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.removeStorageSync("token");
            this.login.show = false;
            this.login.avatar = "/static/default_avatar.png";
            this.login.nickname = "";
            this.userId = "";
            this.email = "";
            this.code = "";
            common_vendor.index.showToast({ title: "已退出登录", icon: "none" });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.login.avatar,
    b: common_vendor.o((...args) => $options.handleChooseAvatar && $options.handleChooseAvatar(...args)),
    c: common_vendor.t($data.login.show ? "点击头像可更换" : "当前未登录，请登录！"),
    d: $data.login.nickname,
    e: common_vendor.o((...args) => $options.handleNicknameChange && $options.handleNicknameChange(...args)),
    f: !$data.login.show
  }, !$data.login.show ? {
    g: $data.email,
    h: common_vendor.o(($event) => $data.email = $event.detail.value),
    i: $data.code,
    j: common_vendor.o(($event) => $data.code = $event.detail.value),
    k: common_vendor.t($data.isSendingCode ? `${$data.countdown}s后重试` : "发送验证码"),
    l: $data.isSendingCode,
    m: common_vendor.o((...args) => $options.handleSendCode && $options.handleSendCode(...args)),
    n: common_vendor.o((...args) => $options.handleEmailLogin && $options.handleEmailLogin(...args)),
    o: common_vendor.o((...args) => $options.handleAuth && $options.handleAuth(...args))
  } : {}, {
    p: $data.login.show
  }, $data.login.show ? {
    q: common_vendor.o(($event) => $options.navigateTo("basicInfo")),
    r: common_vendor.o(($event) => $options.navigateTo("feedback")),
    s: common_vendor.o(($event) => $options.navigateTo("about"))
  } : {}, {
    t: $data.login.show
  }, $data.login.show ? {
    v: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/mine.js.map
