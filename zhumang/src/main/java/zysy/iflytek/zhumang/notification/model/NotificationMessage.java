package zysy.iflytek.zhumang.notification.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 通知消息模型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationMessage implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    /**
     * 消息ID
     */
    private String messageId;
    
    /**
     * 消息类型
     */
    private NotificationType type;
    
    /**
     * 标题
     */
    private String title;
    
    /**
     * 内容
     */
    private String content;
    
    /**
     * 目标用户ID
     */
    private Long targetUserId;
    
    /**
     * 发送者ID
     */
    private Long senderId;
    
    /**
     * 消息级别
     */
    private NotificationLevel level;
    
    /**
     * 额外数据
     */
    private String extraData;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 过期时间
     */
    private LocalDateTime expireTime;
    
    /**
     * 是否已读
     */
    private Boolean isRead;
    
    /**
     * 通知类型枚举
     */
    public enum NotificationType {
        SYSTEM,         // 系统通知
        CALL,           // 通话通知
        EMAIL,          // 邮件通知
        USER,           // 用户通知
        POLICY,         // 政策通知
        FAQ             // FAQ通知
    }
    
    /**
     * 通知级别枚举
     */
    public enum NotificationLevel {
        LOW,            // 低优先级
        NORMAL,         // 普通优先级
        HIGH,           // 高优先级
        URGENT          // 紧急优先级
    }
} 