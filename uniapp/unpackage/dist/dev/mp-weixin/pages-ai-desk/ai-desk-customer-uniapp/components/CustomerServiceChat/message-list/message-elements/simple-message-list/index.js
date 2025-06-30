"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../adapter-vue.js");
const common_assets = require("../../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index = require("../../../emoji-config/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_customEmoji = require("../../../emoji-config/custom-emoji.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji = require("../../../emoji-config/default-emoji.js");
if (!Math) {
  (Icon + MessageRecord + MessageContainer)();
}
const Icon = () => "../../../../common/Icon.js";
const MessageContainer = () => "./message-container.js";
const MessageRecord = () => "../message-record/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    messageID: { default: "" },
    isMounted: { type: Boolean, default: false }
  },
  emits: ["closeOverlay"],
  setup(__props, { emit: __emit }) {
    const { computed, ref, watch } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    const props = __props;
    const TYPES = common_vendor.qt.TYPES;
    const isDownloadOccurError = ref(false);
    const messageListStack = ref([]);
    const currentMergeMessageInfo = ref({
      title: "",
      messageList: []
    });
    ref();
    watch(
      () => messageListStack.value.length,
      async (newValue) => {
        isDownloadOccurError.value = false;
        if (newValue < 1) {
          return;
        }
        const stackTopMessageInfo = messageListStack.value[messageListStack.value.length - 1];
        if (stackTopMessageInfo.downloadKey && stackTopMessageInfo.messageList.length === 0) {
          try {
            const res = await common_vendor.Qt.downloadMergedMessages({
              payload: stackTopMessageInfo,
              type: common_vendor.qt.TYPES.MSG_MERGER
            });
            messageListStack.value[messageListStack.value.length - 1] = res.payload;
          } catch (error) {
            isDownloadOccurError.value = true;
          }
        }
        currentMergeMessageInfo.value = messageListStack.value[messageListStack.value.length - 1];
      }
    );
    watch(
      () => props.isMounted,
      (newValue) => {
        if (newValue) {
          if (!props.messageID) {
            throw new Error(
              "messageID is required when first render of simple-message-list."
            );
          }
          const sdkMessagePayload = common_vendor.Jt.getMessageModel(
            props.messageID
          ).getMessage().payload;
          messageListStack.value = [sdkMessagePayload];
        } else {
          messageListStack.value = [];
        }
      },
      {
        immediate: true
      }
    );
    const isReturn = computed(() => {
      return messageListStack.value.length > 1;
    });
    const isMergeMessageInfoLoaded = computed(() => {
      var _a;
      return ((_a = currentMergeMessageInfo.value) == null ? void 0 : _a.messageList) ? currentMergeMessageInfo.value.messageList.length > 0 : false;
    });
    function entryNextLevel(e, sdkMessage) {
      messageListStack.value.push(sdkMessage.messageBody[0].payload);
      e.stopPropagation();
    }
    function backPreviousLevel() {
      messageListStack.value.pop();
      if (messageListStack.value.length < 1) {
        emits("closeOverlay");
      }
    }
    function previewVideoInUniapp(url) {
      const encodedUrl = encodeURIComponent(url);
      common_vendor.index.navigateTo({
        url: `/TUIKit/components/TUIChat/video-play?videoUrl=${encodedUrl}`
      });
    }
    function resolveBigFaceUrl(bigFaceKey) {
      let url = "";
      if (bigFaceKey.indexOf("@custom") > -1) {
        url = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_customEmoji.CUSTOM_BIG_EMOJI_URL + bigFaceKey;
      } else {
        url = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_defaultEmoji.DEFAULT_BIG_EMOJI_URL + bigFaceKey;
        if (url.indexOf("@2x") === -1) {
          url += "@2x.png";
        } else {
          url += ".png";
        }
      }
      return url;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          file: common_vendor.unref(common_assets.addIcon),
          size: "18px"
        }),
        b: common_vendor.unref(isReturn)
      }, common_vendor.unref(isReturn) ? {
        c: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.返回"))
      } : {
        d: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.关闭"))
      }, {
        e: common_vendor.o(backPreviousLevel),
        f: common_vendor.t(common_vendor.unref(currentMergeMessageInfo).title),
        g: common_vendor.unref(isDownloadOccurError)
      }, common_vendor.unref(isDownloadOccurError) ? {} : common_vendor.unref(isMergeMessageInfoLoaded) ? {
        i: common_vendor.f(common_vendor.unref(currentMergeMessageInfo).messageList, (item, k0, i0) => {
          return common_vendor.e({
            a: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_TEXT
          }, item.messageBody[0].type === common_vendor.unref(TYPES).MSG_TEXT ? {
            b: common_vendor.f(common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_emojiConfig_index.parseTextToRenderArray)(item.messageBody[0].payload["text"]), (textInfo, index, i1) => {
              return common_vendor.e({
                a: textInfo.type === "text"
              }, textInfo.type === "text" ? {
                b: common_vendor.t(textInfo.content)
              } : {
                c: textInfo.content
              }, {
                d: index
              });
            })
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_IMAGE ? {
            d: item.messageBody[0].payload["imageInfoArray"][2]["url"]
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_VIDEO ? {
            f: item.messageBody[0].payload["thumbUrl"],
            g: "1cbb14e0-2-" + i0 + "," + ("1cbb14e0-1-" + i0),
            h: common_vendor.p({
              file: common_vendor.unref(common_assets.playIcon)
            }),
            i: common_vendor.o(($event) => previewVideoInUniapp(item.messageBody[0].payload["remoteVideoUrl"]), item.ID)
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_AUDIO ? {
            k: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.语音")),
            l: common_vendor.t(item.messageBody[0].payload.second)
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_FACE ? {
            n: resolveBigFaceUrl(item.messageBody[0].payload.data)
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_FILE ? {
            p: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.[文件]"))
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_LOCATION ? {
            r: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.[地理位置]"))
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_MERGER ? {
            t: "1cbb14e0-3-" + i0 + "," + ("1cbb14e0-1-" + i0),
            v: common_vendor.p({
              disabled: true,
              renderData: item.messageBody[0].payload
            }),
            w: common_vendor.o(($event) => entryNextLevel($event, item), item.ID)
          } : item.messageBody[0].type === common_vendor.unref(TYPES).MSG_CUSTOM ? {
            y: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.[自定义消息]"))
          } : {}, {
            c: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_IMAGE,
            e: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_VIDEO,
            j: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_AUDIO,
            m: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_FACE,
            o: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_FILE,
            q: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_LOCATION,
            s: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_MERGER,
            x: item.messageBody[0].type === common_vendor.unref(TYPES).MSG_CUSTOM,
            z: "1cbb14e0-1-" + i0,
            A: common_vendor.p({
              sender: item.nick,
              avatar: item.avatar,
              type: item.messageBody[0].type,
              time: item.time
            }),
            B: item.ID
          });
        })
      } : {}, {
        h: common_vendor.unref(isMergeMessageInfoLoaded),
        j: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isMobile) ? 1 : ""
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cbb14e0"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/simple-message-list/index.js.map
