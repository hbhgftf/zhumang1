<template>
    <div class="label-container">
        <div>
            <Label :name="name" :is-required="isRequired"/>
        </div>
        <div class="radio-container">
            <div v-if="validator" class="validator-line">
              {{ TUITranslateService.t("AIDesk.请填写必填项") }}
            </div>
                <div class="form-radio-box-mobile" v-for="(item,index) in chooseItemList" :key="index">
                    <div class="radio-container-uni" @click="clickItem(index)">
                        <div class="radio-icon-uni">
                            <div v-if="isUniFrameWork">
                                <image :src="changeSelectedIcon(item)" alt="" style="width: 20px; height: 20px; vertical-align: middle;"/>
                            </div>
                            <div v-else>
                                <img :src="changeSelectedIcon(item)" alt="" style="width: 20px; height: 20px; vertical-align: middle;"/>
                            </div>
                        </div>
                        <div class="radio-label-uni">
                            {{ item }}
                        </div>
                    </div>
                </div>
        </div>

    </div>
</template>
<script lang="ts">
import Label from './label-mobile.vue';
import vue from '../../../../../../../../adapter-vue';
import Icon from '../../customer-icon.vue';
import radioUncheckIcon from '../../../../../../../../assets/radio-uncheck.png';
import radioCheckIcon from '../../../../../../../../assets/radio-check.png';
import { isUniFrameWork } from '../../../../../../../../utils/env';
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';

const { ref } = vue;
export default {
    components:{
        Label,
        Icon
    },
    props:{
        chooseItemList:{
            type:Array,
            default:[]
        },
        name:{
            type:String,
            default:'',
        },
        isRequired:{
            type:Number,
            default:0,
        },
        validator:{
            type:Boolean,
            default:false
        }
    },
    emits:['input-change'],
    setup(props,{emit}){
        const selectedOption = ref<string>('');
        const checkedIcon = ref<string>('');
        const changeSelectedIcon = (name:any) => {
            if(selectedOption.value === name)
                return radioCheckIcon;
            else
                return radioUncheckIcon;
        }

        const clickItem=(index:number) => {
            selectedOption.value = props.chooseItemList[index] as string;
            emit('input-change',{name:props.name,value:selectedOption.value});
        }

        const onInputChanged = ():void => {
            emit('input-change',{name:props.name,value:selectedOption.value});
        };
        return {
          onInputChanged,
          selectedOption,
          clickItem,
          isUniFrameWork,
          radioUncheckIcon,
          radioCheckIcon,
          changeSelectedIcon,
          checkedIcon,
          TUITranslateService
        }
    }
}
</script>
<style lang="scss">
.label-container{
    display:flex;
    padding:0 16px;
}
.radio-container {
    display:flex;
    flex-direction: column;
    margin-left:16px;

    width:100%;
}

.form-radio-box-mobile{
    margin-bottom: 5px;
    padding:10px 0;
    border-bottom: 1px solid #e7e7e7;
}

input[type="radio"] {
    display: none;
    +label {
      position: relative;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        left: -24px;
        top: 0px;
        border-radius: 50%;
        // border: 1px solid #6f686a;
        width: 20px;
        height: 20px;
        background-image: url('../../../../../../../../assets/radio-uncheck.png');
        background-size: cover;
        background-position: center;
    }
    &::after {
      content: "";
      position: absolute;
      left: -24px;
      top: 0px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      }
  }
  &:checked {
    + label::after {
      background-image: url('../../../../../../../../assets/radio-check.png');
      background-size: cover;
    }
  }
}

.radio-container-uni{
    display:flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    .radio-icon-uni {
        margin-right:5px;
    }
}
.validator-line {
    font-size: 12px;
    color:#e54545;
    margin-top: 3px;
}
</style>
