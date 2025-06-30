package zysy.iflytek.zhumang.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zysy.iflytek.zhumang.config.RabbitMQConfig;
import zysy.iflytek.zhumang.notification.model.NotificationMessage;
import zysy.iflytek.zhumang.user.service.IUserService;
import zysy.iflytek.zhumang.call.websocket.CallWebSocketHandler;
import zysy.iflytek.zhumang.notification.mapper.NotificationMapper;
import zysy.iflytek.zhumang.notification.entity.Notification;

/**
 * 通知消息消费者服务
 */
@Slf4j
@Service
public class NotificationConsumerService {

    @Autowired
    private IUserService userService;

    @Autowired
    private CallWebSocketHandler callWebSocketHandler;

    @Autowired
    private NotificationMapper notificationMapper;

    /**
     * 处理系统通知
     */
    @RabbitListener(queues = RabbitMQConfig.SYSTEM_NOTIFICATION_QUEUE)
    public void handleSystemNotification(NotificationMessage message) {
        try {
            log.info("收到系统通知: {}", message);
            
            // 这里可以添加具体的系统通知处理逻辑
            // 例如：发送WebSocket消息、推送通知等
            
            // 示例：记录到数据库或发送WebSocket消息
            processSystemNotification(message);
            
        } catch (Exception e) {
            log.error("处理系统通知失败: {}", message, e);
        }
    }

    /**
     * 处理用户通知
     */
    @RabbitListener(queues = RabbitMQConfig.USER_NOTIFICATION_QUEUE)
    public void handleUserNotification(NotificationMessage message) {
        try {
            log.info("收到用户通知: {}", message);
            
            // 根据通知类型进行不同处理
            switch (message.getType()) {
                case USER:
                    processUserNotification(message);
                    break;
                case POLICY:
                    processPolicyNotification(message);
                    break;
                case FAQ:
                    processFAQNotification(message);
                    break;
                default:
                    log.warn("未知的用户通知类型: {}", message.getType());
            }
            
        } catch (Exception e) {
            log.error("处理用户通知失败: {}", message, e);
        }
    }

    /**
     * 处理通话通知
     */
    @RabbitListener(queues = RabbitMQConfig.CALL_NOTIFICATION_QUEUE)
    public void handleCallNotification(NotificationMessage message) {
        try {
            log.info("收到通话通知: {}", message);
            
            // 处理通话相关通知
            processCallNotification(message);
            
        } catch (Exception e) {
            log.error("处理通话通知失败: {}", message, e);
        }
    }

    /**
     * 处理邮件通知
     */
    @RabbitListener(queues = RabbitMQConfig.EMAIL_NOTIFICATION_QUEUE)
    public void handleEmailNotification(NotificationMessage message) {
        try {
            log.info("收到邮件通知: {}", message);
            
            // 处理邮件发送
            processEmailNotification(message);
            
        } catch (Exception e) {
            log.error("处理邮件通知失败: {}", message, e);
        }
    }

    /**
     * 处理系统通知
     */
    private void processSystemNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("处理系统通知: {}", message.getTitle());
        
        // TODO: 实现具体的系统通知处理逻辑
        // 1. 发送WebSocket消息给目标用户
        // 2. 记录通知到数据库
        // 3. 发送推送通知等
    }

    /**
     * 处理用户通知
     */
    private void processUserNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("处理用户通知: {}", message.getTitle());
        
        // TODO: 实现具体的用户通知处理逻辑
        // 1. 发送WebSocket消息
        // 2. 记录用户通知历史
        // 3. 更新用户通知状态等
    }

    /**
     * 处理政策通知
     */
    private void processPolicyNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("处理政策通知: {}", message.getTitle());
        
        // TODO: 实现具体的政策通知处理逻辑
        // 1. 发送政策更新通知
        // 2. 记录政策通知历史
        // 3. 更新用户政策阅读状态等
    }

    /**
     * 处理FAQ通知
     */
    private void processFAQNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("处理FAQ通知: {}", message.getTitle());
        
        // TODO: 实现具体的FAQ通知处理逻辑
        // 1. 发送FAQ更新通知
        // 2. 记录FAQ通知历史等
    }

    /**
     * 处理通话通知
     */
    private void processCallNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("[CALL通知] 开始处理通话通知: {}", message);
        // 发送WebSocket通话通知给志愿者
        try {
            if (message.getTargetUserId() != null) {
                // 构造WebSocket消息体
                zysy.iflytek.zhumang.call.model.CallMessage wsMsg = new zysy.iflytek.zhumang.call.model.CallMessage();
                wsMsg.setType(zysy.iflytek.zhumang.call.model.CallMessageType.CALL);
                wsMsg.setContent(message.getContent());
                wsMsg.setRoomId(message.getExtraData() != null ? com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(message.getExtraData()).path("roomId").asText("") : "");
                wsMsg.setCallerId(message.getSenderId());
                wsMsg.setCalleeId(message.getTargetUserId());
                wsMsg.setData(message);
                log.info("[CALL通知] 即将通过WebSocket向志愿者{}推送type=CALL的通话通知，消息内容: {}", message.getTargetUserId(), wsMsg);
                callWebSocketHandler.sendMessage(message.getTargetUserId(), wsMsg);
                log.info("[CALL通知] 已通过WebSocket向志愿者{}推送type=CALL的通话通知", message.getTargetUserId());
            } else {
                log.warn("[CALL通知] 通话通知的targetUserId为空，无法推送WebSocket消息: {}", message);
            }
        } catch (Exception e) {
            log.error("[CALL通知] WebSocket推送通话通知失败", e);
        }
        // TODO: 记录通话通知历史等
    }

    /**
     * 处理邮件通知
     */
    private void processEmailNotification(NotificationMessage message) {
        saveNotification(message);
        log.info("处理邮件通知: {}", message.getTitle());
        
        // TODO: 实现具体的邮件发送逻辑
        // 1. 获取用户邮箱
        // 2. 发送邮件
        // 3. 记录邮件发送历史等
        
        // 示例：获取用户信息并发送邮件
        if (message.getTargetUserId() != null) {
            // 这里可以调用邮件服务发送邮件
            log.info("准备发送邮件给用户: {}", message.getTargetUserId());
        }
    }

    private void saveNotification(NotificationMessage message) {
        // 幂等性校验：已存在则不插入
        if (notificationMapper.selectByMessageId(message.getMessageId()) != null) {
            return;
        }
        Notification notification = Notification.builder()
            .messageId(message.getMessageId())
            .type(message.getType() != null ? message.getType().name() : null)
            .title(message.getTitle())
            .content(message.getContent())
            .targetUserId(message.getTargetUserId())
            .senderId(message.getSenderId())
            .level(message.getLevel() != null ? message.getLevel().name() : null)
            .extraData(message.getExtraData())
            .isRead(false)
            .createTime(message.getCreateTime())
            .expireTime(message.getExpireTime())
            .build();
        notificationMapper.insert(notification);
    }
} 