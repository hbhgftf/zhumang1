"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../constant.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
if (!Math) {
  (ToolbarButtonHumanService + ToolbarButtonServiceRating + ToolbarButtonEndHumanService + Icon)();
}
const Icon = () => "../../common/Icon.js";
const ToolbarButtonHumanService = () => "./toolbar-button-human-service.js";
const ToolbarButtonServiceRating = () => "./toolbar-button-service-rating.js";
const ToolbarButtonEndHumanService = () => "./toolbar-button-end-human-service.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    toolbarButtonList: { default: () => [] }
  },
  setup(__props) {
    const { ref, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const isInHumanService = ref(false);
    const currentConversation = ref();
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
      common_vendor.Jt.watch(common_vendor.o$1.CUSTOM, {
        isInHumanService: onInHumanServiceUpdate
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.CUSTOM, {
        isInHumanService: onInHumanServiceUpdate
      });
    });
    const onCurrentConversationUpdate = (conversation) => {
      currentConversation.value = conversation;
    };
    const onInHumanServiceUpdate = (value) => {
      isInHumanService.value = value;
    };
    function onClick(item, index) {
      var _a;
      if (item.type === 1 && item.content) {
        common_vendor.Qt.sendTextMessage({
          to: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.getTo(currentConversation == null ? void 0 : currentConversation.value),
          conversationType: (_a = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a.type,
          payload: {
            text: item.content
          },
          needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
        });
      } else if (item.type === 2 && item.content) {
        pagesAiDesk_aiDeskCustomerUniapp_utils_utils.openSafeUrl(item.content);
      } else if (props.toolbarButtonList !== void 0 && typeof props.toolbarButtonList[index].clickEvent === "function") {
        props.toolbarButtonList[index].clickEvent();
      }
    }
    function shouldRender(item) {
      if (item.isEnabled === 1) {
        return true;
      } else if (item.isEnabled === 0) {
        return false;
      } else if (item.renderCondition) {
        return typeof item.renderCondition === "function" ? item.renderCondition() : false;
      }
      return false;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.toolbarButtonList, (item, index, i0) => {
          return common_vendor.e({
            a: item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).HUMAN_SERVICE && shouldRender(item) && !common_vendor.unref(isInHumanService)
          }, item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).HUMAN_SERVICE && shouldRender(item) && !common_vendor.unref(isInHumanService) ? {
            b: "8169ee77-0-" + i0,
            c: common_vendor.p({
              title: item.title,
              icon: item.icon
            })
          } : item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).SERVICE_RATING && shouldRender(item) && common_vendor.unref(isInHumanService) ? {
            e: "8169ee77-1-" + i0,
            f: common_vendor.p({
              title: item.title,
              icon: item.icon
            })
          } : item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).END_HUMAN_SERVICE && shouldRender(item) && common_vendor.unref(isInHumanService) ? {
            h: "8169ee77-2-" + i0,
            i: common_vendor.p({
              title: item.title,
              icon: item.icon
            })
          } : shouldRender(item) && !item.presetId ? common_vendor.e({
            k: item.icon
          }, item.icon ? {
            l: "8169ee77-3-" + i0,
            m: common_vendor.p({
              file: item.icon,
              width: "18px",
              height: "18px"
            })
          } : {}, {
            n: common_vendor.t(item.title),
            o: index,
            p: common_vendor.n(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) ? "toolbar-button-h5" : ""),
            q: common_vendor.o(($event) => onClick(item, index), index)
          }) : {}, {
            d: item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).SERVICE_RATING && shouldRender(item) && common_vendor.unref(isInHumanService),
            g: item.presetId === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.TOOLBAR_BUTTON_TYPE).END_HUMAN_SERVICE && shouldRender(item) && common_vendor.unref(isInHumanService),
            j: shouldRender(item) && !item.presetId
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8169ee77"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-toolbar-button/index.js.map
