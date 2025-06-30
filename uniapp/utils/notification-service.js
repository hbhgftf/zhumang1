import notificationManager from './notification-manager.js';
import config from '../config.js';

class NotificationService {
  constructor() {
    this.unreadCount = 0;
    this.notifications = [];
    this.isInitialized = false;
    
    // 绑定方法
    this.handleSystemNotification = this.handleSystemNotification.bind(this);
    this.handleCallNotification = this.handleCallNotification.bind(this);
    this.handleEmailNotification = this.handleEmailNotification.bind(this);
    this.handleUserNotification = this.handleUserNotification.bind(this);
    this.handlePolicyNotification = this.handlePolicyNotification.bind(this);
    this.handleFaqNotification = this.handleFaqNotification.bind(this);
    this.handleErrorNotification = this.handleErrorNotification.bind(this);
  }

  // 初始化通知服务
  init() {
    if (this.isInitialized) {
      console.log('[NotificationService] 服务已初始化');
      return;
    }

    console.log('[NotificationService] 初始化通知服务');
    
    // 注册各种消息处理器
    notificationManager.registerHandler('SYSTEM', this.handleSystemNotification);
    notificationManager.registerHandler('CALL', this.handleCallNotification);
    notificationManager.registerHandler('EMAIL', this.handleEmailNotification);
    notificationManager.registerHandler('USER', this.handleUserNotification);
    notificationManager.registerHandler('POLICY', this.handlePolicyNotification);
    notificationManager.registerHandler('FAQ', this.handleFaqNotification);
    notificationManager.registerHandler('ERROR', this.handleErrorNotification);

    // 初始化WebSocket连接
    notificationManager.init();
    
    this.isInitialized = true;
  }

