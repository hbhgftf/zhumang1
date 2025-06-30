# 通知API功能说明

## 新增功能

### 1. 标记通知为已读API
- **接口地址**: `POST /api/notification/read/{id}`
- **功能**: 根据通知id将通知标记为已读（is_read=1，并记录read_time）
- **返回**: 
  - 成功时返回"通知已标记为已读"
  - 失败时返回"通知不存在或已被删除"

## 前端实现

### 1. 修改的文件

#### `utils/notification-service.js`
- ✅ 修改了 `markAsRead()` 方法，添加了API调用逻辑
- ✅ 添加了 `markAsReadLocal()` 方法作为备用
- ✅ 修改了 `markAllAsRead()` 方法，支持批量API调用
- ✅ 添加了 `testApiConnection()` 方法用于测试API连接
- ✅ 所有相关方法都改为异步调用

#### `pages/notification/center.vue`
- ✅ 修改了 `markAsRead()` 方法，支持异步API调用
- ✅ 添加了"全部已读"按钮
- ✅ 添加了错误处理和用户反馈

#### `pages/debug/notification-test.vue`
- ✅ 创建了专门的API测试页面
- ✅ 支持测试API连接
- ✅ 支持测试单个通知的标记已读功能
- ✅ 支持批量标记已读测试

### 2. 功能特性

#### 容错处理
- 🔄 **网络错误时自动降级**: 如果API调用失败，仍然会更新前端状态
- 🔄 **Token缺失处理**: 如果没有token，只更新前端状态
- 🔄 **批量操作**: 支持批量标记所有通知为已读

#### 用户体验
- 📱 **实时反馈**: 操作后立即更新UI状态
- 📱 **错误提示**: 网络错误时显示友好的错误信息
- 📱 **加载状态**: 操作过程中显示加载提示

## 使用方法

### 1. 测试API连接
1. 打开调试页面: `/pages/debug/notification-test`
2. 点击"测试API连接"按钮
3. 查看测试结果

### 2. 测试标记已读功能
1. 在通知测试页面输入通知ID
2. 点击"测试标记已读"按钮
3. 查看测试结果和通知列表更新

### 3. 在通知中心使用
1. 打开通知中心: `/pages/notification/center`
2. 点击单个通知的"标记已读"按钮
3. 或点击顶部的"全部已读"按钮

## API调用流程

### 单个通知标记已读
```javascript
// 1. 获取token
const token = uni.getStorageSync('token');

// 2. 调用API
const res = await uni.request({
  url: `${baseUrl}/api/notification/read/${messageId}`,
  method: 'POST',
  header: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// 3. 处理响应
if (res.data.code === 200) {
  // 更新前端状态
  this.markAsReadLocal(messageId);
}
```

### 批量标记已读
```javascript
// 1. 获取所有未读通知ID
const unreadIds = this.notifications
  .filter(n => !n.isRead)
  .map(n => n.messageId)
  .filter(Boolean);

// 2. 批量调用API
const promises = unreadIds.map(messageId => 
  uni.request({
    url: `${baseUrl}/api/notification/read/${messageId}`,
    method: 'POST',
    header: { 'Authorization': `Bearer ${token}` }
  })
);

// 3. 等待所有请求完成
const results = await Promise.allSettled(promises);
```

## 错误处理

### 1. 网络错误
- 自动降级到前端状态更新
- 显示错误提示给用户
- 记录错误日志

### 2. Token无效
- 提示用户重新登录
- 仅更新前端状态
- 记录警告日志

### 3. API返回错误
- 显示后端返回的错误信息
- 仍然更新前端状态
- 记录错误日志

## 调试信息

所有API调用都会在控制台输出详细的调试信息：

```javascript
console.log('[NotificationService] 标记已读API响应:', res.data);
console.log('[NotificationService] 通知已标记为已读:', messageId);
console.log('[NotificationService] API标记已读失败，仅更新前端状态:', res.data.message);
```

## 测试建议

1. **网络测试**: 测试网络断开时的降级功能
2. **Token测试**: 测试token过期或无效时的处理
3. **批量测试**: 测试大量通知的批量标记功能
4. **并发测试**: 测试同时标记多个通知的情况
5. **错误测试**: 测试各种错误情况的处理

## 注意事项

1. **Token管理**: 确保用户登录后正确保存token
2. **错误处理**: 所有API调用都有完整的错误处理
3. **用户体验**: 即使API失败，用户界面仍然保持响应
4. **性能考虑**: 批量操作使用Promise.allSettled避免单个失败影响整体
5. **日志记录**: 所有关键操作都有详细的日志记录 