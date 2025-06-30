package zysy.iflytek.zhumang.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zysy.iflytek.zhumang.config.RabbitMQConfig;
import zysy.iflytek.zhumang.notification.model.NotificationMessage;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 通知消息生产者服务
 */
@Slf4j
@Service
public class NotificationProducerService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 发送系统通知
     */
    public void sendSystemNotification(String title, String content, Long targetUserId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.SYSTEM)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.NORMAL)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusDays(1))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.SYSTEM_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送系统通知: {}", message);
    }

    /**
     * 发送用户通知
     */
    public void sendUserNotification(String title, String content, Long targetUserId, Long senderId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.USER)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .senderId(senderId)
                .level(NotificationMessage.NotificationLevel.NORMAL)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusDays(1))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.USER_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送用户通知: {}", message);
    }

    /**
     * 发送通话通知
     */
    public void sendCallNotification(String title, String content, Long targetUserId, String extraData) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.CALL)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.HIGH)
                .extraData(extraData)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusMinutes(5))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.CALL_EXCHANGE,
                RabbitMQConfig.CALL_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送通话通知: {}", message);
    }

    /**
     * 发送邮件通知
     */
    public void sendEmailNotification(String title, String content, Long targetUserId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.EMAIL)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.NORMAL)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusMinutes(5))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.EMAIL_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送邮件通知: {}", message);
    }

    /**
     * 发送政策通知
     */
    public void sendPolicyNotification(String title, String content, Long targetUserId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.POLICY)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.NORMAL)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusDays(7))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.USER_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送政策通知: {}", message);
    }

    /**
     * 发送FAQ通知
     */
    public void sendFAQNotification(String title, String content, Long targetUserId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.FAQ)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.LOW)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusDays(3))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.USER_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送FAQ通知: {}", message);
    }

    /**
     * 发送紧急通知
     */
    public void sendUrgentNotification(String title, String content, Long targetUserId) {
        NotificationMessage message = NotificationMessage.builder()
                .messageId(UUID.randomUUID().toString())
                .type(NotificationMessage.NotificationType.SYSTEM)
                .title(title)
                .content(content)
                .targetUserId(targetUserId)
                .level(NotificationMessage.NotificationLevel.URGENT)
                .createTime(LocalDateTime.now())
                .expireTime(LocalDateTime.now().plusHours(1))
                .isRead(false)
                .build();
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.SYSTEM_NOTIFICATION_ROUTING_KEY,
                message
        );
        
        log.info("发送紧急通知: {}", message);
    }
} 