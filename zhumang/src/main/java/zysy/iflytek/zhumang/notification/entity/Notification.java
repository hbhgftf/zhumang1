package zysy.iflytek.zhumang.notification.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

/**
 * 通知实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TableName("notification")
public class Notification {
    
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 消息ID
     */
    private String messageId;
    
    /**
     * 通知类型
     */
    private String type;
    
    /**
     * 通知标题
     */
    private String title;
    
    /**
     * 通知内容
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
     * 通知级别
     */
    private String level;
    
    /**
     * 额外数据
     */
    private String extraData;
    
    /**
     * 是否已读
     */
    private Boolean isRead;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 过期时间
     */
    private LocalDateTime expireTime;
    
    /**
     * 阅读时间
     */
    private LocalDateTime readTime;
} 