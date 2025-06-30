"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../utils/index.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  emits: ["scrollToLatestMessage"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { ref, onMounted, onUnmounted, computed, watch } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const messageList = ref([]);
    const currentConversationID = ref("");
    const currentLastMessageTime = ref(0);
    const newMessageCount = ref(0);
    const isScrollOverOneScreen = ref(false);
    const isExistLastMessage = ref(false);
    const isScrollButtonVisible = ref(false);
    const scrollButtonContent = computed(
      () => newMessageCount.value ? `${newMessageCount.value}${common_vendor.Wt.t("TUIChat.条新消息")}` : common_vendor.Wt.t("TUIChat.回到最新位置")
    );
    watch(
      () => [isScrollOverOneScreen.value, isExistLastMessage.value],
      () => {
        isScrollButtonVisible.value = isScrollOverOneScreen.value || isExistLastMessage.value;
        if (!isScrollButtonVisible.value) {
          resetNewMessageCount();
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.CHAT, {
        messageList: onMessageListUpdated,
        newMessageList: onNewMessageListUpdated
      });
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CHAT, {
        messageList: onMessageListUpdated,
        newMessageList: onNewMessageListUpdated
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversation: onCurrentConversationUpdated
      });
    });
    function isTypingMessage(message) {
      var _a, _b;
      return ((_b = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject((_a = message.payload) == null ? void 0 : _a.data)) == null ? void 0 : _b.businessID) === "user_typing_status";
    }
    function onMessageListUpdated(newMessageList) {
      var _a, _b;
      messageList.value = newMessageList || [];
      const lastMessage = (_b = messageList.value) == null ? void 0 : _b[((_a = messageList.value) == null ? void 0 : _a.length) - 1];
      isExistLastMessage.value = !!// 过滤在线消息
      // @ts-ignore
      (lastMessage && !(lastMessage == null ? void 0 : lastMessage._message._onlineOnlyFlag) && (lastMessage == null ? void 0 : lastMessage.time) < (currentLastMessageTime == null ? void 0 : currentLastMessageTime.value));
    }
    function onNewMessageListUpdated(newMessageList) {
      if (Array.isArray(newMessageList) && isScrollButtonVisible.value) {
        newMessageList.forEach((message) => {
          if (message && message.conversationID === currentConversationID.value && !message.isDeleted && !message.isRevoked && !isTypingMessage(message) && !message._message._onlineOnlyFlag) {
            newMessageCount.value += 1;
          }
        });
      }
    }
    function onCurrentConversationUpdated(conversation) {
      var _a;
      if ((conversation == null ? void 0 : conversation.conversationID) !== currentConversationID.value) {
        resetNewMessageCount();
      }
      currentConversationID.value = (conversation == null ? void 0 : conversation.conversationID) || "";
      currentLastMessageTime.value = ((_a = conversation == null ? void 0 : conversation.lastMessage) == null ? void 0 : _a.lastTime) || 0;
    }
    async function judgeScrollOverOneScreen(e) {
      var _a, _b, _c, _d, _e;
      if (e.target) {
        try {
          const { height } = await common_vendor.T(
            `#${(_a = e.target) == null ? void 0 : _a.id}`,
            "messageList"
          ) || {};
          const scrollHeight = ((_b = e.target) == null ? void 0 : _b.scrollHeight) || ((_c = e.detail) == null ? void 0 : _c.scrollHeight);
          const scrollTop = ((_d = e.target) == null ? void 0 : _d.scrollTop) || ((_e = e.detail) == null ? void 0 : _e.scrollTop) || 0;
          if (scrollHeight - scrollTop > 2 * height) {
            isScrollOverOneScreen.value = true;
            return;
          }
          isScrollOverOneScreen.value = false;
        } catch (error) {
          isScrollOverOneScreen.value = false;
        }
      }
    }
    function resetMessageSource() {
      if (common_vendor.Jt.getData(common_vendor.o$1.CHAT, "messageSource") !== void 0) {
        common_vendor.Jt.update(common_vendor.o$1.CHAT, "messageSource", void 0);
      }
    }
    function resetNewMessageCount() {
      newMessageCount.value = 0;
    }
    function scrollToMessageListBottom() {
      resetMessageSource();
      resetNewMessageCount();
      emits("scrollToLatestMessage");
    }
    function hideScrollButton() {
      if (isScrollButtonVisible.value) {
        isScrollButtonVisible.value = false;
        resetNewMessageCount();
      }
    }
    __expose({
      judgeScrollOverOneScreen,
      isScrollButtonVisible,
      hideScrollButton
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isScrollButtonVisible)
      }, common_vendor.unref(isScrollButtonVisible) ? {
        b: common_vendor.p({
          width: "10px",
          height: "10px",
          file: common_vendor.unref(common_assets.doubleArrowIcon)
        }),
        c: common_vendor.t(common_vendor.unref(scrollButtonContent)),
        d: common_vendor.o(scrollToMessageListBottom)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-063c826e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/scroll-button/index.js.map
