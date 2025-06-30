"use strict";
const common_vendor = require("../../../../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../adapter-vue.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked = require("./marked.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_typeWriter = require("./type-writer.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_index = require("../../../../../../utils/index.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_env = require("../../../../../../utils/env.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_utils = require("../../../../../../utils/utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-stream",
  props: {
    payload: { default: () => ({}) },
    messageID: { default: "" }
  },
  emits: ["heightChanged"],
  setup(__props, { emit: __emit }) {
    const { ref, computed, withDefaults, defineProps, watch, onMounted, onUnmounted } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
    const props = __props;
    const isCursorBlinking = ref(true);
    const isStreaming = ref(false);
    const image = ref(false);
    const imageSrc = ref("");
    const chunks = ref("");
    const isFinished = ref(true);
    const prevChunksLength = ref(0);
    const streamContent = ref("");
    const displayedContent = ref("");
    const preRef = ref();
    const emits = __emit;
    const canIUseResizeObserver = typeof ResizeObserver === "undefined" ? false : true;
    const messageID = ref("");
    let observer;
    let prevHeight = 0;
    let count = 0;
    const typeWriter = new pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_typeWriter.TypeWriter({
      onTyping: (item) => {
        streamContent.value += item;
        displayedContent.value = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked.parseMarkdown(streamContent.value);
      },
      onComplete() {
        isStreaming.value = false;
      }
    });
    function startStreaming(content) {
      if (!isStreaming.value) {
        isStreaming.value = true;
        typeWriter.add(content);
        typeWriter.start();
      } else {
        typeWriter.add(content);
      }
    }
    watch(
      () => props.payload,
      (newValue, oldValue) => {
        var _a;
        if (newValue === oldValue) {
          return;
        }
        const _payloadObject = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(props.payload);
        chunks.value = Array.isArray(_payloadObject.chunks) ? _payloadObject.chunks.join("") : _payloadObject.chunks;
        isFinished.value = _payloadObject.isFinished === 1;
        if (chunks.value.length > 0) {
          isCursorBlinking.value = false;
        }
        if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isWeChat || newValue && !oldValue && isFinished.value) {
          streamContent.value = chunks.value;
          prevChunksLength.value = chunks.value.length;
          displayedContent.value = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked.parseMarkdown(streamContent.value);
        } else {
          if (chunks.value.length > prevChunksLength.value) {
            const _newChunksToAdd = (_a = chunks.value) == null ? void 0 : _a.slice(prevChunksLength.value);
            prevChunksLength.value = chunks.value.length;
            startStreaming([_newChunksToAdd]);
          }
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const onHackedMessageID = (data) => {
      if (data !== messageID.value || isFinished.value) {
        return;
      }
      const message = common_vendor.Jt.getMessageModel(data);
      if (!message) {
        return;
      }
      if (message.payload.data) {
        const obj = pagesAiDesk_aiDeskCustomerUniapp_utils_index.JSONToObject(message.payload.data);
        const chunk2String = Array.isArray(obj.chunks) ? obj.chunks.join("") : obj.chunks;
        if (chunk2String !== streamContent.value) {
          streamContent.value = chunk2String;
          prevChunksLength.value = chunk2String.length;
          displayedContent.value = pagesAiDesk_aiDeskCustomerUniapp_components_CustomerServiceChat_messageList_messageElements_messageDesk_messageDeskElements_marked.parseMarkdown(streamContent.value);
        }
        if (chunk2String.length > 0) {
          isCursorBlinking.value = false;
        }
        isFinished.value = obj.isFinished;
      }
    };
    onMounted(() => {
      messageID.value = props.messageID;
      common_vendor.Jt.watch(common_vendor.o$1.CUSTOM, {
        "hackedMessageID": onHackedMessageID
      });
      if (canIUseResizeObserver) {
        observer = new ResizeObserver((entries) => {
          for (let entry of entries) {
            observeHeightChanged(entry.contentRect.height);
          }
        });
        observer.observe(preRef.value);
      } else if (pagesAiDesk_aiDeskCustomerUniapp_utils_utils.isVue3App) {
        observer = setInterval(() => {
          const query = common_vendor.index.createSelectorQuery().in(this);
          query.selectAll(".message-stream").boundingClientRect((res) => {
            if (res.length >= 1) {
              const data = res[res.length - 1];
              observeHeightChanged(data.height);
            }
          }).exec();
        }, 100);
      }
    });
    onUnmounted(() => {
      common_vendor.Jt.unwatch(common_vendor.o$1.CUSTOM, {
        "hackedMessageID": onHackedMessageID
      });
      if (canIUseResizeObserver) {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      } else {
        clearTimer();
      }
    });
    const observeHeightChanged = (newHeight) => {
      if (prevHeight !== newHeight) {
        prevHeight = newHeight;
        emits("heightChanged");
      } else if (!canIUseResizeObserver) {
        count += 1;
        if (count >= 80) {
          clearTimer();
        }
      }
    };
    const clearTimer = () => {
      clearInterval(observer);
      prevHeight = 0;
      count = 0;
    };
    const closeImage = () => {
      image.value = !image.value;
      imageSrc.value = "";
    };
    const onPreClicked = (event) => {
      if (pagesAiDesk_aiDeskCustomerUniapp_utils_env.isPC || pagesAiDesk_aiDeskCustomerUniapp_utils_env.isH5) {
        const target = event.target;
        const tagName = event.target.tagName.toLowerCase();
        if (tagName === "img" || tagName === "image") {
          image.value = true;
          imageSrc.value = target.src;
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isCursorBlinking)
      }, common_vendor.unref(isCursorBlinking) ? {} : {}, {
        b: common_vendor.unref(displayedContent),
        c: common_vendor.o(onPreClicked),
        d: common_vendor.unref(image)
      }, common_vendor.unref(image) ? {
        e: common_vendor.unref(imageSrc),
        f: common_vendor.o(closeImage)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9ed9752"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-stream.js.map
