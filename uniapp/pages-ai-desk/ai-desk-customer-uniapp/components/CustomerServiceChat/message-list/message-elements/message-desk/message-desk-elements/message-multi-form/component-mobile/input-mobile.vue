<template>
    <div class="form-input-box-mobile">
        <LabelMobile :name="name" :is-required="isRequired" />
      <div class="form-input-line">
        <input
          class="form-input-mobile"
          v-model="text"
          :placeholder="placeholder"
          @input="onInputChanged"
        >
        <div v-if="validator" class="validator-line">
          {{ TUITranslateService.t("AIDesk.请填写必填项") }}
        </div>
      </div>

    </div>
</template>
<script lang="ts">
import vue from '../../../../../../../../adapter-vue';
import LabelMobile from './label-mobile.vue';
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';
const { computed, ref} = vue;

interface FormItem{
    name:string;
    value:string;
}

export default {
    components:{
        LabelMobile
    },
    props:{
        placeholder:{
            type:String,
            default:''
        },
        variableValue:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:'',
        },
        isRequired:{
            type:Number,
            default:0,
        },
        nodeStatus:{
            type:Number,
            default:0
        },
        validator:{
            type:Boolean,
            default:false
        }
    },
    emits:['input-change'],
    setup(props, {emit}){
        const text = ref<string>('');
        if(props.variableValue.length!=0){
            text.value = props.variableValue;
        }
        const onInputChanged = ():void => {
            emit('input-change',{name:props.name,value:text.value});
        };
        return {
          text,
          onInputChanged,
          props,
          TUITranslateService
        }
    }
}
</script>
<style lang="scss">
.form-input-box-mobile{
    display:flex;
    flex-direction: row;
    align-items: center;
    margin:0 16px;
    border-bottom:1px solid #e7e7e7;
    padding-top:5px;
}
.form-input-line {
    display:flex;
    margin-bottom: 10px;
    flex:1;
    flex-direction: column;

}
.form-input-mobile {
    border-color:transparent;
    padding:5px 8px;
    font-size:14px;
}
.validator-line {
    font-size: 12px;
    color:#e54545;
    margin-top: 3px;
}
</style>
