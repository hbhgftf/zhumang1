<template>
  <div
    :class="['file-message-montainer',messageItem.flow === 'in'?'file-in' :'']"
    :title="TUITranslateService.t('TUIChat.单击下载')"
    @click="download"
  >
    <Icon
      :file="files"
      class="file-icon"
    />
    <div>
      <div>{{ props.content.name }}</div>
      <div>{{ props.content.size }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vue from '../../../../adapter-vue';
import {
  TUITranslateService,
  IMessageModel,
} from '@tencentcloud/chat-uikit-engine';
import Icon from '../../../common/Icon.vue';
import files from '../../../../assets/files.svg';
import { isUniFrameWork,isWeChat } from '../../../../utils/env';
import type { IFileMessageContent } from '../../../../interface';
const { withDefaults } = vue;

const props = withDefaults(
  defineProps<{
    content: IFileMessageContent;
    messageItem: IMessageModel;
  }>(),
  {
    content: () => ({} as IFileMessageContent),
    messageItem: () => ({} as IMessageModel),
  },
);

const download = () => {
  if (props.messageItem.hasRiskContent || props.messageItem.flow === 'out') {
    return;
  }

  if(isWeChat){
    console.log("isWechat",props.content.url)

    wx.downloadFile({
      url: props.content.url,
      filePath: wx.env.USER_DATA_PATH + '/' + props.content.name,
      success: function (res) {
        var filePath = res.filePath;
        const lastIndex = filePath.lastIndexOf('.');
        const fileType = filePath.substring(lastIndex + 1);
        console.log(fileType)
        wx.openDocument({
          filePath: filePath,
          showMenu:true,
          fileType:fileType,
          success: function (res) {
            console.log('打开文档成功');
          },
          fail:function(){
            console.log("fail")
          }
        });
      }
    });
  }else if(isUniFrameWork){
    const lastIndex = props.content.url.lastIndexOf('.');
    const fileType = props.content.url.substring(lastIndex + 1);
    uni.downloadFile({
      url:props.content.url,
      success:function(res){
        if(res.statusCode == 200){
          console.log(res)
          const tempFilePaths = res.tempFilePath;
          uni.showToast({
            title: '下载成功'+tempFilePaths,
            icon: 'success',
            duration: 2000
          });
          console.log(tempFilePaths);
          uni.openDocument({
            filePath: tempFilePaths,
            fileType: fileType,
            success: function () {
                console.log('打开文档成功');
            },
            fail: function () {
                console.log('打开文档失败');
            }
          });
        }
      }
    });
    // uni.openDocument({
    //     filePath: tempFilePaths[0],
    //     fileType: 'pdf',
    //     success: function () {
    //         console.log('打开文档成功');
    //     },
    //     fail: function () {
    //         console.log('打开文档失败');
    //     }
    // });
  }

  else {
    console.log("no window here")
    const a = document.createElement('a');
    a.href = props.content.url;
    a.target = '_blank';
    a.download = props.content.name;
    a.click();
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/common";
.file-in{
  cursor: pointer;
}
.file-message-montainer {
  display: flex;
  flex-direction: row;


  .file-icon {
    margin: auto 8px;
  }
}
</style>
