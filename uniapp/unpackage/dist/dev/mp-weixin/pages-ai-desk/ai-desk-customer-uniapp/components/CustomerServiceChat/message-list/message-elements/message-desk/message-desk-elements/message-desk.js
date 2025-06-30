"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../../../constant.js");
const common_vendor = require("../../../../../../../../common/vendor.js");
const MessageRating = () => "./message-rating/index.js";
const MessageBranch = () => "./message-branch.js";
const MessageForm = () => "./message-single-form/index.js";
const MessageIMRobotWelcome = () => "./message-robot-welcome.js";
const MessageProductCard = () => "./message-product-card.js";
const MessageRichText = () => "./message-rich-text.js";
const MessageStream = () => "./message-stream.js";
const MessageMultiBranch = () => "./message-multi-branch/index.js";
const MessageMultiForm = () => "./message-multi-form/index.js";
const MessageConcurrencyLimit = () => "./message-concurrency-limit.js";
const MessageOrder = () => "./message-order.js";
const { computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    MessageConcurrencyLimit,
    MessageBranch,
    MessageForm,
    MessageProductCard,
    MessageRichText,
    MessageIMRobotWelcome,
    MessageStream,
    MessageMultiBranch,
    MessageMultiForm,
    MessageRating,
    MessageOrder
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["showFormPopup", "heightChanged"],
  setup(props, { emit }) {
    const payload = computed(() => {
      var _a, _b;
      return props.message && pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject((_b = (_a = props.message) == null ? void 0 : _a.payload) == null ? void 0 : _b.data);
    });
    const messageID = computed(() => {
      return props.message.ID;
    });
    const sendTextMessage = (payload2) => {
      common_vendor.Qt.sendTextMessage({ payload: payload2 });
    };
    const sendCustomMessage = (payload2) => {
      common_vendor.Qt.sendCustomMessage({ payload: payload2 });
    };
    const handleShowFormPopup = (data) => {
      emit("showFormPopup", data);
    };
    const onHeightChanged = () => {
      emit("heightChanged");
    };
    return {
      payload,
      messageID,
      props,
      sendTextMessage,
      CUSTOM_MESSAGE_SRC: pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC,
      sendCustomMessage,
      handleShowFormPopup,
      onHeightChanged
    };
  }
};
if (!Array) {
  const _component_MessageBranch = common_vendor.resolveComponent("MessageBranch");
  const _component_MessageIMRobotWelcome = common_vendor.resolveComponent("MessageIMRobotWelcome");
  const _component_MessageForm = common_vendor.resolveComponent("MessageForm");
  const _component_MessageProductCard = common_vendor.resolveComponent("MessageProductCard");
  const _component_MessageRichText = common_vendor.resolveComponent("MessageRichText");
  const _component_MessageStream = common_vendor.resolveComponent("MessageStream");
  const _component_MessageMultiBranch = common_vendor.resolveComponent("MessageMultiBranch");
  const _component_MessageMultiForm = common_vendor.resolveComponent("MessageMultiForm");
  const _component_MessageRating = common_vendor.resolveComponent("MessageRating");
  const _component_MessageConcurrencyLimit = common_vendor.resolveComponent("MessageConcurrencyLimit");
  const _component_MessageOrder = common_vendor.resolveComponent("MessageOrder");
  (_component_MessageBranch + _component_MessageIMRobotWelcome + _component_MessageForm + _component_MessageProductCard + _component_MessageRichText + _component_MessageStream + _component_MessageMultiBranch + _component_MessageMultiForm + _component_MessageRating + _component_MessageConcurrencyLimit + _component_MessageOrder)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.BRANCH || $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.BRANCH_NUMBER || $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ROBOT_MSG && $setup.payload.subtype !== "welcome_msg"
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.BRANCH || $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.BRANCH_NUMBER || $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ROBOT_MSG && $setup.payload.subtype !== "welcome_msg" ? {
    b: common_vendor.o($setup.sendTextMessage),
    c: common_vendor.o($setup.onHeightChanged),
    d: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    e: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ROBOT_MSG
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ROBOT_MSG ? {
    f: common_vendor.o($setup.sendTextMessage),
    g: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    h: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.FROM_INPUT
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.FROM_INPUT ? {
    i: common_vendor.o($setup.sendTextMessage),
    j: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    k: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.PRODUCT_CARD
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.PRODUCT_CARD ? {
    l: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    m: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.RICH_TEXT
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.RICH_TEXT ? {
    n: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    o: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.STREAM_TEXT
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.STREAM_TEXT ? {
    p: common_vendor.o($setup.onHeightChanged),
    q: common_vendor.p({
      payload: $setup.payload,
      messageID: $setup.messageID
    })
  } : {}, {
    r: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MULTI_BRANCH
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MULTI_BRANCH ? {
    s: common_vendor.o($setup.sendTextMessage),
    t: common_vendor.o($setup.onHeightChanged),
    v: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    w: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MULTI_FORM && $props.message.flow == "in"
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MULTI_FORM && $props.message.flow == "in" ? {
    x: common_vendor.o($setup.sendCustomMessage),
    y: common_vendor.o($setup.handleShowFormPopup),
    z: common_vendor.p({
      payload: $setup.payload
    })
  } : {}, {
    A: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MENU
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.MENU ? {
    B: common_vendor.o($setup.sendCustomMessage),
    C: common_vendor.p({
      message: $setup.props.message
    })
  } : {}, {
    D: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.CONCURRENCY_LIMIT
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.CONCURRENCY_LIMIT ? {} : {}, {
    E: $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ORDER
  }, $setup.payload.src === $setup.CUSTOM_MESSAGE_SRC.ORDER ? {
    F: common_vendor.p({
      payload: $setup.payload
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-desk.js.map
