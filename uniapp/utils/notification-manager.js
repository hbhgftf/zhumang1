import config from '../config.js';

class NotificationManager {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000; // 3秒重连间隔
    this.heartbeatInterval = 30000; // 30秒心跳间隔
    this.heartbeatTimer = null;
    this.reconnectTimer = null;
    this.messageHandlers = new Map();
    this.token = '';
    
    // 绑定方法到实例
    this.handleOpen = this.handleOpen.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  // 初始化连接
  init() {
    this.token = uni.getStorageSync('token');
    if (!this.token) {
      console.warn('[NotificationManager] 未找到token，无法建立WebSocket连接');
      return;
    }
    
    this.connect();
  }

  // 建立WebSocket连接
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('[NotificationManager] WebSocket已连接');
      return;
    }

    try {
      const wsUrl = `${config.baseUrl.replace('http', 'ws')}/ws/notification?token=${this.token}`;
      console.log('[NotificationManager] 正在连接WebSocket:', wsUrl);
      
      this.ws = uni.connectSocket({
        url: wsUrl,
        success: () => {
          console.log('[NotificationManager] WebSocket连接请求已发送');
        },
        fail: (error) => {
          console.error('[NotificationManager] WebSocket连接失败:', error);
          this.scheduleReconnect();
        }
      });

      // 监听连接事件
      this.ws.onOpen(this.handleOpen);
      this.ws.onMessage(this.handleMessage);
      this.ws.onClose(this.handleClose);
      this.ws.onError(this.handleError);

    } catch (error) {
      console.error('[NotificationManager] 创建WebSocket连接异常:', error);
      this.scheduleReconnect();
    }
  }

  // 连接成功处理
  handleOpen() {
    console.log('[NotificationManager] WebSocket连接已建立');
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    
    // 触发连接成功事件
    this.triggerEvent('connected');
  }

  // 接收消息处理
  handleMessage(event) {
    try {
      // 新增：log所有收到的消息内容
      console.log('[NotificationManager][WebSocket] 收到消息:', event.data);
      const message = JSON.parse(event.data);
      // 兼容补发消息结构：如果有data.type则用data，否则用原消息
      const realMsg = (message.data && message.data.type) ? message.data : message;
      console.log('[NotificationManager][WebSocket] 解析后消息:', realMsg);
      
      // 处理心跳响应
      if (realMsg.type === 'PONG') {
        console.log('[NotificationManager] 收到心跳响应');
        return;
      }
      
      // 分发消息给对应的处理器
      this.dispatchMessage(realMsg);
      
      // 触发消息接收事件
      this.triggerEvent('message', realMsg);
      
    } catch (error) {
      console.error('[NotificationManager] 解析消息失败:', error, event.data);
    }
  }

  // 连接关闭处理
  handleClose() {
    console.log('[NotificationManager] WebSocket连接已关闭');
    this.isConnected = false;
    this.stopHeartbeat();
    
    // 触发连接关闭事件
    this.triggerEvent('disconnected');
    
    // 尝试重连
    this.scheduleReconnect();
  }

  // 连接错误处理
  handleError(error) {
    console.error('[NotificationManager] WebSocket错误:', error);
    this.isConnected = false;
    this.stopHeartbeat();
    
    // 触发错误事件
    this.triggerEvent('error', error);
  }

  // 发送消息
  send(data) {
    if (!this.isConnected || !this.ws) {
      console.warn('[NotificationManager] WebSocket未连接，无法发送消息');
      return false;
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.ws.send({
        data: message,
        success: () => {
          console.log('[NotificationManager] 消息发送成功:', data);
        },
        fail: (error) => {
          console.error('[NotificationManager] 消息发送失败:', error);
        }
      });
      return true;
    } catch (error) {
      console.error('[NotificationManager] 发送消息异常:', error);
      return false;
    }
  }

  // 发送心跳
  sendHeartbeat() {
    this.send({
      type: 'PING',
      timestamp: Date.now()
    });
  }

  // 开始心跳
  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.sendHeartbeat();
    }, this.heartbeatInterval);
  }

  // 停止心跳
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // 安排重连
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('[NotificationManager] 达到最大重连次数，停止重连');
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectAttempts++;
    const delay = this.reconnectInterval * this.reconnectAttempts;
    
    console.log(`[NotificationManager] ${delay}ms后尝试第${this.reconnectAttempts}次重连`);
    
    this.reconnectTimer = setTimeout(() => {
      console.log('[NotificationManager] 开始重连...');
      this.connect();
    }, delay);
  }

  // 注册消息处理器
  registerHandler(messageType, handler) {
    this.messageHandlers.set(messageType, handler);
  }

  // 移除消息处理器
  unregisterHandler(messageType) {
    this.messageHandlers.delete(messageType);
  }

  // 分发消息
  dispatchMessage(message) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      try {
        handler(message);
      } catch (error) {
        console.error(`[NotificationManager] 处理${message.type}消息时出错:`, error);
      }
    } else {
      console.warn(`[NotificationManager] 未找到${message.type}消息的处理器`);
    }
  }

  // 事件系统
  triggerEvent(eventName, data) {
    // 这里可以扩展为更完整的事件系统
    console.log(`[NotificationManager] 触发事件: ${eventName}`, data);
  }

  // 断开连接
  disconnect() {
    console.log('[NotificationManager] 主动断开WebSocket连接');
    
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
    this.reconnectAttempts = 0;
  }

  // 获取连接状态
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }
}

// 创建单例实例
const notificationManager = new NotificationManager();

export default notificationManager; 