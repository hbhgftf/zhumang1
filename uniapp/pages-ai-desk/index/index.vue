<template>
  <view class="chat-container">
    <text v-if="!isLogin">正在登录聊天系统...</text>
    <TUIKit
      v-if="isLogin"
      :config="simpleConfig"
      :userID="userID"
      :userSig="userSig"
      @onMessageReceived="onMessageReceived"
      @onConversationListUpdated="onConversationListUpdated"
      @onError="onError"
    />
  </view>
</template>

<script>
import TUIKit from '../ai-desk-customer-uniapp/components/CustomerServiceChat/index-uniapp.vue';
import TUICustomerServer from '../ai-desk-customer-uniapp/index';
import config from '../../config.js';

export default {
  components: {
    TUIKit 
  },
  data() {
    return {
      isLogin: false,
      userID: '',
      userSig: '',
      simpleConfig: {
        sdkAppID: 0, // 将从后端获取
        groupID: '61625', // 添加客服群组ID
      }
    };
  },
  methods: {
    // 收到新消息时的回调
    onMessageReceived(message) {
      console.log('收到新消息:', message);
      // 震动提醒
      uni.vibrateShort();

      // 播放提示音
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = '/static/notification.mp3';
      innerAudioContext.play();
    },

    // 会话列表更新时的回调
    onConversationListUpdated(conversationList) {
      console.log('会话列表更新:', conversationList);
    },

    // 错误处理
    onError(error) {
      console.error('TUIKit错误:', error);
      uni.showToast({
        title: '连接异常，请稍后重试',
        icon: 'none',
        duration: 2000
      });
    },

    // 登录到TUICallKit获取userSig
    async loginToTUICallKit() {
      const token = uni.getStorageSync('token');
      if (!token) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      
      try {
        const res = await uni.request({
          url: `${config.baseUrl}/user/userSig`,
          method: 'GET',
          header: { 'Authorization': `Bearer ${token}` },
          data: { userID: '' } 
        });
        
        if ((res[1] && res[1].statusCode === 200 && res[1].data.code === 200) || 
            (res.statusCode === 200 && res.data.code === 200)) {
          
          const data = res[1] ? res[1].data.data : res.data.data;
          const userSig = data.userSig;
          const userID = data.userId; 
          
          if (!userSig || !userID) {
            throw new Error('UserSig或userID为空');
          }
          
          this.userSig = userSig;
          this.userID = userID;
          this.simpleConfig.sdkAppID = data.sdkAppID || 1600094381; // 使用后端返回的SDKAppID或默认值
          
          // 初始化TUICustomerServer
          TUICustomerServer.initWithProfile({
            SDKAppID: this.simpleConfig.sdkAppID,
            userID: this.userID,
            userSig: this.userSig,
          });
          
          this.isLogin = true;
          console.log('[AI-Desk] 登录成功，用户ID:', this.userID);
          
        } else {
          this.isLogin = false;
          const errorMsg = res[1] ? res[1].data.message : res.data.message;
          console.error('[AI-Desk] 获取UserSig失败:', errorMsg);
          uni.showToast({ title: '获取UserSig失败: ' + errorMsg, icon: 'none' });
        }
      } catch (err) {
        this.isLogin = false;
        console.error('[AI-Desk] 获取UserSig异常:', err);
        uni.showToast({ title: '获取UserSig失败', icon: 'none' });
      }
    }
  },
  onLoad() {
    // 获取登录用户信息
    const userInfo = uni.getStorageSync('userInfo');
    if (!userInfo || !userInfo.id) {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
      return;
    }
    
    // 登录到TUICallKit获取userSig
    this.loginToTUICallKit();

    // 检查网络状态
    uni.getNetworkType({
      success: (res) => {
        if (res.networkType === 'none') {
          uni.showToast({
            title: '网络连接已断开',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },
  onUnload() {
    // 页面卸载时的清理工作
    console.log('聊天页面已卸载');
  }
};
</script>

<style>
.chat-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

/* 自定义样式 */
:deep(.tui-chat-input) {
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
}

:deep(.tui-message-list) {
  background-color: #f5f5f5;
  padding: 10rpx;
}

:deep(.tui-message-item) {
  margin: 10rpx 0;
}

:deep(.tui-message-content) {
  max-width: 70%;
  border-radius: 8rpx;
}

:deep(.tui-message-sender) {
  font-size: 24rpx;
  color: #999;
}

:deep(.tui-message-time) {
  font-size: 24rpx;
  color: #999;
}

:deep(.tui-message-status) {
  font-size: 24rpx;
  color: #999;
}

/* 客服相关样式 */
:deep(.tui-customer-service) {
  background-color: #ffffff;
  border-radius: 8rpx;
  padding: 20rpx;
  margin: 10rpx;
}

:deep(.tui-customer-service-title) {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

:deep(.tui-customer-service-content) {
  font-size: 26rpx;
  color: #666;
  margin-top: 10rpx;
}
</style> 