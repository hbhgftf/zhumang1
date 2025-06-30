"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../adapter-vue.js");
const common_assets = require("../../../../../../../../common/assets.js");
const common_vendor = require("../../../../../../../../common/vendor.js");
const Icon = () => "./customer-icon.js";
const { reactive, toRefs } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon
  },
  props: {
    payload: {
      type: Object,
      default: () => ({ content: { title: "", items: [] } })
    }
  },
  emits: ["sendMessage"],
  setup(props, { emit }) {
    var _a, _b, _c, _d, _e, _f;
    const data = reactive({
      // title
      title: ((_b = (_a = props.payload) == null ? void 0 : _a.content) == null ? void 0 : _b.title) || "",
      // all branch list
      list: ((_d = (_c = props.payload) == null ? void 0 : _c.content) == null ? void 0 : _d.items) || [],
      // current branch list
      showList: (((_f = (_e = props.payload) == null ? void 0 : _e.content) == null ? void 0 : _f.items) || []).slice(0, 3),
      // current page number
      pageNumber: 1
    });
    const handleContentListItemClick = (branch) => {
      emit("sendMessage", { text: branch.content });
    };
    const changeBranchList = () => {
      var _a2, _b2;
      if (data.pageNumber * 3 >= ((_a2 = data.list) == null ? void 0 : _a2.length)) {
        data.pageNumber = 0;
      }
      data.showList = (_b2 = data.list) == null ? void 0 : _b2.slice(
        data.pageNumber * 3,
        data.pageNumber * 3 + 3
      );
      data.pageNumber += 1;
    };
    return {
      ...toRefs(data),
      handleContentListItemClick,
      imRobotGuess: common_assets.imRobotGuess,
      refresh: common_assets.refresh,
      iconRight: common_assets.iconRight,
      changeBranchList,
      iconQuestion: common_assets.iconQuestion,
      iconRefresh: common_assets.iconRefresh
    };
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  _component_Icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      src: $setup.iconQuestion
    }),
    b: _ctx.title
  }, _ctx.title ? {
    c: common_vendor.t(_ctx.title)
  } : {}, {
    d: common_vendor.p({
      src: $setup.iconRefresh
    }),
    e: common_vendor.o(($event) => $setup.changeBranchList()),
    f: common_vendor.f(_ctx.showList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content),
        b: index,
        c: common_vendor.o(($event) => $setup.handleContentListItemClick(item), index)
      };
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-robot-welcome.js.map
