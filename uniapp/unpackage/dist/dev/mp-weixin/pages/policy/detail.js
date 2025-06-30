"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      policy: null,
      loading: true,
      error: false
    };
  },
  onLoad(options) {
    if (options.id) {
      this.loadPolicyDetail(options.id);
    }
  },
  methods: {
    async loadPolicyDetail(id) {
      this.loading = true;
      this.error = false;
      try {
        const response = await common_vendor.index.request({
          url: `${this.$config.baseUrl}/policy/detail/${id}`
        });
        const { data } = response;
        if (data.code === 200) {
          this.policy = data.data;
        }
      } catch (err) {
        this.error = true;
        common_vendor.index.__f__("error", "at pages/policy/detail.vue:87", "Failed to load policy detail:", err);
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    },
    formatViews(views) {
      return views > 1e4 ? (views / 1e4).toFixed(1) + "w" : views;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.policy
  }, $data.policy ? common_vendor.e({
    c: $data.policy.cover
  }, $data.policy.cover ? {
    d: $data.policy.cover
  } : {}, {
    e: common_vendor.t($data.policy.title),
    f: common_vendor.t($options.formatDate($data.policy.publishDate)),
    g: common_vendor.t($options.formatViews($data.policy.views)),
    h: $data.policy.tags && $data.policy.tags.length
  }, $data.policy.tags && $data.policy.tags.length ? {
    i: common_vendor.f($data.policy.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index
      };
    })
  } : {}, {
    j: $data.policy.content
  }) : {}, {
    k: $data.loading
  }, $data.loading ? {
    l: common_assets._imports_0$2
  } : {}, {
    m: $data.error
  }, $data.error ? {
    n: common_assets._imports_1$2,
    o: common_vendor.o((...args) => $options.loadPolicyDetail && $options.loadPolicyDetail(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-059a76ff"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/policy/detail.js.map
