<template>
  <view class="notification-center">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-left" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="navbar-title">消息中心</view>
      <view class="navbar-right">
        <text class="mark-all-read-btn" @tap="markAllAsRead" v-if="unreadCount > 0">全部已读</text>
        <text class="clear-btn" @tap="clearAllNotifications">清空</text>
      </view>
    </view>

    <!-- 通知列表 -->
    <view class="notification-list" v-if="notifications.length > 0">
      <view 
        v-for="notification in notifications" 
        :key="notification.id"
        :class="['notification-item', { 'unread': !notification.isRead }]"
        @tap="handleNotificationTap(notification)"
      >
        <!-- 通知图标 -->
        <view class="notification-icon">
          <text :class="getNotificationIcon(notification.type)"></text>
        </view>
        
        <!-- 通知内容 -->
        <view class="notification-content">
          <view class="notification-header">
            <text class="notification-title">{{ notification.title }}</text>
            <text class="notification-time">{{ formatTime(notification.createTime) }}</text>
          </view>
          <text class="notification-text">{{ notification.content }}</text>
          
          <!-- 通知级别标签 -->
          <view v-if="notification.level" class="notification-level">
            <text :class="getLevelClass(notification.level)">{{ getLevelText(notification.level) }}</text>
          </view>
        </view>
        
        <!-- 操作按钮 -->
        <view class="notification-actions">
          <text 
            v-if="!notification.isRead" 
            class="mark-read-btn"
            @tap.stop="markAsRead(notification.messageId)"
          >
            标记已读
          </text>
         
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <text class="empty-icon">📭</text>
      <text class="empty-title">暂无消息</text>
      <text class="empty-desc">您还没有收到任何通知消息</text>
    </view>

    <!-- 统计信息 -->
    <view class="stats-bar">
      <text class="stats-text">共 {{ notifications.length }} 条消息，{{ unreadCount }} 条未读</text>
    </view>
  </view>
</template>

<script>
import notificationService from '../../utils/notification-service.js';

