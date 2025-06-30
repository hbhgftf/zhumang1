"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        idCard: "",
        openid: ""
      }
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo) {
      this.formData.openid = userInfo.openid;
      common_vendor.index.__f__("log", "at pages/index/volunteer-register.vue:51", this.formData.openid);
    } else {
      common_vendor.index.showToast({
        title: "请先登录",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/mine/"
        });
      }, 1500);
    }
  },
  methods: {
    async submitForm() {
      if (!this.formData.name || !this.formData.phone || !this.formData.idCard) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      common_vendor.index.__f__("log", "at pages/index/volunteer-register.vue:76", "志愿者注册表单数据：", {
        姓名: this.formData.name,
        手机号码: this.formData.phone,
        身份证号: this.formData.idCard,
        openid: this.formData.openid
      });
      try {
        common_vendor.index.__f__("log", "at pages/index/volunteer-register.vue:85", "开始请求注册接口...");
        const res = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/user/user/volunteer/register`,
          method: "POST",
          data: this.formData,
          header: {
            "content-type": "application/json"
          }
        });
        common_vendor.index.__f__("log", "at pages/index/volunteer-register.vue:95", "接口返回数据：", res);
        if (res.data.success) {
          common_vendor.index.showToast({
            title: "申请提交成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          common_vendor.index.__f__("error", "at pages/index/volunteer-register.vue:106", "注册失败，错误信息：", res.data);
          common_vendor.index.showToast({
            title: res.data.message || "提交失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/volunteer-register.vue:113", "请求发生错误：", error);
        common_vendor.index.__f__("error", "at pages/index/volunteer-register.vue:114", "错误详情：", {
          错误信息: error.message,
          错误堆栈: error.stack,
          请求数据: this.formData
        });
        common_vendor.index.showToast({
          title: "提交失败，请重试",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.formData.name,
    b: common_vendor.o(($event) => $data.formData.name = $event.detail.value),
    c: $data.formData.phone,
    d: common_vendor.o(($event) => $data.formData.phone = $event.detail.value),
    e: $data.formData.idCard,
    f: common_vendor.o(($event) => $data.formData.idCard = $event.detail.value),
    g: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-addff714"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/volunteer-register.js.map
