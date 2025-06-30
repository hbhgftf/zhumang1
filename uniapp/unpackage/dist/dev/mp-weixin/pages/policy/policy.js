"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      regions: ["全国", "北京", "上海", "广州", "深圳"],
      currentRegion: "全国",
      leftColumn: [],
      rightColumn: [],
      page: 1,
      pageSize: 10,
      loading: false,
      hasMore: true,
      error: false,
      mockPolicies: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `2024年助残政策${i + 1}`,
        summary: `本政策针对视力障碍群体提供${["就业", "教育", "出行"][Math.floor(Math.random() * 3)]}补贴`,
        publishDate: Date.now() - i * 24 * 60 * 60 * 1e3,
        views: Math.floor(Math.random() * 2e4) + 1e3,
        cover: `https://picsum.photos/300/${Math.floor(Math.random() * 200 + 150)}?random=${i}`,
        tags: ["国家政策", "助残补贴", "无障碍建设"][Math.floor(Math.random() * 3)]
      }))
    };
  },
  onLoad() {
    this.loadPolicies();
  },
  onReachBottom() {
    if (!this.loading && this.hasMore) {
      this.loadPolicies();
    }
  },
  methods: {
    async loadPolicies() {
      if (this.loading || !this.hasMore)
        return;
      this.loading = true;
      this.error = false;
      try {
        const start = (this.page - 1) * this.pageSize;
        const end = this.page * this.pageSize;
        const newPolicies = this.mockPolicies.slice(start, end);
        if (newPolicies.length === 0) {
          this.hasMore = false;
          return;
        }
        newPolicies.forEach((policy, index) => {
          if (index % 2 === 0) {
            this.leftColumn.push({ ...policy, loaded: false });
          } else {
            this.rightColumn.push({ ...policy, loaded: false });
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        this.hasMore = end < this.mockPolicies.length;
        this.page++;
      } catch (error) {
        this.error = true;
        common_vendor.index.__f__("error", "at pages/policy/policy.vue:165", "加载数据失败:", error);
      } finally {
        this.loading = false;
      }
    },
    onRegionChange(e) {
      this.currentRegion = this.regions[e.detail.value];
      this.resetData();
      this.loadPolicies();
    },
    resetData() {
      this.leftColumn = [];
      this.rightColumn = [];
      this.page = 1;
      this.hasMore = true;
      this.error = false;
    },
    onImageLoad(id) {
      const updateColumn = (column) => {
        const index = column.findIndex((item) => item.id === id);
        if (index !== -1)
          column[index].loaded = true;
      };
      updateColumn(this.leftColumn);
      updateColumn(this.rightColumn);
    },
    navigateToDetail(id) {
      common_vendor.index.navigateTo({ url: `/pages/policy/detail?id=${id}` });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toISOString().split("T")[0];
    },
    formatViews(views) {
      return views >= 1e4 ? `${(views / 1e4).toFixed(1)}万` : views;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.currentRegion),
    b: $data.regions,
    c: common_vendor.o((...args) => $options.onRegionChange && $options.onRegionChange(...args)),
    d: common_vendor.f($data.leftColumn, (item, k0, i0) => {
      return common_vendor.e({
        a: item.cover
      }, item.cover ? {
        b: item.cover,
        c: common_vendor.o(($event) => $options.onImageLoad(item.id), item.id)
      } : {}, {
        d: item.tags && item.tags.length
      }, item.tags && item.tags.length ? {
        e: common_vendor.t(item.tags[0])
      } : {}, {
        f: common_vendor.t(item.title),
        g: common_vendor.t(item.summary),
        h: common_vendor.t($options.formatDate(item.publishDate)),
        i: common_vendor.t($options.formatViews(item.views)),
        j: item.id,
        k: common_vendor.o(($event) => $options.navigateToDetail(item.id), item.id),
        l: item.loaded ? 1 : 0
      });
    }),
    e: common_vendor.f($data.rightColumn, (item, k0, i0) => {
      return common_vendor.e({
        a: item.cover
      }, item.cover ? {
        b: item.cover,
        c: common_vendor.o(($event) => $options.onImageLoad(item.id), item.id)
      } : {}, {
        d: item.tags && item.tags.length
      }, item.tags && item.tags.length ? {
        e: common_vendor.t(item.tags[0])
      } : {}, {
        f: common_vendor.t(item.title),
        g: common_vendor.t(item.summary),
        h: common_vendor.t($options.formatDate(item.publishDate)),
        i: common_vendor.t($options.formatViews(item.views)),
        j: item.id,
        k: common_vendor.o(($event) => $options.navigateToDetail(item.id), item.id),
        l: item.loaded ? 1 : 0
      });
    }),
    f: $data.loading || !$data.hasMore
  }, $data.loading || !$data.hasMore ? common_vendor.e({
    g: $data.loading
  }, $data.loading ? {
    h: common_assets._imports_0$2
  } : !$data.hasMore ? {} : {}, {
    i: !$data.hasMore
  }) : {}, {
    j: $data.error
  }, $data.error ? {
    k: common_assets._imports_1$2,
    l: common_vendor.o((...args) => $options.loadPolicies && $options.loadPolicies(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e5fb8d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/policy/policy.js.map
