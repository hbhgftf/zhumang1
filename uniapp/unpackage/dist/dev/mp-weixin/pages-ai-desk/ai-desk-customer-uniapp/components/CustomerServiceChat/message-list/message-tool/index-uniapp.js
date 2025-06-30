"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../../../common/Toast/index-uniapp.js");
const common_assets = require("../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_enableSampleTaskStatus = require("../../../../utils/enableSampleTaskStatus.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../emoji-config/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("../../../common/Toast/type.js");
if (!Math) {
  Icon();
}
const Icon = () => "../../../common/Icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-uniapp",
  props: {
    messageItem: { default: () => ({}) }
  },
  setup(__props, { expose: __expose }) {
    const { ref, watchEffect, computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const actionItems = ref([
      {
        key: "copy",
        text: common_vendor.Wt.t("TUIChat.复制"),
        iconUrl: common_assets.copyIcon,
        renderCondition() {
          if (!message.value)
            return false;
          return message.value.type === TYPES.MSG_TEXT;
        },
        clickEvent: copyMessage
      },
      {
        key: "revoke",
        text: common_vendor.Wt.t("TUIChat.撤回"),
        iconUrl: common_assets.revokeIcon,
        renderCondition() {
          if (!message.value)
            return false;
          return message.value.flow === "out" && message.value.status === "success";
        },
        clickEvent: revokeMessage
      }
      // {
      //   key: 'delete',
      //   text: TUITranslateService.t('TUIChat.删除'),
      //   iconUrl: delIcon,
      //   renderCondition() {
      //     if (!message.value) return false;
      //     return message.value.status === 'success';
      //   },
      //   clickEvent: deleteMessage,
      // },
      // {
      //   key: 'quote',
      //   text: TUITranslateService.t('TUIChat.引用'),
      //   iconUrl: quoteIcon,
      //   renderCondition() {
      //     if (!message.value) return false;
      //     const _message = TUIStore.getMessageModel(message.value.ID);
      //     return message.value.status === 'success' && !_message.getSignalingInfo();
      //   },
      //   clickEvent: quoteMessage,
      // },
      // {
      //   key:'image',
      //   text:'查看图片',
      //   iconUrl:imgIcon,
      //   renderCondition() {
      //     if (!message.value || !isUniFrameWork) return false;
      //     return message.value.type === TYPES.MSG_CUSTOM && JSONToObject(message.value.payload.data).src === CUSTOM_MESSAGE_SRC.RICH_TEXT;
      //   },
      //   clickEvent:showImageInRichText,
      // }
    ]);
    const message = ref();
    const messageToolDom = ref();
    watchEffect(() => {
      message.value = common_vendor.Jt.getMessageModel(props.messageItem.ID);
    });
    const isAllActionItemInvalid = computed(() => {
      for (let i = 0; i < actionItems.value.length; ++i) {
        if (actionItems.value[i].renderCondition()) {
          return false;
        }
      }
      return true;
    });
    function getFunction(index) {
      actionItems.value[index].clickEvent();
    }
    function revokeMessage() {
      if (!message.value)
        return;
      const messageModel = common_vendor.Jt.getMessageModel(message.value.ID);
      messageModel.revokeMessage().then(() => {
        pagesAiDesk_aiDeskCustomerUniapp_utils_enableSampleTaskStatus.enableSampleTaskStatus("revokeMessage");
      }).catch((error) => {
        if (error.code === 20016) {
          const message2 = common_vendor.Wt.t("TUIChat.已过撤回时限");
          pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
            message: message2,
            type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.ERROR
          });
        }
      });
    }
    async function copyMessage() {
      var _a, _b, _c;
      (_c = common_vendor.i) == null ? void 0 : _c.setClipboardData({
        data: pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.transformTextWithKeysToEmojiNames((_b = (_a = message.value) == null ? void 0 : _a.payload) == null ? void 0 : _b.text)
      });
    }
    function beforeCopy(key) {
      if (key !== "copy" || pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) {
        return;
      }
    }
    __expose({
      messageToolDom
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(isAllActionItemInvalid) && !_ctx.messageItem.hasRiskContent
      }, !common_vendor.unref(isAllActionItemInvalid) && !_ctx.messageItem.hasRiskContent ? {
        b: common_vendor.f(common_vendor.unref(actionItems), (item, index, i0) => {
          return common_vendor.e({
            a: item.renderCondition()
          }, item.renderCondition() ? {
            b: "9600d769-0-" + i0,
            c: common_vendor.p({
              file: item.iconUrl,
              size: "15px"
            }),
            d: common_vendor.t(item.text),
            e: item.key,
            f: common_vendor.o(($event) => getFunction(index), item.key),
            g: common_vendor.o(($event) => beforeCopy(item.key), item.key)
          } : {});
        }),
        c: common_vendor.n("dialog-item-list-h5")
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9600d769"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-tool/index-uniapp.js.map
