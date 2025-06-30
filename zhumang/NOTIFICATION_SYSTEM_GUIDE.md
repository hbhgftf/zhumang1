# 消息队列通知系统使用指南

## 概述

本项目集成了RabbitMQ消息队列来实现系统通知功能，提供了异步、可靠的消息传递机制。通知系统支持多种类型的通知，包括系统通知、用户通知、通话通知、邮件通知等。

## 系统架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   生产者服务     │    │   RabbitMQ      │    │   消费者服务     │
│                 │───▶│   消息队列      │───▶│                 │
│ Notification    │    │                 │    │ Notification    │
│ Producer        │    │                 │    │ Consumer        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 功能特性

### 1. 通知类型
- **系统通知**: 系统级别的通知，如维护通知、更新通知等
- **用户通知**: 用户之间的通知，如消息提醒等
- **通话通知**: 通话相关的通知，如来电提醒、通话状态等
- **邮件通知**: 邮件发送通知
- **政策通知**: 政策更新、发布通知
- **FAQ通知**: FAQ更新通知

### 2. 通知级别
- **LOW**: 低优先级通知
- **NORMAL**: 普通优先级通知
- **HIGH**: 高优先级通知
- **URGENT**: 紧急通知

### 3. 消息队列特性
- **异步处理**: 通知发送不阻塞主业务流程
- **可靠性**: 消息持久化，确保不丢失
- **重试机制**: 失败自动重试
- **过期机制**: 消息自动过期清理
- **优先级**: 支持不同优先级的消息处理

## 配置说明

### 1. RabbitMQ配置

在 `application.yml` 中配置RabbitMQ连接信息：

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    connection-timeout: 15000
    requested-heartbeat: 60
    publisher-confirm-type: correlated
    publisher-returns: true
    listener:
      simple:
        acknowledge-mode: manual
        prefetch: 1
        retry:
          enabled: true
          initial-interval: 1000
          max-attempts: 3
          max-interval: 10000
          multiplier: 1.0
```

### 2. 队列配置

系统预定义了以下队列：

- `system.notification.queue`: 系统通知队列
- `user.notification.queue`: 用户通知队列
- `call.notification.queue`: 通话通知队列
- `email.notification.queue`: 邮件通知队列

## 使用方法

### 1. 注入通知服务

```java
@Autowired
private NotificationProducerService notificationProducerService;
```

### 2. 发送系统通知

```java
// 发送给特定用户
notificationProducerService.sendSystemNotification(
    "系统维护通知", 
    "系统将于今晚22:00-24:00进行维护", 
    userId
);

// 发送给所有用户（targetUserId为null）
notificationProducerService.sendSystemNotification(
    "系统更新通知", 
    "系统已更新到最新版本", 
    null
);
```

### 3. 发送用户通知

```java
notificationProducerService.sendUserNotification(
    "新消息提醒", 
    "您有一条新的消息", 
    targetUserId, 
    senderId
);
```

### 4. 发送通话通知

```java
String extraData = "{\"roomId\":\"room123\",\"callerId\":1,\"callerName\":\"张三\"}";
notificationProducerService.sendCallNotification(
    "新的通话请求", 
    "您收到了来自张三的通话请求", 
    volunteerId, 
    extraData
);
```

### 5. 发送邮件通知

```java
notificationProducerService.sendEmailNotification(
    "验证码", 
    "您的验证码是：123456，5分钟内有效", 
    userId
);
```

### 6. 发送紧急通知

```java
notificationProducerService.sendUrgentNotification(
    "紧急通知", 
    "系统检测到异常，请立即处理", 
    adminUserId
);
```

## API接口

### 1. 发送系统通知
```
POST /api/notification/system
参数：
- title: 通知标题
- content: 通知内容
- targetUserId: 目标用户ID（可选）
```

### 2. 发送用户通知
```
POST /api/notification/user
参数：
- title: 通知标题
- content: 通知内容
- targetUserId: 目标用户ID
- senderId: 发送者ID
```

### 3. 发送通话通知
```
POST /api/notification/call
参数：
- title: 通知标题
- content: 通知内容
- targetUserId: 目标用户ID
- extraData: 额外数据（可选）
```

### 4. 发送邮件通知
```
POST /api/notification/email
参数：
- title: 邮件标题
- content: 邮件内容
- targetUserId: 目标用户ID
```

## 数据库表结构

### 1. notification表
存储当前有效的通知消息

```sql
CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_id` varchar(64) NOT NULL,
  `type` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `target_user_id` bigint(20),
  `sender_id` bigint(20),
  `level` varchar(32) DEFAULT 'NORMAL',
  `extra_data` text,
  `is_read` tinyint(1) DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `expire_time` datetime,
  `read_time` datetime,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_message_id` (`message_id`)
);
```

### 2. notification_history表
存储通知历史记录

```sql
CREATE TABLE `notification_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_id` varchar(64) NOT NULL,
  `type` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `target_user_id` bigint(20),
  `sender_id` bigint(20),
  `level` varchar(32) DEFAULT 'NORMAL',
  `extra_data` text,
  `status` varchar(32) DEFAULT 'SENT',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `deliver_time` datetime,
  `read_time` datetime,
  `fail_reason` varchar(500),
  PRIMARY KEY (`id`)
);
```

### 3. user_notification_setting表
存储用户通知设置

```sql
CREATE TABLE `user_notification_setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `notification_type` varchar(32) NOT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `email_enabled` tinyint(1) DEFAULT 1,
  `push_enabled` tinyint(1) DEFAULT 1,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_type` (`user_id`, `notification_type`)
);
```

## 部署说明

### 1. 安装RabbitMQ

#### Windows
```bash
# 下载并安装RabbitMQ
# 启动服务
rabbitmq-service start
```

#### Linux (Ubuntu/Debian)
```bash
# 安装RabbitMQ
sudo apt-get update
sudo apt-get install rabbitmq-server

