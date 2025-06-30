package zysy.iflytek.zhumang.call.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zysy.iflytek.zhumang.call.entity.CallRecord;
import zysy.iflytek.zhumang.call.mapper.CallRecordMapper;
import zysy.iflytek.zhumang.call.model.CallMessage;
import zysy.iflytek.zhumang.call.model.CallMessageType;
import zysy.iflytek.zhumang.call.service.CallService;
import zysy.iflytek.zhumang.call.websocket.CallWebSocketHandler;
import zysy.iflytek.zhumang.common.exception.BusinessException;
import zysy.iflytek.zhumang.notification.service.NotificationProducerService;
import zysy.iflytek.zhumang.user.entity.User;
import zysy.iflytek.zhumang.user.service.IUserService;
import zysy.iflytek.zhumang.redis.volunteer.service.VolunteerStatusService;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class CallServiceImpl extends ServiceImpl<CallRecordMapper, CallRecord> implements CallService {

    @Autowired
    private CallWebSocketHandler webSocketHandler;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private IUserService userService;

    @Autowired
    private VolunteerStatusService volunteerStatusService;

    @Autowired
    private NotificationProducerService notificationProducerService;

    private static final long CALL_TIMEOUT = 300; // 通话超时时间（秒）
    private static final long REJECT_RECORD_EXPIRE = 3600; // 拒绝记录过期时间（秒，1小时）
    private static final String REJECT_RECORD_KEY_PREFIX = "call:reject:user:";

    @Override
    @Transactional
    public void handleCallRequest(Long userId, CallMessage message) {
        log.info("Handling call request from user {}", userId);
        
        // 验证用户是否为视障用户
        User user = userService.getById(userId);
        if (user == null || !"视障用户".equals(user.getRole())) {
            log.error("Invalid user role for call request: userId={}, role={}", userId, user != null ? user.getRole() : "null");
            throw new BusinessException("只有视障用户可以发起通话请求");
        }

        // 清除用户之前的拒绝记录，给所有志愿者重新接受通话的机会
        clearRejectedVolunteers(userId);
        log.info("Cleared previous reject records for user {} to allow all volunteers to be considered", userId);

        // 获取在线志愿者列表，排除已拒绝的志愿者
        List<Long> availableVolunteers = getAvailableVolunteers(userId);
        log.info("Available volunteers count: {} for user {}", availableVolunteers.size(), userId);
        
        if (availableVolunteers.isEmpty()) {
            log.info("No available volunteers for user {}", userId);
            CallMessage response = new CallMessage();
            response.setType(CallMessageType.ERROR);
            response.setContent("当前没有可用的在线志愿者");
            webSocketHandler.sendMessage(userId, response);
            return;
        }

        // 随机选择一个可用志愿者
        Long selectedVolunteerId = availableVolunteers.get(new Random().nextInt(availableVolunteers.size()));
        log.info("Selected volunteer {} for user {}", selectedVolunteerId, userId);

        // 创建通话记录
        CallRecord callRecord = createCallRecord(userId, selectedVolunteerId);
        log.info("Created call record: roomId={}, callerId={}, calleeId={}", 
            callRecord.getRoomId(), callRecord.getCallerId(), callRecord.getCalleeId());

        // 发送通话请求给选中的志愿者
        CallMessage volunteerMessage = new CallMessage();
        volunteerMessage.setType(CallMessageType.CALL_REQUEST);
        volunteerMessage.setRoomId(callRecord.getRoomId());
        volunteerMessage.setCallerId(userId);
        volunteerMessage.setCalleeId(selectedVolunteerId);
        log.info("Sending call request to volunteer {}: roomId={}", selectedVolunteerId, callRecord.getRoomId());
        webSocketHandler.sendMessage(selectedVolunteerId, volunteerMessage);

        // 发送通话通知给志愿者
        try {
            User caller = userService.getById(userId);
            String notificationTitle = "新的通话请求";
            String notificationContent = String.format("您收到了来自用户 %s 的通话请求，房间号：%s", 
                caller != null ? caller.getUsername() : "未知用户", callRecord.getRoomId());
            String extraData = String.format("{\"roomId\":\"%s\",\"callerId\":%d,\"callerName\":\"%s\"}", 
                callRecord.getRoomId(), userId, caller != null ? caller.getUsername() : "未知用户");
            
            notificationProducerService.sendCallNotification(
                notificationTitle, 
                notificationContent, 
                selectedVolunteerId, 
                extraData
            );
            log.info("Sent call notification to volunteer {}", selectedVolunteerId);
        } catch (Exception e) {
            log.error("Failed to send call notification to volunteer {}", selectedVolunteerId, e);
        }

        // 设置通话超时检查
        scheduleCallTimeout(callRecord.getRoomId());
        log.info("Call timeout scheduled for room {}", callRecord.getRoomId());
    }

    @Override
    @Transactional
    public void handleCallAccept(Long userId, CallMessage message) {
        // 验证用户是否为志愿者
        User user = userService.getById(userId);
        if (user == null || !"志愿者".equals(user.getRole())) {
            throw new BusinessException("只有志愿者可以接受通话请求");
        }

        CallRecord callRecord = getCallRecord(message.getRoomId());
        if (callRecord == null) {
            throw new BusinessException("通话记录不存在");
        }

        if (!userId.equals(callRecord.getCalleeId())) {
            throw new BusinessException("无权接受此通话请求");
        }

        // 更新通话状态为进行中
        updateCallStatus(message.getRoomId(), 1);
        callRecord.setStartTime(new Date());

        // 清除该用户的拒绝记录，因为通话已成功建立
        clearRejectedVolunteers(callRecord.getCallerId());

        // 通知主叫用户通话已接受，包含详细的用户信息
        CallMessage callerMessage = new CallMessage();
        callerMessage.setType(CallMessageType.CALL_ACCEPT);
        callerMessage.setRoomId(message.getRoomId());
        callerMessage.setCallerId(callRecord.getCallerId());
        callerMessage.setCalleeId(callRecord.getCalleeId());
        
        // 添加详细的用户信息，帮助前端识别角色
        Map<String, Object> data = new HashMap<>();
        data.put("callerId", callRecord.getCallerId());
        data.put("calleeId", callRecord.getCalleeId());
        data.put("roomId", message.getRoomId());
        data.put("callerRole", "视障用户");  // 主叫方角色
        data.put("calleeRole", "志愿者");    // 被叫方角色
        callerMessage.setData(data);

        // 发送给主叫方
        webSocketHandler.sendMessage(callRecord.getCallerId(), callerMessage);
        
        // 发送通话接受通知给主叫用户
        try {
            User volunteer = userService.getById(userId);
            String notificationTitle = "通话已接受";
            String notificationContent = String.format("志愿者 %s 已接受您的通话请求，房间号：%s", 
                volunteer != null ? volunteer.getUsername() : "未知志愿者", message.getRoomId());
            String extraData = String.format("{\"roomId\":\"%s\",\"volunteerId\":%d,\"volunteerName\":\"%s\"}", 
                message.getRoomId(), userId, volunteer != null ? volunteer.getUsername() : "未知志愿者");
            
            notificationProducerService.sendCallNotification(
                notificationTitle, 
                notificationContent, 
                callRecord.getCallerId(), 
                extraData
            );
            log.info("Sent call accept notification to caller {}", callRecord.getCallerId());
        } catch (Exception e) {
            log.error("Failed to send call accept notification to caller {}", callRecord.getCallerId(), e);
        }
        
        log.info("Sending CALL_ACCEPT to caller {}: callerId={}, calleeId={}, roomId={}", 
            callRecord.getCallerId(), callRecord.getCallerId(), callRecord.getCalleeId(), message.getRoomId());
    }

    @Override
    @Transactional
    public void handleCallReject(Long userId, CallMessage message) {
        CallRecord callRecord = getCallRecord(message.getRoomId());
        if (callRecord == null) {
            throw new BusinessException("通话记录不存在");
        }
        if (!userId.equals(callRecord.getCalleeId())) {
            throw new BusinessException("无权拒绝此通话请求");
        }
        // 更新通话状态为已拒绝
        updateCallStatus(message.getRoomId(), 3);
        // 记录拒绝的志愿者
        recordRejectedVolunteer(callRecord.getCallerId(), userId);
        // 通知主叫用户通话被拒绝
        CallMessage callerMessage = new CallMessage();
        callerMessage.setType(CallMessageType.CALL_REJECT);
        callerMessage.setRoomId(message.getRoomId());
        callerMessage.setCallerId(callRecord.getCallerId());
        callerMessage.setCalleeId(userId);
        webSocketHandler.sendMessage(callRecord.getCallerId(), callerMessage);

        // 发送通话拒绝通知给主叫用户
        try {
            User volunteer = userService.getById(userId);
            String notificationTitle = "通话被拒绝";
            String notificationContent = String.format("志愿者 %s 拒绝了您的通话请求，正在为您重新分配志愿者", 
                volunteer != null ? volunteer.getUsername() : "未知志愿者");
            String extraData = String.format("{\"roomId\":\"%s\",\"volunteerId\":%d,\"volunteerName\":\"%s\"}", 
                message.getRoomId(), userId, volunteer != null ? volunteer.getUsername() : "未知志愿者");
            
            notificationProducerService.sendCallNotification(
                notificationTitle, 
                notificationContent, 
                callRecord.getCallerId(), 
                extraData
            );
            log.info("Sent call reject notification to caller {}", callRecord.getCallerId());
        } catch (Exception e) {
            log.error("Failed to send call reject notification to caller {}", callRecord.getCallerId(), e);
        }

        // 尝试重新分配
        tryReassignVolunteer(callRecord.getCallerId(), message);
    }

    private void tryReassignVolunteer(Long userId, CallMessage message) {
        List<Long> availableVolunteers = getAvailableVolunteers(userId);
        if (availableVolunteers.isEmpty()) {
            // 所有在线志愿者都拒绝过，清除记录并提示
            clearRejectedVolunteers(userId);
            CallMessage response = new CallMessage();
            response.setType(CallMessageType.ERROR);
            response.setContent("当前没有可用的在线志愿者，请稍后再试");
            webSocketHandler.sendMessage(userId, response);
            return;
        }
        // 还有可用志愿者，继续分配
        Long selectedVolunteerId = availableVolunteers.get(new Random().nextInt(availableVolunteers.size()));
        CallRecord callRecord = createCallRecord(userId, selectedVolunteerId);
        CallMessage volunteerMessage = new CallMessage();
        volunteerMessage.setType(CallMessageType.CALL_REQUEST);
        volunteerMessage.setRoomId(callRecord.getRoomId());
        volunteerMessage.setCallerId(userId);
        volunteerMessage.setCalleeId(selectedVolunteerId);
        webSocketHandler.sendMessage(selectedVolunteerId, volunteerMessage);
        scheduleCallTimeout(callRecord.getRoomId());
    }

    @Override
    @Transactional
    public void handleCallEnd(Long userId, CallMessage message) {
        CallRecord callRecord = getCallRecord(message.getRoomId());
        if (callRecord == null) {
            throw new BusinessException("通话记录不存在");
        }

        if (!userId.equals(callRecord.getCallerId()) && !userId.equals(callRecord.getCalleeId())) {
            throw new BusinessException("无权结束此通话");
        }

        endCall(message.getRoomId());

        // 通知对方通话已结束
        Long otherUserId = userId.equals(callRecord.getCallerId()) ? callRecord.getCalleeId() : callRecord.getCallerId();
        CallMessage endMessage = new CallMessage();
        endMessage.setType(CallMessageType.CALL_END);
        endMessage.setRoomId(message.getRoomId());
        endMessage.setCallerId(callRecord.getCallerId());
        endMessage.setCalleeId(callRecord.getCalleeId());
        webSocketHandler.sendMessage(otherUserId, endMessage);
    }

    @Override
    public void updateVolunteerStatus(Long userId, boolean online) {
        User user = userService.getById(userId);
        if (user == null || !"志愿者".equals(user.getRole())) {
            return;
        }
        volunteerStatusService.setVolunteerStatus(userId, online);
    }

    @Override
    public void updateVolunteerHeartbeat(Long userId) {
        volunteerStatusService.refreshVolunteerStatus(userId);
    }

    @Override
    public List<Long> getOnlineVolunteers() {
        return volunteerStatusService.getOnlineVolunteers();
    }

    @Override
    public CallRecord getCallRecord(String roomId) {
        return lambdaQuery()
            .eq(CallRecord::getRoomId, roomId)
            .one();
    }

    @Override
    @Transactional
    public CallRecord createCallRecord(Long callerId, Long calleeId) {
        CallRecord callRecord = new CallRecord();
        callRecord.setRoomId(generateRoomId());
        callRecord.setCallerId(callerId);
        callRecord.setCalleeId(calleeId);
        callRecord.setStatus(0); // 等待中
        callRecord.setCreatedTime(new Date());
        save(callRecord);
        return callRecord;
    }

    @Override
    @Transactional
    public void updateCallStatus(String roomId, Integer status) {
        lambdaUpdate()
            .eq(CallRecord::getRoomId, roomId)
            .set(CallRecord::getStatus, status)
            .update();
    }

    @Override
    @Transactional
    public void endCall(String roomId) {
        CallRecord callRecord = getCallRecord(roomId);
        if (callRecord != null) {
            Date endTime = new Date();
            long duration = (endTime.getTime() - callRecord.getStartTime().getTime()) / 1000;

            lambdaUpdate()
                .eq(CallRecord::getRoomId, roomId)
                .set(CallRecord::getStatus, 2) // 已结束
                .set(CallRecord::getEndTime, endTime)
                .set(CallRecord::getDuration, (int) duration)
                .update();
        }
    }

    private String generateRoomId() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    private void scheduleCallTimeout(String roomId) {
        redisTemplate.opsForValue().set(
            "call:timeout:" + roomId,
            roomId,
            CALL_TIMEOUT,
            TimeUnit.SECONDS
        );
    }

    private List<Long> getAvailableVolunteers(Long userId) {
        // 获取所有在线志愿者
        List<Long> onlineVolunteers = getOnlineVolunteers();
        if (onlineVolunteers.isEmpty()) {
            return new ArrayList<>();
        }

        // 获取该用户已拒绝的志愿者列表
        Set<Long> rejectedVolunteers = getRejectedVolunteers(userId);
        
        // 过滤掉已拒绝的志愿者
        List<Long> availableVolunteers = new ArrayList<>();
        for (Long volunteerId : onlineVolunteers) {
            if (!rejectedVolunteers.contains(volunteerId)) {
                availableVolunteers.add(volunteerId);
            }
        }
        
        log.info("User {} has {} rejected volunteers, {} available volunteers out of {} online volunteers", 
            userId, rejectedVolunteers.size(), availableVolunteers.size(), onlineVolunteers.size());
        
        return availableVolunteers;
    }

    private void recordRejectedVolunteer(Long callerId, Long rejectedUserId) {
        String key = REJECT_RECORD_KEY_PREFIX + callerId;
        try {
            // 获取现有的拒绝记录
            String existingRejects = redisTemplate.opsForValue().get(key);
            Set<Long> rejectedSet = new HashSet<>();
            
            if (existingRejects != null && !existingRejects.isEmpty()) {
                // 解析现有的拒绝记录
                String[] rejectedIds = existingRejects.split(",");
                for (String id : rejectedIds) {
                    if (!id.trim().isEmpty()) {
                        rejectedSet.add(Long.parseLong(id.trim()));
                    }
                }
            }
            
            // 添加新的拒绝记录
            rejectedSet.add(rejectedUserId);
            
            // 将拒绝记录保存到Redis，设置过期时间
            String rejectedIdsStr = String.join(",", rejectedSet.stream().map(String::valueOf).toArray(String[]::new));
            redisTemplate.opsForValue().set(key, rejectedIdsStr, REJECT_RECORD_EXPIRE, TimeUnit.SECONDS);
            
            log.info("Recorded rejected volunteer {} for user {}, total rejected: {}", 
                rejectedUserId, callerId, rejectedSet.size());
        } catch (Exception e) {
            log.error("Failed to record rejected volunteer {} for user {}", rejectedUserId, callerId, e);
        }
    }

    private Set<Long> getRejectedVolunteers(Long userId) {
        String key = REJECT_RECORD_KEY_PREFIX + userId;
        Set<Long> rejectedSet = new HashSet<>();
        
        try {
            String rejectedIds = redisTemplate.opsForValue().get(key);
            if (rejectedIds != null && !rejectedIds.isEmpty()) {
                String[] rejectedIdArray = rejectedIds.split(",");
                for (String id : rejectedIdArray) {
                    if (!id.trim().isEmpty()) {
                        rejectedSet.add(Long.parseLong(id.trim()));
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to get rejected volunteers for user {}", userId, e);
        }
        
        return rejectedSet;
    }

    private void clearRejectedVolunteers(Long userId) {
        String key = REJECT_RECORD_KEY_PREFIX + userId;
        try {
            redisTemplate.delete(key);
            log.info("Cleared rejected volunteers for user {}", userId);
        } catch (Exception e) {
            log.error("Failed to clear rejected volunteers for user {}", userId, e);
        }
    }
} 