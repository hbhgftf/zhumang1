"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_adapterVue = require("../../../../../../../adapter-vue.js");
const common_assets = require("../../../../../../../../../common/assets.js");
const pagesAiDesk_aiDeskCustomerUniapp_constant = require("../../../../../../../constant.js");
const common_vendor = require("../../../../../../../../../common/vendor.js");
const Icon = () => "../customer-icon.js";
const InputMobile = () => "./component-mobile/input-mobile.js";
const RadioMobile = () => "./component-mobile/radios-mobile.js";
const LabelMobile = () => "./component-mobile/label-mobile.js";
const FormPopup = () => "./component-mobile/form-popup.js";
const { ref, onMounted, computed } = pagesAiDesk_aiDeskCustomerUniapp_adapterVue.vue;
const _sfc_main = {
  components: {
    Icon,
    InputMobile,
    RadioMobile,
    FormPopup,
    LabelMobile
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  options: {
    styleIsolation: "apply-shared"
  },
  emits: ["sendMessage", "showFormPopup"],
  setup(props, { emit }) {
    const showDialog = ref(false);
    const mapValue = ref({});
    const isSubmit = ref(false);
    const finishSubmit = ref(false);
    const hasNullValue = ref(true);
    onMounted(() => {
      let inputVariables = props.payload.content.inputVariables ?? [];
      for (let i = 0; i < inputVariables.length; i++) {
        const name = inputVariables[i].name;
        const variableValue = inputVariables[i].variableValue;
        mapValue.value[name] = variableValue;
      }
    });
    const clickShowDialog = () => {
      showDialog.value = true;
      emit("showFormPopup", true);
    };
    const closeDialog = () => {
      showDialog.value = false;
      emit("showFormPopup", false);
    };
    const checkValidator = (name) => {
      hasNullValue.value = false;
      if (isSubmit.value == true) {
        if (mapValue.value[name] == null || mapValue.value[name] == "") {
          hasNullValue.value = true;
          return true;
        }
      }
      return false;
    };
    const isValid = (name) => {
      return isSubmit.value && (mapValue.value[name] == null || mapValue.value[name] == "" || mapValue.value[name] == void 0);
    };
    const handleSendForm = (data) => {
      isSubmit.value = true;
      let list = props.payload.content.inputVariables;
      for (let i = 0; i < list.length; i++) {
        let value = mapValue.value[list[i].name];
        if (value != "" && value != null) {
          list[i].variableValue = value;
        } else {
          if (list[i].isRequired === 1 && checkValidator(list[i].name)) {
            return;
          }
        }
      }
      const submitData = {
        data: JSON.stringify({
          src: pagesAiDesk_aiDeskCustomerUniapp_constant.CUSTOM_MESSAGE_SRC.MULTI_FORM,
          content: {
            inputVariables: list
          },
          customerServicePlugin: 0
        })
      };
      emit("sendMessage", submitData);
      finishSubmit.value = true;
      isSubmit.value = false;
    };
    const handleInputChange = ({ name, value }) => {
      mapValue.value[name] = value;
    };
    const showValue = (name, variableValue) => {
      if (variableValue != null && variableValue != "") {
        return variableValue;
      }
      return mapValue.value[name];
    };
    return {
      props,
      iconForm: common_assets.iconForm,
      iconFormFilled: common_assets.iconFormFilled,
      showDialog,
      clickShowDialog,
      iconClose: common_assets.iconClose,
      checkValidator,
      finishSubmit,
      showValue,
      mapValue,
      isSubmit,
      handleInputChange,
      handleSendForm,
      closeDialog,
      isValid,
      TUITranslateService: common_vendor.Wt
    };
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  const _component_InputMobile = common_vendor.resolveComponent("InputMobile");
  const _component_RadioMobile = common_vendor.resolveComponent("RadioMobile");
  const _component_FormPopup = common_vendor.resolveComponent("FormPopup");
  (_component_Icon + _component_InputMobile + _component_RadioMobile + _component_FormPopup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$setup.finishSubmit && $setup.props.payload.nodeStatus == 0
  }, !$setup.finishSubmit && $setup.props.payload.nodeStatus == 0 ? {
    b: common_vendor.p({
      src: $setup.iconForm,
      width: "60px",
      height: "60px"
    }),
    c: common_vendor.t($setup.TUITranslateService.t("AIDesk.立即填写")),
    d: common_vendor.o((...args) => $setup.clickShowDialog && $setup.clickShowDialog(...args))
  } : {}, {
    e: common_vendor.t($setup.props.payload.content.tip),
    f: common_vendor.p({
      src: $setup.iconClose,
      width: "16px",
      height: "16px"
    }),
    g: common_vendor.o((...args) => $setup.closeDialog && $setup.closeDialog(...args)),
    h: common_vendor.f($setup.props.payload.content.inputVariables, (item, index, i0) => {
      return common_vendor.e({
        a: !$setup.finishSubmit && item.formType == 0 && $setup.props.payload.nodeStatus == 0
      }, !$setup.finishSubmit && item.formType == 0 && $setup.props.payload.nodeStatus == 0 ? {
        b: common_vendor.o($setup.handleInputChange, index),
        c: "19c7508c-3-" + i0 + ",19c7508c-1",
        d: common_vendor.p({
          placeholder: item.placeholder,
          variableValue: item.variableValue,
          name: item.name,
          isRequired: item.isRequired,
          validator: item.isRequired == 1 && $setup.isValid(item.name)
        })
      } : !$setup.finishSubmit && item.formType == 1 && $setup.props.payload.nodeStatus == 0 ? {
        f: common_vendor.o($setup.handleInputChange, index),
        g: "19c7508c-4-" + i0 + ",19c7508c-1",
        h: common_vendor.p({
          chooseItemList: item.chooseItemList,
          name: item.name,
          isRequired: item.isRequired,
          validator: item.isRequired == 1 && $setup.isValid(item.name)
        })
      } : {
        i: common_vendor.t(item.name),
        j: common_vendor.t(item.variableValue == "" || item.variableValue == null ? $setup.mapValue[item.name] : item.variableValue)
      }, {
        e: !$setup.finishSubmit && item.formType == 1 && $setup.props.payload.nodeStatus == 0,
        k: index
      });
    }),
    i: !$setup.finishSubmit && $setup.props.payload.nodeStatus == 0
  }, !$setup.finishSubmit && $setup.props.payload.nodeStatus == 0 ? {
    j: common_vendor.t($setup.TUITranslateService.t("AIDesk.提交")),
    k: common_vendor.o((...args) => $setup.handleSendForm && $setup.handleSendForm(...args))
  } : {}, {
    l: common_vendor.o($setup.closeDialog),
    m: common_vendor.p({
      show: $setup.showDialog,
      showHeaderCloseButton: false,
      title: ""
    }),
    n: $setup.finishSubmit || $setup.props.payload.nodeStatus != 0
  }, $setup.finishSubmit || $setup.props.payload.nodeStatus != 0 ? common_vendor.e({
    o: common_vendor.p({
      src: $setup.iconForm,
      width: "60px",
      height: "60px"
    }),
    p: $setup.finishSubmit || $setup.props.payload.nodeStatus == 2
  }, $setup.finishSubmit || $setup.props.payload.nodeStatus == 2 ? {
    q: common_vendor.p({
      width: "26px",
      height: "26px",
      src: $setup.iconFormFilled
    })
  } : {}, {
    r: common_vendor.t($setup.TUITranslateService.t("AIDesk.查看内容")),
    s: common_vendor.o((...args) => $setup.clickShowDialog && $setup.clickShowDialog(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/message-multi-form/form-mobile.js.map
