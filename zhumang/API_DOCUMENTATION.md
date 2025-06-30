# 助盲APP API文档

## 基础信息

- **基础URL**: `http://localhost:8080`
- **API版本**: v1.0
- **数据格式**: JSON
- **字符编码**: UTF-8

## 认证方式

大部分接口需要JWT Token认证，在请求头中添加：
```
Authorization: Bearer <your-jwt-token>
```

## 统一响应格式

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

## 用户模块 API

### 1. 微信登录

**接口**: `POST /user/login`

**描述**: 通过微信小程序code进行登录

**请求参数**:
```json
{
  "code": "string"  // 微信小程序登录code
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "userInfo": {
      "token": "eyJhbGciOiJIUzI1NiJ9...",
      "id": 1,
      "openid": "wx_openid_123",
      "nickname": "用户昵称",
      "avatarUrl": "https://example.com/avatar.jpg",
      "role": "视障用户"
    }
  }
}
```

### 2. 邮箱验证码登录

**接口**: `POST /user/login/email`

**描述**: 通过邮箱验证码进行登录

**请求参数**:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "userInfo": {
      "token": "eyJhbGciOiJIUzI1NiJ9...",
      "id": 1,
      "openid": "",
      "nickname": "用户昵称",
      "avatarUrl": "",
      "role": "视障用户"
    }
  }
}
```

### 3. 密码登录

**接口**: `POST /user/login/password`

**描述**: 通过邮箱和密码进行登录

**请求参数**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "userInfo": {
      "token": "eyJhbGciOiJIUzI1NiJ9...",
      "id": 1,
      "openid": "",
      "nickname": "用户昵称",
      "avatarUrl": "",
      "role": "视障用户"
    }
  }
}
```

### 4. 发送邮箱验证码

**接口**: `GET /user/sendEmail/{email}`

**描述**: 发送邮箱验证码

**路径参数**:
- `email`: 邮箱地址

**响应示例**:
```
验证码发送成功！
```

### 5. 设置密码

**接口**: `POST /user/set-password`

**描述**: 设置用户密码

**请求参数**:
```json
{
  "email": "user@example.com",
  "code": "123456",
  "password": "newpassword123"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "密码设置成功",
  "data": null
}
```

### 6. 志愿者注册

**接口**: `POST /user/volunteer/register`

**描述**: 志愿者用户注册

**请求参数**:
```json
{
  "openid": "wx_openid_123",
  "nickname": "志愿者昵称",
  "avatarUrl": "https://example.com/avatar.jpg",
  "phone": "13800138000",
  "idCard": "123456789012345678"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "志愿者注册成功",
  "data": null
}
```

### 7. 管理员注册

**接口**: `POST /user/admin/register`

**描述**: 管理员用户注册

**请求参数**:
```json
{
  "username": "admin",
  "password": "admin123",
  "email": "admin@example.com"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "管理员注册成功",
  "data": null
}
```

### 8. 获取腾讯云UserSig

**接口**: `GET /user/userSig`

**描述**: 获取腾讯云视频通话所需的UserSig

**请求头**:
```
Authorization: Bearer <jwt-token>
```

**响应示例**:
```json
{
  "code": 200,
  "message": "获取UserSig成功",
  "data": {
    "userId": "1",
    "userSig": "eJwtzE9LwzAUBeD_..."
  }
}
```

### 9. 刷新Token

**接口**: `POST /user/admin/refresh-token`

**描述**: 刷新访问令牌

**请求参数**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "令牌刷新成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

### 10. 用户信息管理

#### 10.1 保存用户信息
**接口**: `POST /user/saveUserInfo`

