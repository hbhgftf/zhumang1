<template>
	<div>
		<div v-if="!finishSubmit && props.payload.nodeStatus == 0" class="before-form">
      <Icon :src="iconForm" width="60px" height="60px" style="margin:5px 4px"/>
      <div class="form-button" @click="clickShowDialog">
        {{TUITranslateService.t("AIDesk.立即填写")}}
      </div>
		</div>
		<div class="edit-form">
      <div class="edit-form-item">
        <FormPopup
          class="form-item"
          :show="showDialog"
          :showHeaderCloseButton="false"
          @onClose="closeDialog"
          title=""
        >
          <div style="height:100%;overflow-y: auto;">
            <div class="dialog-title">
              <div>
                {{ props.payload.content.tip }}
              </div>
                <div @click="closeDialog">
                  <Icon :src="iconClose" width="16px" height="16px"/>
                </div>
            </div>
            <div
              v-for="(item, index) in props.payload.content.inputVariables"
              :key="index"
            >
              <div v-if="!finishSubmit && item.formType == 0 && props.payload.nodeStatus == 0">
                <InputMobile :placeholder="item.placeholder" :variableValue="item.variableValue" :name="item.name" :isRequired="item.isRequired" @input-change="handleInputChange" :validator="item.isRequired == 1 && isValid(item.name)"/>
              </div>
              <div v-else-if="!finishSubmit && item.formType == 1 && props.payload.nodeStatus == 0">
                <RadioMobile :chooseItemList="item.chooseItemList" :name="item.name" :isRequired="item.isRequired" @input-change="handleInputChange" :validator="item.isRequired == 1 && isValid(item.name)"/>
              </div>
              <div v-else class="variable-value-container-mobile">
                <div style="width:70px">
                  {{ item.name }}
                </div>
                <div>
                 {{ item.variableValue == '' ||  item.variableValue == null ? mapValue[item.name] : item.variableValue}}
                </div>
              </div>
            </div>
            <div class="button-container" v-if="!finishSubmit && props.payload.nodeStatus == 0">
              <div class="button" @click="handleSendForm">
                {{ TUITranslateService.t("AIDesk.提交") }}
              </div>
            </div>
          </div>
        </FormPopup>
      </div>
		</div>
		<div v-if="finishSubmit || props.payload.nodeStatus != 0" class="before-form">
      <div class="icon-container">
        <Icon class="form-icon" :src="iconForm" width="60px" height="60px" style="margin:5px 4px"/>
        <Icon v-if="finishSubmit || props.payload.nodeStatus == 2" class="form-icon-check" width="26px" height="26px" :src="iconFormFilled"/>
      </div>
      <div class="form-button" @click="clickShowDialog">
        {{ TUITranslateService.t("AIDesk.查看内容") }}
      </div>
		</div>
	</div>

</template>
<script lang="ts">
import vue from '../../../../../../../adapter-vue';
import { customerServicePayloadType } from '../../../../../../../interface';
import iconForm from '../../../../../../../assets/icon_form.png';
import iconFormFilled from '../../../../../../../assets/icon_form_filled.png';
import iconClose from '../../../../../../../assets/dialog-close.png';
import Icon from '../customer-icon.vue';
import InputMobile from './component-mobile/input-mobile.vue';
import RadioMobile from './component-mobile/radios-mobile.vue';
import LabelMobile from './component-mobile/label-mobile.vue';
import FormPopup from './component-mobile/form-popup.vue';
import { CUSTOM_MESSAGE_SRC } from '../../../../../../../constant';
import {TUITranslateService} from '@tencentcloud/chat-uikit-engine';

