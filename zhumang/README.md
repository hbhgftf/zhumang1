# 助盲APP后端服务 (Zhumang Backend)

## 项目概述

助盲APP是一个专为视障人士设计的综合性服务平台，提供视频通话、政策查询、FAQ等功能。本仓库包含后端服务代码，基于Spring Boot框架开发。

## 技术栈

- **框架**: Spring Boot 2.6.13
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **ORM**: MyBatis-Plus
- **安全**: JWT Token
- **文件存储**: MinIO
- **视频通话**: 腾讯云 TUICallKit
- **邮件服务**: Spring Mail (QQ邮箱)
- **微信小程序**: WxJava
- **构建工具**: Maven

## 项目结构

```
zhumang/
├── src/
│   ├── main/
│   │   ├── java/zysy/iflytek/zhumang/
│   │   │   ├── call/                    # 视频通话模块
│   │   │   │   ├── config/              # WebSocket配置
│   │   │   │   ├── controller/          # 通话控制器
│   │   │   │   ├── entity/              # 通话记录实体
│   │   │   │   ├── mapper/              # 数据访问层
│   │   │   │   ├── model/               # 通话消息模型
│   │   │   │   ├── service/             # 业务逻辑层
│   │   │   │   └── websocket/           # WebSocket处理器
│   │   │   ├── common/                  # 公共模块
│   │   │   │   ├── email/               # 邮件服务
│   │   │   │   ├── exception/           # 异常处理
│   │   │   │   ├── filter/              # 请求过滤器
│   │   │   │   ├── interceptor/         # 拦截器
│   │   │   │   └── model/               # 公共模型
│   │   │   ├── config/                  # 配置类
│   │   │   ├── faq/                     # FAQ模块
│   │   │   │   ├── controller/          # FAQ控制器
│   │   │   │   ├── dto/                 # 数据传输对象
│   │   │   │   ├── entity/              # FAQ实体
│   │   │   │   ├── mapper/              # 数据访问层
│   │   │   │   └── service/             # 业务逻辑层
│   │   │   ├── minio/                   # 文件存储模块
│   │   │   │   ├── controller/          # 文件上传控制器
│   │   │   │   ├── dto/                 # 文件传输对象
│   │   │   │   └── service/             # 文件服务
│   │   │   ├── policy/                  # 政策模块
│   │   │   │   ├── controller/          # 政策控制器
│   │   │   │   ├── dto/                 # 政策传输对象
│   │   │   │   ├── entity/              # 政策实体
│   │   │   │   ├── mapper/              # 数据访问层
│   │   │   │   └── service/             # 业务逻辑层
│   │   │   ├── redis/                   # Redis模块
│   │   │   │   ├── config/              # Redis配置
│   │   │   │   └── volunteer/           # 志愿者状态管理
│   │   │   ├── user/                    # 用户模块
│   │   │   │   ├── controller/          # 用户控制器
│   │   │   │   ├── dto/                 # 用户传输对象
│   │   │   │   ├── entity/              # 用户实体
│   │   │   │   ├── mapper/              # 数据访问层
│   │   │   │   └── service/             # 业务逻辑层
│   │   │   ├── utils/                   # 工具类
│   │   │   └── ZhumangApplication.java  # 启动类
│   │   └── resources/
│   │       ├── application.yml          # 应用配置
│   │       ├── db/                      # 数据库脚本
│   │       ├── mapper/                  # MyBatis映射文件
│   │       └── static/                  # 静态资源
│   └── test/                            # 测试代码
├── pom.xml                              # Maven配置
└── README.md                            # 项目说明
```

## 模块详细说明

### 1. 用户模块 (user)

**位置**: `src/main/java/zysy/iflytek/zhumang/user/`

**功能**:
- 用户注册、登录、信息管理
- 支持微信登录、邮箱验证码登录、密码登录
- 用户角色管理（视障用户、志愿者、管理员）
- JWT Token生成和验证
- 腾讯云UserSig生成

**主要接口**:
- `POST /user/login` - 微信登录
- `POST /user/login/email` - 邮箱验证码登录
- `POST /user/login/password` - 密码登录
- `POST /user/volunteer/register` - 志愿者注册
- `POST /user/admin/register` - 管理员注册
- `GET /user/userSig` - 获取腾讯云UserSig
- `POST /user/sendEmail/{email}` - 发送验证码
                                                                                  
### 2. 视频通话模块 (call)

**位置**: `src/main/java/zysy/iflytek/zhumang/call/`

**功能**:
- 基于腾讯云TUICallKit的视频通话
- WebSocket实时通信
- 通话记录管理
- 志愿者分配和状态管理
- 通话拒绝处理

