<template>
  <view class="notification-test">
    <view class="test-header">
      <text class="test-title">通知API测试</text>
    </view>

    <view class="test-section">
      <text class="section-title">API连接测试</text>
      <button class="test-btn" @tap="testApiConnection">测试API连接</button>
      <text class="test-result">{{ apiTestResult }}</text>
    </view>

    <view class="test-section">
      <text class="section-title">标记已读测试</text>
      <input class="test-input" v-model="testMessageId" placeholder="输入通知ID" />
      <button class="test-btn" @tap="testMarkAsRead">测试标记已读</button>
      <text class="test-result">{{ markAsReadResult }}</text>
    </view>

    <view class="test-section">
      <text class="section-title">当前通知列表</text>
      <view class="notification-list">
        <view 
          v-for="notification in notifications" 
          :key="notification.messageId"
          class="notification-item"
        >
          <text class="notification-id">ID: {{ notification.messageId }}</text>
          <text class="notification-title">{{ notification.title }}</text>
          <text class="notification-status" :class="{ 'unread': !notification.isRead }">
            {{ notification.isRead ? '已读' : '未读' }}
          </text>
        </view>
      </view>
    </view>

    <view class="test-section">
      <text class="section-title">操作</text>
      <button class="test-btn" @tap="refreshNotifications">刷新通知列表</button>
      <button class="test-btn" @tap="markAllAsRead">标记所有为已读</button>
    </view>
  </view>
</template>

<script>
import notificationService from '../../utils/notification-service.js';

export default {
  data() {
    return {
      apiTestResult: '',
      markAsReadResult: '',
      testMessageId: '',
      notifications: []
    };
  },

  onLoad() {
    this.refreshNotifications();
  },

  methods: {
    // 测试API连接
    async testApiConnection() {
      this.apiTestResult = '测试中...';
      try {
        const result = await notificationService.testApiConnection();
        this.apiTestResult = result ? '✅ API连接正常' : '❌ API连接失败';
      } catch (error) {
        this.apiTestResult = `❌ 测试失败: ${error.message}`;
      }
    },

    // 测试标记已读
    async testMarkAsRead() {
      if (!this.testMessageId) {
        this.markAsReadResult = '请输入通知ID';
        return;
      }

      this.markAsReadResult = '测试中...';
      try {
        await notificationService.markAsRead(this.testMessageId);
        this.markAsReadResult = '✅ 标记已读成功';
        this.refreshNotifications();
      } catch (error) {
        this.markAsReadResult = `❌ 标记已读失败: ${error.message}`;
      }
    },

    // 刷新通知列表
    refreshNotifications() {
      this.notifications = notificationService.getNotifications();
    },

    // 标记所有为已读
    async markAllAsRead() {
      try {
        await notificationService.markAllAsRead();
        this.refreshNotifications();
        uni.showToast({
          title: '标记所有为已读成功',
          icon: 'success'
        });
      } catch (error) {
        uni.showToast({
          title: '标记所有为已读失败',
          icon: 'none'
        });
      }
    },

    markAsReadLocal(messageId) {
      this.notifications.forEach(n => {
        if (n.messageId === messageId) n.isRead = true;
      });
      this.updateUnreadCount();
    }
  }
};
</script>

<style>
.notification-test {
  padding: 40rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.test-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.test-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.test-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.test-btn {
  background: #1976d2;
  color: #fff;
  border-radius: 8rpx;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  margin: 10rpx 0;
  width: 100%;
}

.test-input {
  width: 100%;
  padding: 20rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.test-result {
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}

.notification-list {
  max-height: 400rpx;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
  gap: 20rpx;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-id {
  font-size: 24rpx;
  color: #999;
  min-width: 120rpx;
}

.notification-title {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.notification-status {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  background: #4caf50;
  color: #fff;
}

.notification-status.unread {
  background: #ff9800;
}
</style> 