**请求参数**:
```json
{
  "id": 1,
  "nickname": "新昵称",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

#### 10.2 更新用户信息
**接口**: `POST /user/updateUserInfo`

**请求参数**:
```json
{
  "id": 1,
  "nickname": "新昵称",
  "phone": "13800138000",
  "usualAddress": "常用地址",
  "voiceSettings": "语音设置",
  "serviceHours": 10,
  "serviceRating": 4.5,
  "organization": "所属组织",
  "certificationTime": "2025-06-29",
  "username": "用户名"
}
```

#### 10.3 获取用户信息
**接口**: `GET /user/getUserInfo?id={id}`

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "userInfo": {
      "id": 1,
      "nickname": "用户昵称",
      "avatarUrl": "https://example.com/avatar.jpg",
      "phone": "13800138000",
      "usualAddress": "常用地址",
      "voiceSettings": "语音设置",
      "serviceHours": 10,
      "serviceRating": 4.5,
      "organization": "所属组织",
      "certificationTime": "2025-06-29",
      "username": "用户名"
    }
  }
}
```

## 视频通话模块 API

### 1. 发起通话请求

**接口**: `POST /api/call/request`

**描述**: 发起视频通话请求

**请求头**:
```
Authorization: Bearer <jwt-token>
```

**响应示例**:
```json
{
  "code": 200,
  "message": "通话请求已发送",
  "data": {
    "message": "通话请求已发送"
  }
}
```

### 2. 接受通话

**接口**: `POST /api/call/accept`

**描述**: 志愿者接受通话请求

**请求参数**:
```json
{
  "roomId": "room_123456"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "已接受通话请求",
  "data": {
    "message": "已接受通话请求"
  }
}
```

### 3. 拒绝通话

**接口**: `POST /api/call/reject`

**描述**: 志愿者拒绝通话请求

**请求参数**:
```json
{
  "roomId": "room_123456"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "已拒绝通话请求",
  "data": {
    "message": "已拒绝通话请求"
  }
}
```

### 4. 结束通话

**接口**: `POST /api/call/end`

**描述**: 结束当前通话

**请求参数**:
```
roomId: room_123456
```

**响应示例**:
```json
{
  "code": 200,
  "message": "通话已结束",
  "data": {
    "message": "通话已结束"
  }
}
```

### 5. 获取通话状态

**接口**: `GET /api/call/status`

**描述**: 获取通话状态信息

**请求参数**:
```
roomId: room_123456
```

**响应示例**:
```json
{
  "code": 200,
  "message": "获取通话状态成功",
  "data": {
    "roomId": "room_123456",
    "status": "connected",
    "startTime": "2025-06-29T21:00:00",
    "endTime": null,
    "duration": 300
  }
}
```

### 6. 获取在线志愿者

**接口**: `GET /api/call/volunteers`

**描述**: 获取在线志愿者列表

**响应示例**:
```json
{
  "code": 200,
  "message": "获取在线志愿者列表成功",
  "data": {
    "volunteers": [1, 2, 3],
    "count": 3
  }
}
```

## FAQ模块 API

### 1. 分页查询FAQ

**接口**: `GET /faq/page`

**描述**: 分页查询FAQ，支持关键词搜索

**请求参数**:
```
pageNum: 1
pageSize: 10
keyword: 搜索关键词 (可选)
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "records": [
      {
        "id": 1,
        "question": "如何使用助盲APP？",
        "answer": "下载APP后注册账号即可使用",
        "createTime": "2025-06-29T10:00:00"
      }
    ],
    "total": 1,
    "size": 10,
    "current": 1
  }
}
```

### 2. 新增FAQ

**接口**: `POST /faq`

**描述**: 新增FAQ（需要管理员权限）

**请求参数**:
```json
{
  "question": "新问题",
  "answer": "新答案"
}
```

### 3. 修改FAQ

**接口**: `PUT /faq/{id}`

**描述**: 修改FAQ（需要管理员权限）

**请求参数**:
```json
{
  "question": "修改后的问题",
  "answer": "修改后的答案"
}
```

### 4. 删除FAQ

**接口**: `DELETE /faq/{id}`

**描述**: 删除FAQ（需要管理员权限）

### 5. 查询所有FAQ

**接口**: `GET /faq/all`

**描述**: 查询所有FAQ（不分页）

## 政策模块 API

### 1. 分页查询政策

**接口**: `GET /policy/page`

**描述**: 分页查询政策，支持多种筛选条件