**主要接口**:
- `POST /api/call/request` - 发起通话请求
- `POST /api/call/accept` - 接受通话
- `POST /api/call/reject` - 拒绝通话
- `POST /api/call/end` - 结束通话
- `GET /api/call/status` - 获取通话状态
- `GET /api/call/volunteers` - 获取在线志愿者

### 3. FAQ模块 (faq)

**位置**: `src/main/java/zysy/iflytek/zhumang/faq/`

**功能**:
- 常见问题管理
- 支持关键词搜索
- 分页查询

**主要接口**:
- `GET /faq/page` - 分页查询FAQ
- `POST /faq` - 新增FAQ
- `PUT /faq/{id}` - 修改FAQ
- `DELETE /faq/{id}` - 删除FAQ
- `GET /faq/all` - 查询所有FAQ

### 4. 政策模块 (policy)

**位置**: `src/main/java/zysy/iflytek/zhumang/policy/`

**功能**:
- 助盲政策管理
- 政策收藏功能
- 政策分类和标签
- 分页查询和搜索

**主要接口**:
- `POST /policy` - 创建政策
- `PUT /policy/update/{id}` - 更新政策
- `DELETE /policy/delete/{id}` - 删除政策
- `GET /policy/page` - 分页查询政策
- `POST /policy/favorite/{id}` - 收藏政策
- `DELETE /policy/favorite/{id}` - 取消收藏

### 5. 文件存储模块 (minio)

**位置**: `src/main/java/zysy/iflytek/zhumang/minio/`

**功能**:
- 基于MinIO的文件上传
- 文件访问权限管理
- 支持图片、文档等多种格式

**主要接口**:
- `POST /minio/upload` - 文件上传

### 6. Redis模块 (redis)

**位置**: `src/main/java/zysy/iflytek/zhumang/redis/`

**功能**:
- Redis配置和连接管理
- 志愿者在线状态管理
- 缓存数据管理

### 7. 公共模块 (common)

**位置**: `src/main/java/zysy/iflytek/zhumang/common/`

**功能**:
- 邮件服务 (email)
- 全局异常处理 (exception)
- 请求日志过滤 (filter)
- JWT拦截器 (interceptor)
- 统一响应模型 (model)

## 配置说明

### 数据库配置
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/rural_revitalization
    username: root
    password: 123456
```

### Redis配置
```yaml
spring:
  redis:
    host: 192.168.162.173
    port: 6379
    database: 0
```

### 邮件配置
```yaml
spring:
  mail:
    username: 2280929569@qq.com
    password: gjtfzovgidkveadg
    host: smtp.qq.com
    port: 465
```

### 腾讯云配置
```yaml
tencent:
  cloud:
    sdkAppId: 1600094381
    secretKey: "215c03299311984f1a616615106bf9687efc88a28b08b4be7e6b4ac886c21604"
```

### MinIO配置
```yaml
minio:
  endpoint: http://192.168.162.173:9000
  bucketName: course
  accessKey: admin
  secretKey: 12345678
```

## 部署指南

### 环境要求
- JDK 1.8+
- MySQL 8.0+
- Redis 6.0+
- MinIO (可选)

### 启动步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd zhumang
```

2. **配置数据库**
```bash
# 创建数据库
CREATE DATABASE rural_revitalization;
# 执行SQL脚本
mysql -u root -p rural_revitalization < src/main/resources/db/*.sql
```

### 代码结构
- 遵循分层架构：Controller -> Service -> Mapper
- 使用DTO进行数据传输
- 统一异常处理
- 统一响应格式

### 命名规范
- 类名：大驼峰命名
- 方法名：小驼峰命名
- 常量：全大写+下划线
- 包名：全小写

### 注释规范
- 类和方法必须有JavaDoc注释
- 复杂逻辑需要行内注释
- API接口需要Swagger注解

## 常见问题

### 1. 邮件发送失败
- 检查邮箱配置是否正确
- 确认授权码是否有效
- 检查网络连接

### 2. 视频通话连接失败
- 检查腾讯云配置
- 确认SDKAppID和SecretKey
- 检查网络连接

### 3. 数据库连接失败
- 检查数据库服务是否启动
- 确认连接配置是否正确
- 检查防火墙设置

## 更新日志

### v1.0.0 (2025-06-29)
- 初始版本发布
- 实现用户管理、视频通话、FAQ、政策管理等核心功能
- 完成Controller层重构，业务逻辑下沉到Service层
- 优化邮件发送错误处理
- 修复Jackson序列化问题

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
