"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    message: { default: () => ({}) }
  },
  setup(__props) {
    const { computed, ref, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const isDisplayMessageReadReceipt = ref(
      // TUIStore.getData(StoreName.USER, 'displayMessageReadReceipt'),
      true
    );
    onMounted(() => {
      common_vendor.Jt.watch(common_vendor.o$1.USER, {
        displayMessageReadReceipt: onDisplayMessageReadReceiptUpdate
      });
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.USER, {
        displayMessageReadReceipt: onDisplayMessageReadReceiptUpdate
      });
    });
    const isShowReadStatus = computed(() => {
      if (!isDisplayMessageReadReceipt.value) {
        return false;
      }
      const {
        ID,
        type,
        flow,
        status,
        hasRiskContent,
        conversationID,
        conversationType,
        needReadReceipt = false
      } = props.message;
      if (hasRiskContent) {
        return false;
      }
      const { groupProfile } = common_vendor.Jt.getConversationModel(conversationID) || {};
      if ((groupProfile == null ? void 0 : groupProfile.type) === TYPES.GRP_AVCHATROOM || (groupProfile == null ? void 0 : groupProfile.type) === TYPES.GRP_COMMUNITY) {
        return false;
      }
      if (type === TYPES.MSG_CUSTOM) {
        const message = common_vendor.Jt.getMessageModel(ID);
        if ((message == null ? void 0 : message.getSignalingInfo()) !== null) {
          return false;
        }
      }
      if (flow !== "out" || status !== "success") {
        return false;
      }
      if (conversationType === "GROUP") {
        return needReadReceipt;
      } else if (conversationType === "C2C") {
        return true;
      }
      return false;
    });
    const readState = computed(() => {
      const {
        conversationType,
        needReadReceipt = false,
        isPeerRead = false
      } = props.message;
      const {
        readCount = 0,
        unreadCount = 0,
        isPeerRead: isReceiptPeerRead = false
      } = props.message.readReceiptInfo;
      if (conversationType === "C2C") {
        if (needReadReceipt) {
          return isReceiptPeerRead ? 0 : 1;
        } else {
          return isPeerRead ? 0 : 1;
        }
      } else if (conversationType === "GROUP") {
        if (needReadReceipt) {
          if (readCount === 0) {
            return 1;
          } else if (unreadCount === 0) {
            return 2;
          } else {
            return 4;
          }
        } else {
          return 3;
        }
      }
      return 1;
    });
    const readStatusText = computed(() => {
      const { readCount = 0 } = props.message.readReceiptInfo;
      switch (readState.value) {
        case 0:
          return common_vendor.Wt.t("TUIChat.已读");
        case 1:
          return common_vendor.Wt.t("TUIChat.未读");
        case 2:
          return common_vendor.Wt.t("TUIChat.全部已读");
        case 4:
          return `${readCount}${common_vendor.Wt.t("TUIChat.人已读")}`;
        default:
          return "";
      }
    });
    const isUseUnreadStyle = computed(() => {
      const { conversationType } = props.message;
      if (conversationType === "C2C") {
        return readState.value !== 0;
      } else if (conversationType === "GROUP") {
        return readState.value !== 2;
      }
      return false;
    });
    function onDisplayMessageReadReceiptUpdate(isDisplay) {
      isDisplayMessageReadReceipt.value = isDisplay;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(readStatusText)),
        b: common_vendor.unref(isShowReadStatus),
        c: common_vendor.unref(isUseUnreadStyle) ? 1 : ""
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f016b86f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/read-status/index.js.map