# 启动服务
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server
```

#### Docker
```bash
# 运行RabbitMQ容器
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
```

### 2. 配置管理界面

RabbitMQ管理界面默认地址：`http://localhost:15672`
默认用户名/密码：`guest/guest`

### 3. 启动应用

```bash
# 编译项目
mvn clean compile

# 启动应用
mvn spring-boot:run
```

## 监控和调试

### 1. 查看队列状态

通过RabbitMQ管理界面可以查看：
- 队列消息数量
- 消费者状态
- 消息处理情况
- 错误日志

### 2. 日志监控

应用日志中会记录：
- 消息发送情况
- 消息处理情况
- 错误信息

### 3. 性能监控

可以通过以下方式监控性能：
- 队列长度
- 消息处理速度
- 错误率

## 最佳实践

### 1. 消息设计
- 消息内容要简洁明了
- 合理设置消息过期时间
- 使用适当的消息级别

### 2. 错误处理
- 实现消息重试机制
- 记录详细的错误日志
- 设置合理的重试次数

### 3. 性能优化
- 合理设置队列大小
- 监控队列积压情况
- 及时处理死信消息

### 4. 安全考虑
- 限制消息大小
- 验证消息内容
- 设置访问权限

## 常见问题

### 1. 消息丢失
**问题**: 消息发送后没有收到
**解决**: 检查RabbitMQ服务状态，确认队列配置正确

### 2. 消息重复
**问题**: 同一条消息被处理多次
**解决**: 实现消息去重机制，使用消息ID判断

### 3. 队列积压
**问题**: 队列中消息堆积过多
**解决**: 增加消费者数量，优化消息处理逻辑

### 4. 连接断开
**问题**: 与RabbitMQ连接断开
**解决**: 检查网络连接，配置自动重连机制

## 扩展功能

### 1. 消息模板
可以创建消息模板，支持变量替换：

```java
String template = "您好，{username}，您的{type}已{status}";
String content = template
    .replace("{username}", user.getUsername())
    .replace("{type}", "订单")
    .replace("{status}", "完成");
```

### 2. 批量发送
支持批量发送通知：

```java
List<Long> userIds = Arrays.asList(1L, 2L, 3L);
for (Long userId : userIds) {
    notificationProducerService.sendSystemNotification(
        "批量通知", 
        "这是一条批量通知", 
        userId
    );
}
```

### 3. 定时通知
可以结合定时任务发送通知：

```java
@Scheduled(cron = "0 0 9 * * ?") // 每天上午9点
public void sendDailyNotification() {
    notificationProducerService.sendSystemNotification(
        "每日提醒", 
        "今天是新的一天，祝您愉快！", 
        null
    );
}
```

## 总结

消息队列通知系统为应用提供了可靠、高效的通知机制，支持多种通知类型和级别，具有良好的扩展性和可维护性。通过合理配置和使用，可以大大提升用户体验和系统可靠性。 