**请求参数**:
```
pageNum: 1
pageSize: 10
title: 政策标题 (可选)
policyLevel: 政策级别 (可选)
tags: 标签 (可选)
status: 状态 (可选)
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "records": [
      {
        "id": 1,
        "title": "助盲政策标题",
        "content": "政策内容",
        "policyLevel": "国家级",
        "tags": "助盲,福利",
        "status": 1,
        "createTime": "2025-06-29T10:00:00"
      }
    ],
    "total": 1,
    "size": 10,
    "current": 1
  }
}
```

### 2. 创建政策

**接口**: `POST /policy`

**描述**: 创建新政策（需要管理员权限）

**请求参数**:
```json
{
  "title": "政策标题",
  "content": "政策内容",
  "policyLevel": "国家级",
  "tags": "助盲,福利"
}
```

### 3. 更新政策

**接口**: `PUT /policy/update/{id}`

**描述**: 更新政策（需要管理员权限）

### 4. 删除政策

**接口**: `DELETE /policy/delete/{id}`

**描述**: 删除政策（需要管理员权限）

### 5. 获取政策详情

**接口**: `GET /policy/detail/{id}`

**描述**: 获取政策详细信息

### 6. 收藏政策

**接口**: `POST /policy/favorite/{id}`

**描述**: 收藏政策（需要登录）

### 7. 取消收藏

**接口**: `DELETE /policy/favorite/{id}`

**描述**: 取消收藏政策（需要登录）

### 8. 检查是否已收藏

**接口**: `GET /policy/favorite/{id}`

**描述**: 检查当前用户是否已收藏该政策

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": true
}
```

### 9. 获取用户收藏列表

**接口**: `GET /policy/favorites`

**描述**: 获取当前用户的政策收藏列表

**请求参数**:
```
pageNum: 1
pageSize: 10
```

## 文件存储模块 API

### 1. 文件上传

**接口**: `POST /minio/upload`

**描述**: 上传文件到MinIO存储

**请求参数**:
```
file: 文件 (multipart/form-data)
```

**响应示例**:
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "name": "example.jpg",
    "url": "http://192.168.162.173:9000/course/20250629/example.jpg"
  }
}
```

## 志愿者状态管理 API

### 1. 设置志愿者状态

**接口**: `POST /api/volunteer/status`

**描述**: 设置志愿者在线状态

**请求参数**:
```
userId: 1
isOnline: true
```

### 2. 获取志愿者状态

**接口**: `GET /api/volunteer/status/{userId}`

**描述**: 获取志愿者在线状态

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": true
}
```

### 3. 刷新志愿者状态

**接口**: `POST /api/volunteer/status/refresh/{userId}`

**描述**: 刷新志愿者状态（心跳）

### 4. 获取在线志愿者数量

**接口**: `GET /api/volunteer/status/count`

**描述**: 获取当前在线志愿者数量

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "data": 5
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 常见错误响应

### 1. 参数错误
```json
{
  "code": 400,
  "message": "邮箱不能为空",
  "data": null
}
```

### 2. 未授权
```json
{
  "code": 401,
  "message": "未登录或Token已过期",
  "data": null
}
```

### 3. 禁止访问
```json
{
  "code": 403,
  "message": "无权限执行此操作",
  "data": null
}
```

### 4. 业务异常
```json
{
  "code": 500,
  "message": "邮箱或密码错误",
  "data": null
}
```

## 注意事项

1. **Token过期**: JWT Token有效期为1小时，过期需要重新登录或刷新Token
2. **文件上传**: 支持的文件格式包括jpg、png、pdf等，单个文件大小限制为10MB
3. **分页查询**: 默认每页10条记录，最大每页100条
4. **权限控制**: 管理员相关接口需要管理员权限
5. **数据格式**: 所有时间字段使用ISO 8601格式（YYYY-MM-DDTHH:mm:ss）
6. **字符编码**: 所有请求和响应都使用UTF-8编码

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 实现基础用户管理功能
- 实现通话功能
- 实现政策查询功能

### v1.1.0 (2024-06-29)
- 添加FAQ管理功能
- 添加文件上传功能
- 添加通知系统
- 优化API响应格式
- 完善错误处理机制 