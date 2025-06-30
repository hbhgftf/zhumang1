"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../constant.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../emoji-config/index.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "emoji-picker-dialog",
  emits: ["insertEmoji", "onClose", "sendMessage"],
  setup(__props, { emit: __emit }) {
    var _a;
    const { ref, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const currentTabIndex = ref(0);
    const currentConversation = ref();
    ref();
    ref();
    const list = ref(initEmojiList());
    const currentTabItem = ref(list == null ? void 0 : list.value[0]);
    const currentEmojiList = ref((_a = list == null ? void 0 : list.value[0]) == null ? void 0 : _a.list);
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdate
      });
    });
    const toggleEmojiTab = (index) => {
      var _a2;
      currentTabIndex.value = index;
      currentTabItem.value = list == null ? void 0 : list.value[index];
      currentEmojiList.value = (_a2 = list == null ? void 0 : list.value[index]) == null ? void 0 : _a2.list;
    };
    const select = (item, index) => {
      var _a2, _b, _c;
      const options = {
        emoji: { key: item, name: pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.convertKeyToEmojiName(item) },
        type: (_a2 = currentTabItem == null ? void 0 : currentTabItem.value) == null ? void 0 : _a2.type
      };
      switch ((_b = currentTabItem == null ? void 0 : currentTabItem.value) == null ? void 0 : _b.type) {
        case pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE.BASIC:
          options.url = ((_c = currentTabItem == null ? void 0 : currentTabItem.value) == null ? void 0 : _c.url) + pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.BASIC_EMOJI_URL_MAPPING[item];
          common_vendor.index.$emit("insert-emoji", options);
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE.BIG:
          sendFaceMessage(index, currentTabItem.value);
          break;
        case pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE.CUSTOM:
          sendFaceMessage(index, currentTabItem.value);
          break;
      }
    };
    const sendFaceMessage = (index, listItem) => {
      var _a2, _b, _c, _d, _e;
      const options = {
        to: ((_b = (_a2 = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _a2.groupProfile) == null ? void 0 : _b.groupID) || ((_d = (_c = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _c.userProfile) == null ? void 0 : _d.userID),
        conversationType: (_e = currentConversation == null ? void 0 : currentConversation.value) == null ? void 0 : _e.type,
        payload: {
          index: listItem.emojiGroupID,
          data: listItem.list[index]
        },
        needReadReceipt: pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()
      };
      common_vendor.Qt.sendFaceMessage(options);
    };
    function sendMessage() {
      common_vendor.index.$emit("send-message-in-emoji-picker");
    }
    function onCurrentConversationUpdate(conversation) {
      currentConversation.value = conversation;
    }
    function initEmojiList() {
      return pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.EMOJI_GROUP_LIST;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(currentEmojiList), (childrenItem, childrenIndex, i0) => {
          return common_vendor.e(common_vendor.unref(currentTabItem).type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BASIC ? {
            a: common_vendor.unref(currentTabItem).url + common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.BASIC_EMOJI_URL_MAPPING)[childrenItem]
          } : common_vendor.unref(currentTabItem).type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BIG ? {
            b: common_vendor.unref(currentTabItem).url + childrenItem + "@2x.png"
          } : {
            c: common_vendor.unref(currentTabItem).url + childrenItem
          }, {
            d: childrenIndex,
            e: common_vendor.o(($event) => select(childrenItem, childrenIndex), childrenIndex)
          });
        }),
        b: common_vendor.unref(currentTabItem).type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BASIC,
        c: common_vendor.unref(currentTabItem).type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BIG,
        d: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: item.type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BASIC
          }, item.type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BASIC ? {
            b: "28fc796a-0-" + i0,
            c: common_vendor.p({
              file: common_vendor.unref(common_assets.faceIcon$1)
            })
          } : item.type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BIG ? {
            e: item.url + item.list[0] + "@2x.png"
          } : {
            f: item.url + item.list[0]
          }, {
            d: item.type === common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_constant.EMOJI_TYPE).BIG,
            g: index,
            h: common_vendor.o(($event) => toggleEmojiTab(index), index)
          });
        }),
        e: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5)
      }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) || common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) ? {
        f: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("发送")),
        g: common_vendor.o(sendMessage)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28fc796a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-input-toolbar/emoji-picker/emoji-picker-dialog.js.map