  // 处理系统通知
  handleSystemNotification(message) {
    console.log('[NotificationService] 处理系统通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 根据级别显示不同的提示
    switch (message.level) {
      case 'URGENT':
        this.showUrgentNotification(message);
        break;
      case 'HIGH':
        this.showHighPriorityNotification(message);
        break;
      case 'NORMAL':
        this.showNormalNotification(message);
        break;
      case 'LOW':
        this.showLowPriorityNotification(message);
        break;
      default:
        this.showNormalNotification(message);
    }
  }

  // 处理通话通知
  handleCallNotification(message) {
    console.log('[NotificationService] 处理通话通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 播放来电铃声
    this.playCallRingtone();
    
    // 显示来电弹窗
    this.showCallNotification(message);
  }

  // 处理邮件通知
  handleEmailNotification(message) {
    console.log('[NotificationService] 处理邮件通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 显示邮件通知
    this.showEmailNotification(message);
  }

  // 处理用户通知
  handleUserNotification(message) {
    console.log('[NotificationService] 处理用户通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 显示用户通知
    this.showUserNotification(message);
  }

  // 处理政策通知
  handlePolicyNotification(message) {
    console.log('[NotificationService] 处理政策通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 显示政策通知
    this.showPolicyNotification(message);
  }

  // 处理FAQ通知
  handleFaqNotification(message) {
    console.log('[NotificationService] 处理FAQ通知:', message);
    
    this.addNotification(message);
    this.updateUnreadCount();
    
    // 显示FAQ通知
    this.showFaqNotification(message);
  }

  // 处理错误通知
  handleErrorNotification(message) {
    console.log('[NotificationService] 处理错误通知:', message);
    this.addNotification({
      ...message,
      title: '系统错误',
      level: 'HIGH',
      content: message.content || '发生错误'
    });
    this.updateUnreadCount();
    // 可选：弹窗提醒
    uni.showToast({
      title: message.content || '发生错误',
      icon: 'none'
    });
  }

  // 添加通知到列表
  addNotification(message) {
    if (this.notifications.some(n => n.messageId === message.messageId)) {
      return; // 已存在，不重复添加
    }
    const notification = {
      ...message,
      id: message.messageId || Date.now().toString(),
      timestamp: Date.now(),
      isRead: false
    };
    this.notifications.unshift(notification);
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }
  }

  // 更新未读数量
  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    
    // 触发未读数量更新事件
    this.triggerUnreadCountUpdate();
  }

  // 显示紧急通知
  showUrgentNotification(message) {
    // 震动提醒
    uni.vibrateLong();
    
    // 播放紧急提示音
    this.playUrgentSound();
    
    // 显示紧急弹窗
    uni.showModal({
      title: '⚠️ 紧急通知',
      content: message.content,
      showCancel: false,
      confirmText: '知道了',
      success: async () => {
        await this.markAsRead(message.messageId);
      }
    });
  }

  // 显示高优先级通知
  showHighPriorityNotification(message) {
    // 震动提醒
    uni.vibrateShort();
    
    // 显示高优先级弹窗
    uni.showModal({
      title: '📢 重要通知',
      content: message.content,
      showCancel: false,
      confirmText: '知道了',
      success: async () => {
        await this.markAsRead(message.messageId);
      }
    });
  }

  // 显示普通通知
  showNormalNotification(message) {
    // 显示Toast提示
    uni.showToast({
      title: message.title || message.content,
      icon: 'none',
      duration: 3000
    });
  }

  // 显示低优先级通知
  showLowPriorityNotification(message) {
    // 静默处理，只更新红点
    console.log('[NotificationService] 低优先级通知:', message.title);
  }

  // 显示通话通知
  showCallNotification(message) {
    // 解析通话信息
    let extraData = {};
    try {
      extraData = message.extraData ? JSON.parse(message.extraData) : {};
    } catch (e) {
      extraData = {};
    }
    const callerName = extraData.callerName || '未知用户';
    const roomId = extraData.roomId || '';
    
    uni.showModal({
      title: '📞 新的通话请求',
      content: `来自: ${callerName}\n房间号: ${roomId}\n${message.content || ''}`,
      confirmText: '接听',
      cancelText: '拒绝',
      success: async (res) => {
        if (res.confirm) {
          // 接听通话，跳转到通话页面
          uni.navigateTo({
            url: `/pages/video-call/caller?roomId=${roomId}`
          });
        } else {
          // 可选：拒绝通话逻辑
          // this.handleCallReject(message);
        }
        await this.markAsRead(message.messageId);
      }
    });
  }

  // 显示邮件通知
  showEmailNotification(message) {
    uni.showToast({
      title: `📧 ${message.title}`,
      icon: 'none',
      duration: 3000
    });
  }

  // 显示用户通知
  showUserNotification(message) {
    uni.showToast({
      title: `👤 ${message.title}`,
      icon: 'none',
      duration: 3000
    });
  }

  // 显示政策通知
  showPolicyNotification(message) {
    uni.showModal({
      title: '📋 政策更新',
      content: message.content,
      confirmText: '查看详情',
      cancelText: '稍后查看',
      success: async (res) => {
        if (res.confirm) {
          // 跳转到政策详情页
          uni.navigateTo({
            url: `/pages/policy/detail?id=${message.messageId}`
          });
        }
        await this.markAsRead(message.messageId);
      }
    });
  }

  // 显示FAQ通知
  showFaqNotification(message) {
    uni.showToast({
      title: `❓ ${message.title}`,
      icon: 'none',
      duration: 3000
    });
  }

  // 播放来电铃声
  playCallRingtone() {
    try {
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = '/static/call-ringtone.mp3';
      innerAudioContext.loop = true;
      innerAudioContext.play();
      
      // 5秒后停止铃声
      setTimeout(() => {
        innerAudioContext.stop();
        innerAudioContext.destroy();
      }, 5000);
    } catch (error) {
      console.error('[NotificationService] 播放来电铃声失败:', error);
    }
  }

  // 播放紧急提示音
  playUrgentSound() {
    try {
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = '/static/urgent-notification.mp3';
      innerAudioContext.play();
    } catch (error) {
      console.error('[NotificationService] 播放紧急提示音失败:', error);
    }
  }

  // 处理接听通话
  handleCallAccept(message) {
    console.log('[NotificationService] 接听通话:', message);
    // 这里可以跳转到通话页面或触发通话逻辑
    uni.navigateTo({
      url: `/pages/video-call/caller?roomId=${message.extraData?.roomId}`
    });
  }

  // 处理拒绝通话
  handleCallReject(message) {
    console.log('[NotificationService] 拒绝通话:', message);
    // 这里可以发送拒绝通话的请求
  }

  // 标记消息为已读
  async markAsRead(messageId) {
    try {
      // 获取token
      const token = uni.getStorageSync('token');
      if (!token) {
        console.warn('[NotificationService] 未找到token，仅更新前端状态');
        this.markAsReadLocal(messageId);
        return;
      }

      // 调用后端API标记为已读
      const res = await uni.request({
        url: `${config.baseUrl}/api/notification/read/${messageId}`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[NotificationService] 标记已读API响应:', res.data);

      if (res.data.code === 200 || res.statusCode === 200) {
        // API调用成功，更新前端状态
        this.markAsReadLocal(messageId);
        console.log('[NotificationService] 通知已标记为已读:', messageId);
      } else {
        // API调用失败，但仍然更新前端状态
        console.warn('[NotificationService] API标记已读失败，仅更新前端状态:', res.data.message);
        this.markAsReadLocal(messageId);
      }
    } catch (error) {
      console.error('[NotificationService] 标记已读请求失败:', error);
      // 网络错误时，仍然更新前端状态
      this.markAsReadLocal(messageId);
    }
  }

  // 本地标记为已读（不调用API）
  markAsReadLocal(messageId) {
    this.notifications.forEach(n => {
      if (n.messageId === messageId) n.isRead = true;
    });
    this.updateUnreadCount();
  }

  // 标记所有消息为已读
  async markAllAsRead() {
    try {
      // 获取token
      const token = uni.getStorageSync('token');
      if (!token) {
        console.warn('[NotificationService] 未找到token，仅更新前端状态');
        this.markAllAsReadLocal();
        return;
      }

      // 获取所有未读通知的ID
      const unreadIds = this.notifications
        .filter(n => !n.isRead)
        .map(n => n.messageId)
        .filter(Boolean);

      if (unreadIds.length === 0) {
        console.log('[NotificationService] 没有未读通知需要标记');
        return;
      }

      // 批量调用API标记为已读
      const promises = unreadIds.map(messageId => 
        uni.request({
          url: `${config.baseUrl}/api/notification/read/${messageId}`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      );

      const results = await Promise.allSettled(promises);
      
      // 统计成功和失败的数量
      const successCount = results.filter(r => r.status === 'fulfilled' && (r.value.data.code === 200 || r.value.statusCode === 200)).length;
      const failCount = results.length - successCount;

      console.log(`[NotificationService] 批量标记已读完成: 成功${successCount}个，失败${failCount}个`);

      // 无论API是否成功，都更新前端状态
      this.markAllAsReadLocal();

    } catch (error) {
      console.error('[NotificationService] 批量标记已读失败:', error);
      // 网络错误时，仍然更新前端状态
      this.markAllAsReadLocal();
    }
  }

  // 本地标记所有为已读（不调用API）
  markAllAsReadLocal() {
    this.notifications.forEach(n => n.isRead = true);
    this.updateUnreadCount();
  }

  // 获取未读数量
  getUnreadCount() {
    return this.unreadCount;
  }

  // 获取所有通知
  getNotifications() {
    return this.notifications;
  }

  // 获取指定类型的通知
  getNotificationsByType(type) {
    return this.notifications.filter(n => n.type === type);
  }

  // 清除通知
  clearNotifications() {
    this.notifications = [];
    this.updateUnreadCount();
  }

  // 触发未读数量更新事件
  triggerUnreadCountUpdate() {
    // 这里可以通过事件总线或其他方式通知UI更新
    console.log('[NotificationService] 未读数量更新:', this.unreadCount);
  }

  // 测试API连接
  async testApiConnection() {
    try {
      const token = uni.getStorageSync('token');
      if (!token) {
        console.warn('[NotificationService] 未找到token，无法测试API连接');
        return false;
      }

      // 尝试调用一个简单的API来测试连接
      const res = await uni.request({
        url: `${config.baseUrl}/api/notification/test`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[NotificationService] API连接测试响应:', res.data);
      return res.data.code === 200 || res.statusCode === 200;
    } catch (error) {
      console.error('[NotificationService] API连接测试失败:', error);
      return false;
    }
  }

  // 销毁服务
  destroy() {
    console.log('[NotificationService] 销毁通知服务');
    
    // 移除消息处理器
    notificationManager.unregisterHandler('SYSTEM');
    notificationManager.unregisterHandler('CALL');
    notificationManager.unregisterHandler('EMAIL');
    notificationManager.unregisterHandler('USER');
    notificationManager.unregisterHandler('POLICY');
    notificationManager.unregisterHandler('FAQ');
    
    // 断开WebSocket连接
    notificationManager.disconnect();
    
    this.isInitialized = false;
  }
}

// 创建单例实例
const notificationService = new NotificationService();

export default notificationService; 