export default {
  data() {
    return {
      notifications: [],
      unreadCount: 0,
      refreshTimer: null
    };
  },

  onLoad() {
    this.loadNotifications();
    this.startRefreshTimer();
  },

  onShow() {
    this.loadNotifications();
  },

  onUnload() {
    this.stopRefreshTimer();
  },

  methods: {
    // 加载通知列表
    loadNotifications() {
      try {
        // 只显示唯一的messageId的通知
        const all = notificationService.getNotifications();
        const unique = [];
        const seen = new Set();
        for (const n of all) {
          if (!seen.has(n.messageId)) {
            unique.push(n);
            seen.add(n.messageId);
          }
        }
        this.notifications = unique;
        this.unreadCount = unique.filter(n => !n.isRead).length;
      } catch (error) {
        console.error('[NotificationCenter] 加载通知失败:', error);
      }
    },

    // 开始刷新定时器
    startRefreshTimer() {
      this.refreshTimer = setInterval(() => {
        this.loadNotifications();
      }, 3000); // 每3秒刷新一次
    },

    // 停止刷新定时器
    stopRefreshTimer() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
      }
    },

    // 返回上一页
    goBack() {
      uni.navigateBack();
    },

    // 处理通知点击
    handleNotificationTap(notification) {
      // 标记为已读
      if (!notification.isRead) {
        this.markAsRead(notification.messageId);
      }

      // 根据通知类型执行不同操作
      switch (notification.type) {
        case 'CALL':
          this.handleCallNotification(notification);
          break;
        case 'POLICY':
          this.handlePolicyNotification(notification);
          break;
        case 'SYSTEM':
          this.handleSystemNotification(notification);
          break;
        default:
          // 显示通知详情
          this.showNotificationDetail(notification);
      }
    },

    // 标记为已读
    async markAsRead(messageId) {
      try {
        await notificationService.markAsRead(messageId);
        this.loadNotifications();
        console.log('[NotificationCenter] 标记已读成功:', messageId);
      } catch (error) {
        console.error('[NotificationCenter] 标记已读失败:', error);
        uni.showToast({
          title: '标记已读失败',
          icon: 'none'
        });
      }
    },

    // 删除通知
    deleteNotification(messageId) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这条通知吗？',
        success: (res) => {
          if (res.confirm) {
            try {
              // 这里可以调用后端API删除通知
              // 暂时从前端列表中移除
              this.notifications = this.notifications.filter(n => n.messageId !== messageId);
              this.loadNotifications();
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
            } catch (error) {
              console.error('[NotificationCenter] 删除通知失败:', error);
              uni.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },

    // 清空所有通知
    clearAllNotifications() {
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有通知吗？此操作不可恢复。',
        success: (res) => {
          if (res.confirm) {
            try {
              notificationService.clearNotifications();
              this.loadNotifications();
              uni.showToast({
                title: '清空成功',
                icon: 'success'
              });
            } catch (error) {
              console.error('[NotificationCenter] 清空通知失败:', error);
              uni.showToast({
                title: '清空失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },

    // 处理通话通知
    handleCallNotification(notification) {
      const extraData = notification.extraData ? JSON.parse(notification.extraData) : {};
      uni.navigateTo({
        url: `/pages/video-call/caller?roomId=${extraData.roomId || ''}`
      });
    },

    // 处理政策通知
    handlePolicyNotification(notification) {
      uni.navigateTo({
        url: `/pages/policy/detail?id=${notification.messageId}`
      });
    },

    // 处理系统通知
    handleSystemNotification(notification) {
      this.showNotificationDetail(notification);
    },

    // 显示通知详情
    showNotificationDetail(notification) {
      uni.showModal({
        title: notification.title,
        content: notification.content,
        showCancel: false,
        confirmText: '知道了'
      });
    },

    // 获取通知图标
    getNotificationIcon(type) {
      const iconMap = {
        'SYSTEM': '🔔',
        'CALL': '📞',
        'EMAIL': '📧',
        'USER': '👤',
        'POLICY': '📋',
        'FAQ': '❓'
      };
      return iconMap[type] || '📢';
    },

    // 获取级别样式类
    getLevelClass(level) {
      const classMap = {
        'URGENT': 'level-urgent',
        'HIGH': 'level-high',
        'NORMAL': 'level-normal',
        'LOW': 'level-low'
      };
      return classMap[level] || 'level-normal';
    },

    // 获取级别文本
    getLevelText(level) {
      const textMap = {
        'URGENT': '紧急',
        'HIGH': '重要',
        'NORMAL': '普通',
        'LOW': '低优先级'
      };
      return textMap[level] || '普通';
    },

    // 格式化时间
    formatTime(timeStr) {
      if (!timeStr) return '';
      
      const date = new Date(timeStr);
      const now = new Date();
      const diff = now - date;
      
      // 小于1分钟
      if (diff < 60000) {
        return '刚刚';
      }
      // 小于1小时
      if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟前`;
      }
      // 小于24小时
      if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时前`;
      }
      // 小于7天
      if (diff < 604800000) {
        return `${Math.floor(diff / 86400000)}天前`;
      }
      // 超过7天显示具体日期
      return date.toLocaleDateString();
    },

    // 标记所有为已读
    async markAllAsRead() {
      try {
        await notificationService.markAllAsRead();
        this.loadNotifications();
        console.log('[NotificationCenter] 标记所有为已读成功');
      } catch (error) {
        console.error('[NotificationCenter] 标记所有为已读失败:', error);
        uni.showToast({
          title: '标记所有为已读失败',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style>
.notification-center {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 120rpx;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
}

.navbar-left {
  width: 80rpx;
  display: flex;
  align-items: center;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
  font-weight: bold;
}

.navbar-title {
  flex: 1;
  text-align: center;
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.navbar-right {
  width: 160rpx;
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.mark-all-read-btn {
  font-size: 28rpx;
  color: #4caf50;
}

.clear-btn {
  font-size: 28rpx;
  color: #f44336;
}

/* 通知列表 */
.notification-list {
  padding: 20rpx;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 30rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.notification-item.unread {
  background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
  border-left: 6rpx solid #1a237e;
}

.notification-item:active {
  transform: scale(0.98);
}

/* 通知图标 */
.notification-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
  margin-right: 20rpx;
  font-size: 36rpx;
}

/* 通知内容 */
.notification-content {
  flex: 1;
  margin-right: 20rpx;
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.notification-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.notification-time {
  font-size: 24rpx;
  color: #999;
}

.notification-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 10rpx;
}

/* 通知级别 */
.notification-level {
  margin-top: 10rpx;
}

.level-urgent {
  background: #f44336;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
}

.level-high {
  background: #ff9800;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
}

.level-normal {
  background: #2196f3;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
}

.level-low {
  background: #9e9e9e;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
}

/* 操作按钮 */
.notification-actions {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.mark-read-btn,
.delete-btn {
  font-size: 24rpx;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  text-align: center;
}

.mark-read-btn {
  background: #4caf50;
  color: #fff;
}

.delete-btn {
  background: #f44336;
  color: #fff;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 40rpx;
  text-align: center;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
}

.empty-title {
  font-size: 36rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: #999;
}

/* 统计栏 */
.stats-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stats-text {
  font-size: 24rpx;
  color: #666;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .notification-center {
    background-color: #121212;
  }
  
  .navbar {
    background: rgba(30, 30, 30, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .back-icon,
  .navbar-title {
    color: #e0e0e0;
  }
  
  .notification-item {
    background: #1e1e1e;
  }
  
  .notification-item.unread {
    background: linear-gradient(135deg, #1e1e1e 0%, #1a1a2e 100%);
  }
  
  .notification-icon {
    background: #2d2d2d;
  }
  
  .notification-title {
    color: #e0e0e0;
  }
  
  .notification-text {
    color: #ccc;
  }
  
  .empty-title {
    color: #e0e0e0;
  }
  
  .stats-bar {
    background: rgba(30, 30, 30, 0.95);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
  
  .stats-text {
    color: #ccc;
  }
}
</style> 