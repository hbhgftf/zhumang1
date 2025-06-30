package zysy.iflytek.zhumang.notification.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import zysy.iflytek.zhumang.common.model.Result;
import zysy.iflytek.zhumang.notification.service.NotificationProducerService;
import zysy.iflytek.zhumang.notification.mapper.NotificationMapper;

/**
 * 通知控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/notification")
@Api(tags = "通知管理")
public class NotificationController {

    @Autowired
    private NotificationProducerService notificationProducerService;

    @Autowired
    private NotificationMapper notificationMapper;

    /**
     * 发送系统通知
     */
    @PostMapping("/system")
    @ApiOperation("发送系统通知")
    public Result<String> sendSystemNotification(
            @ApiParam("通知标题") @RequestParam String title,
            @ApiParam("通知内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam(required = false) Long targetUserId) {
        
        try {
            notificationProducerService.sendSystemNotification(title, content, targetUserId);
            return Result.success("系统通知发送成功");
        } catch (Exception e) {
            log.error("发送系统通知失败", e);
            return Result.error("发送系统通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送用户通知
     */
    @PostMapping("/user")
    @ApiOperation("发送用户通知")
    public Result<String> sendUserNotification(
            @ApiParam("通知标题") @RequestParam String title,
            @ApiParam("通知内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId,
            @ApiParam("发送者ID") @RequestParam Long senderId) {
        
        try {
            notificationProducerService.sendUserNotification(title, content, targetUserId, senderId);
            return Result.success("用户通知发送成功");
        } catch (Exception e) {
            log.error("发送用户通知失败", e);
            return Result.error("发送用户通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送通话通知
     */
    @PostMapping("/call")
    @ApiOperation("发送通话通知")
    public Result<String> sendCallNotification(
            @ApiParam("通知标题") @RequestParam String title,
            @ApiParam("通知内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId,
            @ApiParam("额外数据") @RequestParam(required = false) String extraData) {
        
        try {
            notificationProducerService.sendCallNotification(title, content, targetUserId, extraData);
            return Result.success("通话通知发送成功");
        } catch (Exception e) {
            log.error("发送通话通知失败", e);
            return Result.error("发送通话通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送邮件通知
     */
    @PostMapping("/email")
    @ApiOperation("发送邮件通知")
    public Result<String> sendEmailNotification(
            @ApiParam("邮件标题") @RequestParam String title,
            @ApiParam("邮件内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId) {
        
        try {
            notificationProducerService.sendEmailNotification(title, content, targetUserId);
            return Result.success("邮件通知发送成功");
        } catch (Exception e) {
            log.error("发送邮件通知失败", e);
            return Result.error("发送邮件通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送政策通知
     */
    @PostMapping("/policy")
    @ApiOperation("发送政策通知")
    public Result<String> sendPolicyNotification(
            @ApiParam("政策标题") @RequestParam String title,
            @ApiParam("政策内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId) {
        
        try {
            notificationProducerService.sendPolicyNotification(title, content, targetUserId);
            return Result.success("政策通知发送成功");
        } catch (Exception e) {
            log.error("发送政策通知失败", e);
            return Result.error("发送政策通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送FAQ通知
     */
    @PostMapping("/faq")
    @ApiOperation("发送FAQ通知")
    public Result<String> sendFAQNotification(
            @ApiParam("FAQ标题") @RequestParam String title,
            @ApiParam("FAQ内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId) {
        
        try {
            notificationProducerService.sendFAQNotification(title, content, targetUserId);
            return Result.success("FAQ通知发送成功");
        } catch (Exception e) {
            log.error("发送FAQ通知失败", e);
            return Result.error("发送FAQ通知失败: " + e.getMessage());
        }
    }

    /**
     * 发送紧急通知
     */
    @PostMapping("/urgent")
    @ApiOperation("发送紧急通知")
    public Result<String> sendUrgentNotification(
            @ApiParam("紧急通知标题") @RequestParam String title,
            @ApiParam("紧急通知内容") @RequestParam String content,
            @ApiParam("目标用户ID") @RequestParam Long targetUserId) {
        
        try {
            notificationProducerService.sendUrgentNotification(title, content, targetUserId);
            return Result.success("紧急通知发送成功");
        } catch (Exception e) {
            log.error("发送紧急通知失败", e);
            return Result.error("发送紧急通知失败: " + e.getMessage());
        }
    }

    /**
     * 标记通知为已读
     */
    @PostMapping("/read/{id}")
    @ApiOperation("标记通知为已读")
    public Result<String> markAsRead(@PathVariable Long id) {
        int updated = notificationMapper.markAsRead(id);
        if (updated > 0) {
            return Result.success("通知已标记为已读");
        } else {
            return Result.error("通知不存在或已被删除");
        }
    }
} 