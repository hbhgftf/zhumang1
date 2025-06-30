<template>
  <div class="form-container" v-if="!isShowForm && !isFinish">
      <Icon :src="iconForm" width="65px" height="65px"/>

    <div class="right-container">
      <div class="card-title">
        {{ props.title }}
      </div>
      <div class="form-button" @click="showForm">
        {{ TUITranslateService.t("AIDesk.立即填写") }}
      </div>
    </div>

  </div>
  <div class="form-input-container" v-else-if="isShowForm && !isFinish">
    <div class="card-title">
      <!-- {{ props.title }} -->
        title
    </div>
    <div class="form-input-box">
      <div class="form-input-line">
        <div class="form-label">
          <span class="required-icon" v-if="true" >{{'*'}}</span>
          <label>label</label>
        </div>
        <input
          v-model="text"
          class="form-input"
          placeholder="TUITranslateService.t('AIDesk.请输入内容')"
        >
      </div>
    </div>
  </div>
  <div class="form-finish-container" v-else-if="isFinish">
    <div class="card-title">
      <div>
        {{ props.title }}
      </div>
      <div class="form-finish-title-right">
        <Icon :src="iconSucess" style="margin:0px 4px"/>
        {{ TUITranslateService.t("AIDesk.已提交") }}
      </div>
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import vue from '../../../../../../../adapter-vue';
import iconForm from '../../../../../../../assets/icon_form.png';
import Icon from '../customer-icon.vue';
import iconSucess from '../../../../../../../assets/icon_success.png';
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';
const { computed, ref} = vue;

interface Props {
  title: string;
}
export default {
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['input-submit'],
  setup(props: Props, { emit }) {
    const disabled = ref<boolean>(false);
    const text = ref<string>('');
    const isShowForm = ref<boolean>(false);
    const isFinish  = ref<boolean>(false);

    const listItemClick = (): void => {
      disabled.value = true;
      isShowForm.value = false;
      isFinish.value = true;
      // emit('input-submit', text.value);
    };

    const showForm = (): void => {
      isShowForm.value = true;
    }

    return {
      disabled,
      text,
      listItemClick,
      props,
      iconForm,
      isShowForm,
      showForm,
      iconSucess,
      isFinish,
      TUITranslateService
    };
  },
};
</script>
<style lang="scss">
.form-container {
  display:flex;
  .right-container {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .form-button {
      background-color: #1c66e5;
      color:#ffffff;
      padding:2px 12px;
      border-radius: 12px;
    }
  }
}
.form-input-container {
  .card-title {
    font-size:14px;
    margin-bottom: 8px;
  }

  .form-input-box {
    button:disabled {
      background: #d8d8d8;
    }
    .form-input-line {
      display:flex;
      margin-bottom: 10px;
    }
    .form-label {
      align-self: center;
      display:flex;
      width:66px;
      label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .required-icon {
        color: #e54545;
        font-size: 16px;
      }
    }
    .form-input {
      flex:1;
      margin-left:10px;
      height: 27px;
      border-radius: 8px;
      border: 0px;
    }
    .form-input-radio {
      margin-left:10px;
      display:flex;
      align-items: center;
      flex-flow: wrap;
      label {
        margin-right: 5px;
      }

      .form-radio {
        margin:0px 5px 0px 0px;
      }
    }
  }

  .form-button {
    position: relative;
    height: 40px;
    width: 42px;
    font-size: 16px;
    border-radius: 0 8px 8px 0;
    border: 0 rgba(221, 221, 221, 1) solid;
    background: #006eff;
    color: white;
    cursor: pointer;
  }

  .form-button::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    right: 40%;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(0, -50%) rotate(-135deg);
  }
}

.form-finish-container {
    .card-title {
      display:flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .form-finish-title-right {
      display:flex;
    }
  }
  input[type="radio"] {
    +label {
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      &::before {
        content: "";
        position: absolute;
        left: -20px;
        top:2px;
        border-radius: 50%;
        // border: 1px solid #6f686a;
        width: 16px;
        height: 16px;
        background-image: url('../../../../../../../assets/radio-uncheck.png');
        background-size: cover;
        background-position: center;
    }
    &::after {
      content: "";
      position: absolute;
      left: -20px;
      top: 2px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      }
  }
  &:checked {
    + label::after {
      background-image: url('../../../../../../../assets/radio-check.png');
      background-size: cover;
    }
  }
}



</style>