const { ref , onMounted,computed} = vue;
interface Props {
  payload: customerServicePayloadType;
}
export default {
  components:{
    Icon,
    InputMobile,
    RadioMobile,
    FormPopup,
    LabelMobile
  },
  props: {
    payload: {
      type: Object as () => customerServicePayloadType,
      default: () => ({}),
    },
  },
  options:{
    styleIsolation: 'apply-shared'
  },
  emits: ['sendMessage','showFormPopup'],
  setup(props: Props, { emit }) {
    const showDialog = ref<boolean>(false);
    const mapValue=ref({});
    const isSubmit = ref<boolean>(false);
    const finishSubmit = ref<boolean>(false);
    const hasNullValue = ref<boolean>(true);
    onMounted(()=>{
      let inputVariables = props.payload.content.inputVariables ?? [];
      for(let i=0;i<inputVariables.length;i++){
          const name = inputVariables[i].name;
          const variableValue = inputVariables[i].variableValue;
          mapValue.value[name]=variableValue;
      }

    });
    const clickShowDialog = ()=>{
        showDialog.value = true;
        emit('showFormPopup',true);
    }

    const closeDialog=()=>{
        showDialog.value = false;
        emit('showFormPopup',false);
    }

    const checkValidator = (name:string) => {
        hasNullValue.value = false;
        if(isSubmit.value == true){
            if(mapValue.value[name] == null || mapValue.value[name] == ''){
                hasNullValue.value = true;
                return true;

            }
        }
        return false;
    }

    const isValid = (name:string) => {
        return isSubmit.value && (mapValue.value[name] == null || mapValue.value[name] == '' || mapValue.value[name] == undefined)
    }

    const handleSendForm = (data: any) => {
        isSubmit.value = true;
        let list = props.payload.content.inputVariables;
        for(let i=0;i<list.length;i++){
            let value = mapValue.value[list[i].name];
            if(value !='' && value != null){
                list[i].variableValue = value;
            }else {
                if(list[i].isRequired === 1  && checkValidator(list[i].name)){
                    return;
                }
            }
        }
        const submitData = {
            data: JSON.stringify({
                src: CUSTOM_MESSAGE_SRC.MULTI_FORM,
                content: {
		            inputVariables: list
	            },
                customerServicePlugin: 0,
        }),
        };
        emit('sendMessage', submitData);
        finishSubmit.value = true;
        isSubmit.value = false;
    };
    const handleInputChange = ({name,value}) =>{
        mapValue.value[name] = value;
    }

    const showValue = (name:string,variableValue:string) => {
        if(variableValue != null && variableValue != ''){
                return variableValue
        }
        return mapValue.value[name];
    }
    return {
      props,
      iconForm,
      iconFormFilled,
      showDialog,
      clickShowDialog,
      iconClose,
      checkValidator,
      finishSubmit,
      showValue,
      mapValue,
      isSubmit,
      handleInputChange,
      handleSendForm,
      closeDialog,
      isValid,
      TUITranslateService
    }
  }
}
</script>
<style lang="scss">
@import "../styles/common.scss";
.before-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .form-button {
    display: flex;
    justify-content: center;
    width: 66px;
    padding: 6px 10px;
    background-color: #1c66e5;
    color: white;
    border-radius: 20px;
  }
  .icon-container {
    position:relative;
    .form-icon-check {
      position: absolute;
      right: 15px;
      bottom: 6px;
    }
  }
}

.edit-form {
  flex:1;
  @include flex(column,flex-start,stretch);
  .edit-form-item {
    @include flex(row, flex-start, center);
    // min-height: 54px;
    .form-item {
      @include flex(row, flex-start, stretch);
      flex: none;
      .form-item-input {
        padding: 14px 10px;
        font-size: 16px;
        border: 0px;
        background-color: rgba(248, 248, 248, 1);
      }
    }
  }
}

.dialog-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  .dialog-close {
    color: rgba(153,153,153,1);
  }
}
.variable-value-container-mobile {
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
}
.button-container {
  display: flex;
  justify-content: center;
  margin: 15px;
  .button {
    display:flex;
    justify-content: center;
    width: 87px;
    padding: 6px 10px;
    background-color: #1c66e5;
    color: white;
    border-radius: 20px;
  }
}
</style>
