# 前端实时通知系统集成文档

## 概述

本项目已成功集成完整的实时通知系统，支持WebSocket实时推送、多种通知类型、红点提醒等功能。

## 系统架构

### 核心组件

1. **NotificationManager** (`utils/notification-manager.js`)
   - WebSocket连接管理
   - 自动重连机制
   - 心跳检测
   - 消息分发

2. **NotificationService** (`utils/notification-service.js`)
   - 通知业务逻辑处理
   - 不同类型通知的处理
   - 通知存储和管理
   - UI交互（弹窗、铃声等）

3. **通知中心页面** (`pages/notification/center.vue`)
   - 通知列表展示
   - 已读/未读状态管理
   - 通知操作（删除、清空等）

4. **个人中心铃铛** (`pages/user/profile.vue`)
   - 实时红点显示
   - 未读消息数量统计
   - 快速访问通知中心

## 功能特性

### ✅ 已实现功能

1. **WebSocket实时连接**
   - 自动连接后端WebSocket服务
   - 断线自动重连（最多5次）
   - 30秒心跳检测
   - JWT Token身份验证

2. **多种通知类型**
   - `SYSTEM`: 系统通知
   - `CALL`: 通话通知（带铃声）
   - `EMAIL`: 邮件通知
   - `USER`: 用户通知
   - `POLICY`: 政策通知
   - `FAQ`: 常见问题通知

3. **通知级别**
   - `URGENT`: 紧急（震动+弹窗+铃声）
   - `HIGH`: 重要（震动+弹窗）
   - `NORMAL`: 普通（Toast提示）
   - `LOW`: 低优先级（仅红点）

4. **UI交互**
   - 个人中心铃铛红点
   - 通知弹窗
   - 来电铃声
   - 震动提醒
   - 通知中心列表

5. **通知管理**
   - 标记已读/未读
   - 删除单条通知
   - 清空所有通知
   - 通知统计

## 使用方法

### 1. 初始化通知系统

在需要使用的页面中导入并初始化：

```javascript
import notificationService from '../../utils/notification-service.js';

// 在页面加载时初始化
onLoad() {
  notificationService.init();
}
```

### 2. 获取通知数据

```javascript
// 获取所有通知
const notifications = notificationService.getNotifications();

// 获取未读数量
const unreadCount = notificationService.getUnreadCount();

// 获取指定类型的通知
const systemNotifications = notificationService.getNotificationsByType('SYSTEM');
```

### 3. 通知操作

```javascript
// 标记为已读
notificationService.markAsRead(messageId);

// 标记全部已读
notificationService.markAllAsRead();

// 清空所有通知
notificationService.clearNotifications();
```

### 4. 手动发送测试通知

```javascript
// 系统通知
const systemMessage = {
  messageId: 'test_' + Date.now(),
  type: 'SYSTEM',
  title: '测试标题',
  content: '测试内容',
  level: 'NORMAL',
  createTime: new Date().toISOString()
};
notificationService.handleSystemNotification(systemMessage);

// 通话通知
const callMessage = {
  messageId: 'call_' + Date.now(),
  type: 'CALL',
  title: '来电提醒',
  content: '有新的视频通话请求',
  level: 'HIGH',
  extraData: JSON.stringify({
    callerName: '测试用户',
    roomId: 'test_room_123'
  }),
  createTime: new Date().toISOString()
};
notificationService.handleCallNotification(callMessage);
```

## 页面集成

### 个人中心页面

已在 `pages/user/profile.vue` 中集成：
- 顶部导航栏铃铛图标
- 实时红点显示未读数量
- 点击跳转到通知中心

### 通知中心页面

路径：`pages/notification/center.vue`
- 完整的通知列表
- 支持标记已读、删除操作
- 实时刷新通知状态

### 测试页面

路径：`pages/debug/notification-test.vue`
- WebSocket连接状态监控
- 各种类型通知的测试按钮
- 通知统计信息
- 快速操作功能

## 后端接口要求

### WebSocket连接

```
连接地址: ws://your-domain/ws/notification?token=JWT_TOKEN
认证方式: JWT Token（URL参数）
```

### 消息格式

```json
{
  "messageId": "unique_message_id",
  "type": "SYSTEM|CALL|EMAIL|USER|POLICY|FAQ",
  "title": "通知标题",
  "content": "通知内容",
  "targetUserId": 123,
  "senderId": 1,
  "level": "URGENT|HIGH|NORMAL|LOW",
  "extraData": "{\"key\":\"value\"}",
  "createTime": "2024-06-29T23:00:00",
  "expireTime": "2024-06-30T23:00:00",
  "isRead": false
}
```

### 心跳机制

前端每30秒发送：
```json
{
  "type": "PING",
  "timestamp": 1640995200000
}
```

后端响应：
```json
{
  "type": "PONG",
  "timestamp": 1640995200000
}
```

## 测试方法

### 1. 通过调试页面测试

1. 进入调试页面：`pages/debug/debug`
2. 点击"通知功能测试"按钮
3. 在测试页面点击各种测试按钮
4. 观察通知效果和红点变化

### 2. 手动测试

1. 登录应用
2. 在个人中心查看铃铛红点
3. 点击铃铛进入通知中心
4. 测试各种通知操作

### 3. 后端集成测试

1. 确保后端WebSocket服务正常运行
2. 通过后端接口发送测试通知
3. 验证前端实时接收和显示

## 注意事项

1. **Token有效性**: 确保JWT Token有效，否则WebSocket连接会失败
2. **网络环境**: WebSocket需要稳定的网络连接
3. **权限设置**: 确保应用有震动、音频播放权限
4. **内存管理**: 通知列表限制为最新100条，避免内存溢出
5. **错误处理**: 系统已包含完整的错误处理和重连机制

## 扩展功能

### 可扩展的通知类型

在 `NotificationService` 中添加新的处理器：

```javascript
// 注册新的通知类型处理器
notificationManager.registerHandler('NEW_TYPE', this.handleNewTypeNotification);

// 实现处理器方法
handleNewTypeNotification(message) {
  // 处理新类型通知的逻辑
}
```

### 自定义通知样式

在 `notification-service.js` 中修改通知显示方法：

```javascript
showCustomNotification(message) {
  // 自定义通知显示逻辑
}
```

## 故障排除

### 常见问题

1. **WebSocket连接失败**
   - 检查后端服务是否正常运行
   - 验证JWT Token是否有效
   - 检查网络连接

2. **通知不显示**
   - 确认通知服务已初始化
   - 检查通知处理器是否正确注册
   - 验证消息格式是否正确

3. **红点不更新**
   - 检查定时器是否正常工作
   - 确认未读数量计算逻辑
   - 验证UI更新机制

### 调试工具

使用 `pages/debug/notification-test.vue` 页面进行调试：
- 实时监控WebSocket连接状态
- 测试各种通知类型
- 查看通知统计信息
- 快速操作通知数据

## 总结

通知系统已完全集成到项目中，提供了完整的实时通知功能。系统具有良好的可扩展性和稳定性，支持多种通知类型和交互方式。通过WebSocket实现实时推送，确保用户能够及时收到重要通知。 