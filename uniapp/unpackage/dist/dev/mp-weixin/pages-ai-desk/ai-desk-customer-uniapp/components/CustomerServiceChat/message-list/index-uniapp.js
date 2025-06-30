"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_index = require("./message-elements/message-desk/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp = require("../../common/Toast/index-uniapp.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../utils/utils.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_chatStorage = require("../../../utils/chatStorage.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_index = require("../../../index.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../constant.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("../../common/Toast/type.js");
if (!Math) {
  (MessageTimestamp + MessageThinking + MessageText + MessageImage + ProgressMessage + MessageVideo + MessageAudio + MessageRecord + MessageFile + MessageFace + MessageLocation + MessageCustom + MessageBubble + MessagePlugin + MessageRevoked + MessageTool + ScrollButton + Dialog + SimpleMessageList + Drawer)();
}
const SimpleMessageList = () => "./message-elements/simple-message-list/index.js";
const MessageText = () => "./message-elements/message-text.js";
const MessageImage = () => "./message-elements/message-image-uniapp.js";
const MessageAudio = () => "./message-elements/message-audio-uniapp.js";
const MessageRecord = () => "./message-elements/message-record/index.js";
const MessageFile = () => "./message-elements/message-file.js";
const MessageFace = () => "./message-elements/message-face.js";
const MessageCustom = () => "./message-elements/message-custom.js";
const MessageBubble = () => "./message-elements/message-bubble-uniapp.js";
const MessageLocation = () => "./message-elements/message-location.js";
const MessageTimestamp = () => "./message-elements/message-timestamp.js";
const MessageVideo = () => "./message-elements/message-video-uniapp.js";
const MessageTool = () => "./message-tool/index-uniapp.js";
const MessageRevoked = () => "./message-tool/message-revoked.js";
const MessagePlugin = () => "./message-elements/message-desk/message-plugin-uniapp.js";
const MessageThinking = () => "./message-elements/message-thinking.js";
const ScrollButton = () => "./scroll-button/index.js";
const Dialog = () => "../../common/Dialog/index.js";
const Drawer = () => "../../common/Drawer/index.js";
const ProgressMessage = () => "../../common/ProgressMessage/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-uniapp",
  emits: ["closeInputToolBar", "handleEditor", "showFormPopup"],
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    const { ref, nextTick, onMounted, onUnmounted, getCurrentInstance } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const emits = __emit;
    let selfAddValue = 0;
    let observer = null;
    const sentReceiptMessageID = /* @__PURE__ */ new Set();
    const thisInstance = ((_a = getCurrentInstance()) == null ? void 0 : _a.proxy) || getCurrentInstance();
    const messageList = ref([]);
    const isCompleted = ref(false);
    const currentConversationID = ref("");
    const toggleID = ref("");
    const scrollTop = ref(5e3);
    const TYPES = ref(common_vendor.qt.TYPES);
    const isLoadingMessage = ref(false);
    const isLongpressing = ref(false);
    const blinkMessageIDList = ref([]);
    const messageTarget = ref();
    const scrollButtonInstanceRef = ref();
    const historyFirstMessageID = ref("");
    const isShowSimpleMessageList = ref(false);
    const simpleMessageListRenderMessageID = ref();
    const audioPlayedMapping = ref({});
    const broadcastNewAudioSrc = ref("");
    const reSendDialogShow = ref(false);
    const resendMessageData = ref();
    const scrollToBottom = () => {
      scrollTop.value += 300;
      const timer2 = setTimeout(() => {
        scrollTop.value += 1;
        clearTimeout(timer2);
      }, 300);
    };
    const onCurrentConversationIDUpdated = (conversationID) => {
      currentConversationID.value = conversationID;
      if (Object.keys(audioPlayedMapping.value).length > 0) {
        pagesAiDesk_aiDeskCustomerUniapp_utils_chatStorage.chatStorage.setChatStorage("audioPlayedMapping", audioPlayedMapping.value);
      }
    };
    onMounted(() => {
      audioPlayedMapping.value = pagesAiDesk_aiDeskCustomerUniapp_utils_chatStorage.chatStorage.getChatStorage("audioPlayedMapping") || {};
      common_vendor.Jt.watch(common_vendor.o$1.CONV, {
        currentConversationID: onCurrentConversationIDUpdated
      });
      common_vendor.Jt.watch(common_vendor.o$1.CHAT, {
        messageList: onMessageListUpdated,
        messageSource: onMessageSourceUpdated,
        isCompleted: onChatCompletedUpdated,
        newMessageList: onNewMessageList
      });
      common_vendor.v("messageList", thisInstance);
      common_vendor.index.$on("scroll-to-bottom", scrollToLatestMessage);
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CHAT, {
        messageList: onMessageListUpdated,
        messageSource: onMessageSourceUpdated,
        isCompleted: onChatCompletedUpdated,
        newMessageList: onNewMessageList
      });
      common_vendor.Jt.unwatch(common_vendor.o$1.CONV, {
        currentConversationID: onCurrentConversationIDUpdated
      });
      observer == null ? void 0 : observer.disconnect();
      observer = null;
      common_vendor.index.$off("scroll-to-bottom");
      if (Object.keys(audioPlayedMapping.value).length > 0) {
        pagesAiDesk_aiDeskCustomerUniapp_utils_chatStorage.chatStorage.setChatStorage("audioPlayedMapping", audioPlayedMapping.value);
      }
    });
    const handelScrollListScroll = common_vendor.lodashExports.throttle(
      function(e) {
        var _a2;
        (_a2 = scrollButtonInstanceRef.value) == null ? void 0 : _a2.judgeScrollOverOneScreen(e);
      },
      500,
      { leading: true }
    );
    function getGlobalAudioContext(audioMap, options) {
      if (options == null ? void 0 : options.newAudioSrc) {
        broadcastNewAudioSrc.value = options.newAudioSrc;
      }
    }
    function onNewMessageList(list) {
      list.forEach((message) => {
        var _a2;
        if ((message == null ? void 0 : message.type) === common_vendor.qt.TYPES.MSG_CUSTOM) {
          const data = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject((_a2 = message == null ? void 0 : message.payload) == null ? void 0 : _a2.data);
          if ((data == null ? void 0 : data.src) === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.SEAT_STATUS) {
            if ((data == null ? void 0 : data.content.command) === "updateSeatStatus") {
              if (data.content.content === "inSeat") {
                common_vendor.Jt.update(common_vendor.o$1.CUSTOM, "isInHumanService", true);
              } else if (data.content.content === "outSeat") {
                common_vendor.Jt.update(common_vendor.o$1.CUSTOM, "isInHumanService", false);
              }
            }
          } else if ((data == null ? void 0 : data.src) === pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.TYPING_STATE) {
            if ((data == null ? void 0 : data.typingStatus) === 1) {
              common_vendor.Jt.update(common_vendor.o$1.CUSTOM, "isTyping", true);
            } else {
              common_vendor.Jt.update(common_vendor.o$1.CUSTOM, "isTyping", false);
            }
          }
        }
      });
    }
    async function onMessageListUpdated(list) {
      var _a2;
      if (!pagesAiDesk_aiDeskCustomerUniapp_index.isCustomerConversation(currentConversationID.value)) {
        return;
      }
      observer == null ? void 0 : observer.disconnect();
      messageList.value = list.filter((message) => {
        if (pagesAiDesk_aiDeskCustomerUniapp_utils_index.isThinkingMessage(message)) {
          return pagesAiDesk_aiDeskCustomerUniapp_utils_index.isThinkingMessageOverTime(message);
        }
        return !message.isDeleted && !pagesAiDesk_aiDeskCustomerUniapp_utils_index.isMessageInvisible(message);
      }).map((message) => {
        message.vueForRenderKey = `${message.ID}`;
        return message;
      });
      if (messageTarget.value) {
        scrollAndBlinkMessage(messageTarget.value);
      } else if (!isLoadingMessage.value && !(((_a2 = scrollButtonInstanceRef.value) == null ? void 0 : _a2.isScrollButtonVisible) && (newLastMessage == null ? void 0 : newLastMessage.flow) === "in")) {
        nextTick(() => {
          scrollToBottom();
        });
      }
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isEnabledMessageReadReceiptGlobal()) {
        nextTick(() => bindIntersectionObserver());
      }
    }
    async function scrollToLatestMessage() {
      var _a2;
      try {
        const { scrollHeight } = await common_vendor.P(
          "#messageScrollList",
          "messageList"
        );
        if (scrollHeight) {
          scrollTop.value === scrollHeight ? scrollTop.value = scrollHeight + 1 : scrollTop.value = scrollHeight;
        } else {
          scrollToBottom();
        }
      } catch (error) {
        scrollToBottom();
      }
      (_a2 = scrollButtonInstanceRef.value) == null ? void 0 : _a2.hideScrollButton();
    }
    async function onMessageSourceUpdated(message) {
      messageTarget.value = message;
      scrollAndBlinkMessage(messageTarget.value);
    }
    function scrollAndBlinkMessage(message) {
      var _a2;
      if ((_a2 = messageList.value) == null ? void 0 : _a2.some(
        (messageListItem) => (messageListItem == null ? void 0 : messageListItem.ID) === (message == null ? void 0 : message.ID)
      )) {
        nextTick(async () => {
          await scrollToTargetMessage(message);
          await blinkMessage(message == null ? void 0 : message.ID);
          messageTarget.value = void 0;
        });
      }
    }
    function onChatCompletedUpdated(flag) {
      isCompleted.value = flag;
    }
    const getHistoryMessageList = () => {
      var _a2, _b;
      isLoadingMessage.value = true;
      const currentFirstMessageID = ((_b = (_a2 = messageList.value) == null ? void 0 : _a2[0]) == null ? void 0 : _b.ID) || "";
      common_vendor.Qt.getMessageList().then(() => {
        nextTick(() => {
          historyFirstMessageID.value = currentFirstMessageID;
          const timer2 = setTimeout(() => {
            historyFirstMessageID.value = "";
            isLoadingMessage.value = false;
            clearTimeout(timer2);
          }, 500);
        });
      });
    };
    const handleToggleMessageItem = (e, message, index, isLongpress = false) => {
      if (isLongpress) {
        isLongpressing.value = true;
      }
      toggleID.value = message.ID;
    };
    let timer;
    const handleH5LongPress = (e, message, index, type) => {
      if (!pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5)
        return;
      function longPressHandler() {
        clearTimeout(timer);
        handleToggleMessageItem(e, message, index, true);
      }
      function touchStartHandler() {
        timer = setTimeout(longPressHandler, 500);
      }
      function touchEndHandler() {
        clearTimeout(timer);
      }
      switch (type) {
        case "touchstart":
          touchStartHandler();
          break;
        case "touchend":
          touchEndHandler();
          setTimeout(() => {
            isLongpressing.value = false;
          }, 200);
          break;
      }
    };
    const handleEdit = (message) => {
      emits("handleEditor", message, "reedit");
    };
    const resendMessage = (message) => {
      reSendDialogShow.value = true;
      resendMessageData.value = message;
    };
    const handleImagePreview = (index) => {
      if (!messageList.value) {
        return;
      }
      const imageMessageIndex = [];
      const imageMessageList = messageList.value.filter(
        (item, index2) => {
          if (!item.isRevoked && !item.hasRiskContent && item.type === TYPES.value.MSG_IMAGE) {
            imageMessageIndex.push(index2);
            return true;
          }
          return false;
        }
      );
      common_vendor.index.previewImage({
        current: imageMessageIndex.indexOf(index),
        urls: imageMessageList.map(
          (message) => {
            var _a2;
            return (_a2 = message.payload.imageInfoArray) == null ? void 0 : _a2[2].url;
          }
        )
      });
    };
    const resendMessageConfirm = () => {
      reSendDialogShow.value = !reSendDialogShow.value;
      const messageModel = resendMessageData.value;
      messageModel.resendMessage();
    };
    function blinkMessage(messageID) {
      return new Promise((resolve) => {
        const index = blinkMessageIDList.value.indexOf(messageID);
        if (index < 0) {
          blinkMessageIDList.value.push(messageID);
          const timer2 = setTimeout(() => {
            blinkMessageIDList.value.splice(
              blinkMessageIDList.value.indexOf(messageID),
              1
            );
            clearTimeout(timer2);
            resolve();
          }, 3e3);
        }
      });
    }
    function scrollTo(scrollHeight) {
      scrollTop.value = scrollHeight;
    }
    async function bindIntersectionObserver() {
      if (!messageList.value || messageList.value.length === 0) {
        return;
      }
      observer == null ? void 0 : observer.disconnect();
      observer = common_vendor.index.createIntersectionObserver(thisInstance, {
        threshold: [0.7],
        observeAll: true
        // In Uni-app, the `safetip` is also included, so a negative margin is needed to exclude it.
      }).relativeTo("#messageScrollList", { top: -70 });
      observer == null ? void 0 : observer.observe(".message-li.in .message-bubble-container", (res) => {
        var _a2;
        if (sentReceiptMessageID.has(res.id)) {
          return;
        }
        const matchingMessage = messageList.value.find((message) => {
          return res.id.indexOf(message.ID) > -1;
        });
        if (matchingMessage && matchingMessage.needReadReceipt && matchingMessage.flow === "in" && !((_a2 = matchingMessage.readReceiptInfo) == null ? void 0 : _a2.isPeerRead)) {
          common_vendor.Qt.sendMessageReadReceipt([matchingMessage]);
          sentReceiptMessageID.add(res.id);
        }
      });
    }
    async function scrollToTargetMessage(message) {
      const targetMessageID = message.ID;
      const isTargetMessageInScreen = messageList.value && messageList.value.some((msg) => msg.ID === targetMessageID);
      if (targetMessageID && isTargetMessageInScreen) {
        const timer2 = setTimeout(async () => {
          try {
            const scrollViewRect = await common_vendor.T(
              "#messageScrollList",
              "messageList"
            );
            const originalMessageRect = await common_vendor.T(
              "#tui-" + targetMessageID,
              "messageList"
            );
            const { scrollTop: scrollTop2 } = await common_vendor.P(
              "#messageScrollList",
              "messageList"
            );
            const finalScrollTop = originalMessageRect.top + scrollTop2 - scrollViewRect.top - selfAddValue++ % 2;
            scrollTo(finalScrollTop);
            clearTimeout(timer2);
          } catch (error) {
          }
        }, 500);
      } else {
        pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_indexUniapp.Toast({
          message: common_vendor.Wt.t("TUIChat.无法定位到原消息"),
          type: pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.WARNING
        });
      }
    }
    function onMessageListBackgroundClick() {
      emits("closeInputToolBar");
    }
    function assignMessageIDInUniapp(messageID) {
      simpleMessageListRenderMessageID.value = messageID;
      isShowSimpleMessageList.value = true;
    }
    function setAudioPlayed(messageID) {
      audioPlayedMapping.value[messageID] = true;
    }
    function handleShowFormPopup(data) {
      common_vendor.index.__f__("log", "at pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/index-uniapp.vue:658", "handleshowformpopup-messagelist", data);
      emits("showFormPopup", data);
    }
    function onHeightChanged() {
      scrollToBottom();
    }
    __expose({
      scrollToLatestMessage
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(messageList).length && !common_vendor.unref(isCompleted)
      }, common_vendor.unref(messageList).length && !common_vendor.unref(isCompleted) ? {
        b: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.查看更多")),
        c: common_vendor.o(getHistoryMessageList)
      } : {}, {
        d: common_vendor.f(common_vendor.unref(messageList), (item, index, i0) => {
          return common_vendor.e({
            a: "f4b2fc8d-0-" + i0,
            b: common_vendor.p({
              currTime: item.time,
              prevTime: index > 0 ? common_vendor.unref(messageList)[index - 1].time : 0
            }),
            c: !item.isRevoked && !common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_index.isPluginMessage)(item)
          }, !item.isRevoked && !common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_index.isPluginMessage)(item) ? common_vendor.e({
            d: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_index.isThinkingMessage)(item)
          }, common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_index.isThinkingMessage)(item) ? {
            e: "f4b2fc8d-2-" + i0 + "," + ("f4b2fc8d-1-" + i0)
          } : item.type === common_vendor.unref(TYPES).MSG_TEXT ? {
            g: "f4b2fc8d-3-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            h: common_vendor.p({
              content: item.getMessageContent()
            })
          } : item.type === common_vendor.unref(TYPES).MSG_IMAGE ? {
            j: common_vendor.o(($event) => handleImagePreview(index), item.vueForRenderKey),
            k: "f4b2fc8d-5-" + i0 + "," + ("f4b2fc8d-4-" + i0),
            l: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: item
            }),
            m: "f4b2fc8d-4-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            n: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.deepCopy)(item)
            })
          } : item.type === common_vendor.unref(TYPES).MSG_VIDEO ? {
            p: "f4b2fc8d-7-" + i0 + "," + ("f4b2fc8d-6-" + i0),
            q: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: item
            }),
            r: "f4b2fc8d-6-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            s: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.deepCopy)(item)
            })
          } : item.type === common_vendor.unref(TYPES).MSG_AUDIO ? {
            v: common_vendor.o(setAudioPlayed, item.vueForRenderKey),
            w: common_vendor.o(getGlobalAudioContext, item.vueForRenderKey),
            x: "f4b2fc8d-8-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            y: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: item,
              broadcastNewAudioSrc: common_vendor.unref(broadcastNewAudioSrc)
            })
          } : item.type === common_vendor.unref(TYPES).MSG_MERGER ? {
            A: common_vendor.o(assignMessageIDInUniapp, item.vueForRenderKey),
            B: "f4b2fc8d-9-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            C: common_vendor.p({
              renderData: item.payload,
              messageItem: item
            })
          } : item.type === common_vendor.unref(TYPES).MSG_FILE ? {
            E: "f4b2fc8d-10-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            F: common_vendor.p({
              content: item.getMessageContent()
            })
          } : item.type === common_vendor.unref(TYPES).MSG_FACE ? {
            H: "f4b2fc8d-11-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            I: common_vendor.p({
              content: item.getMessageContent()
            })
          } : item.type === common_vendor.unref(TYPES).MSG_LOCATION ? {
            K: "f4b2fc8d-12-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            L: common_vendor.p({
              content: item.getMessageContent()
            })
          } : item.type === common_vendor.unref(TYPES).MSG_CUSTOM ? {
            N: "f4b2fc8d-13-" + i0 + "," + ("f4b2fc8d-1-" + i0),
            O: common_vendor.p({
              content: item.getMessageContent(),
              messageItem: item
            })
          } : {}, {
            f: item.type === common_vendor.unref(TYPES).MSG_TEXT,
            i: item.type === common_vendor.unref(TYPES).MSG_IMAGE,
            o: item.type === common_vendor.unref(TYPES).MSG_VIDEO,
            t: item.type === common_vendor.unref(TYPES).MSG_AUDIO,
            z: item.type === common_vendor.unref(TYPES).MSG_MERGER,
            D: item.type === common_vendor.unref(TYPES).MSG_FILE,
            G: item.type === common_vendor.unref(TYPES).MSG_FACE,
            J: item.type === common_vendor.unref(TYPES).MSG_LOCATION,
            M: item.type === common_vendor.unref(TYPES).MSG_CUSTOM,
            P: common_vendor.o(($event) => resendMessage(item), item.vueForRenderKey),
            Q: common_vendor.o(blinkMessage, item.vueForRenderKey),
            R: common_vendor.o(scrollTo, item.vueForRenderKey),
            S: common_vendor.o(($event) => handleToggleMessageItem($event, item, index, true), item.vueForRenderKey),
            T: common_vendor.o(($event) => handleH5LongPress($event, item, index, "touchstart"), item.vueForRenderKey),
            U: common_vendor.o(($event) => handleH5LongPress($event, item, index, "touchend"), item.vueForRenderKey),
            V: "f4b2fc8d-1-" + i0,
            W: common_vendor.p({
              messageItem: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.deepCopy)(item),
              content: item.getMessageContent(),
              isAudioPlayed: common_vendor.unref(audioPlayedMapping)[item.ID],
              blinkMessageIDList: common_vendor.unref(blinkMessageIDList)
            }),
            X: `msg-bubble-${item.ID}`
          }) : !item.isRevoked && common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_index.isPluginMessage)(item) ? {
            Z: common_vendor.o(resendMessage, item.vueForRenderKey),
            aa: common_vendor.o(handleToggleMessageItem, item.vueForRenderKey),
            ab: common_vendor.o(handleH5LongPress, item.vueForRenderKey),
            ac: common_vendor.o(handleShowFormPopup, item.vueForRenderKey),
            ad: common_vendor.o(onHeightChanged, item.vueForRenderKey),
            ae: "f4b2fc8d-14-" + i0,
            af: common_vendor.p({
              message: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_utils.deepCopy)(item)
            })
          } : {
            ag: common_vendor.o(($event) => handleEdit(item), item.vueForRenderKey),
            ah: "f4b2fc8d-15-" + i0,
            ai: common_vendor.p({
              isEdit: item.type === common_vendor.unref(TYPES).MSG_TEXT,
              messageItem: item
            })
          }, {
            Y: !item.isRevoked && common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_index.isPluginMessage)(item),
            aj: item.ID === common_vendor.unref(toggleID)
          }, item.ID === common_vendor.unref(toggleID) ? {
            ak: item.flow === "out" ? 1 : "",
            al: item.flow === "in" ? 1 : "",
            am: "f4b2fc8d-16-" + i0,
            an: common_vendor.p({
              messageItem: item
            })
          } : {}, {
            ao: common_vendor.o(($event) => toggleID.value = "", item.vueForRenderKey),
            ap: `tui-${item.ID}`,
            aq: item.vueForRenderKey,
            ar: common_vendor.n("message-li " + item.flow)
          });
        }),
        e: common_vendor.unref(scrollTop),
        f: `tui-${common_vendor.unref(historyFirstMessageID)}`,
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(handelScrollListScroll) && common_vendor.unref(handelScrollListScroll)(...args)
        ),
        h: common_vendor.sr(scrollButtonInstanceRef, "f4b2fc8d-17", {
          "k": "scrollButtonInstanceRef"
        }),
        i: common_vendor.o(scrollToLatestMessage),
        j: common_vendor.unref(reSendDialogShow)
      }, common_vendor.unref(reSendDialogShow) ? {
        k: common_vendor.t(common_vendor.unref(common_vendor.Wt).t("TUIChat.确认重发该消息？")),
        l: common_vendor.o(($event) => resendMessageConfirm()),
        m: common_vendor.o((e) => reSendDialogShow.value = e),
        n: common_vendor.p({
          show: common_vendor.unref(reSendDialogShow),
          isH5: true,
          center: true,
          isHeaderShow: false
        })
      } : {}, {
        o: common_vendor.o(($event) => isShowSimpleMessageList.value = false),
        p: common_vendor.p({
          isMounted: common_vendor.unref(isShowSimpleMessageList),
          messageID: common_vendor.unref(simpleMessageListRenderMessageID)
        }),
        q: common_vendor.p({
          visible: common_vendor.unref(isShowSimpleMessageList),
          overlayColor: "transparent",
          popDirection: "right"
        }),
        r: common_vendor.unref(pagesAiDesk_aiDeskCustomerUniapp_utils_env.isUniFrameWork) ? 1 : "",
        s: common_vendor.o(onMessageListBackgroundClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4b2fc8d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/index-uniapp.js.map
