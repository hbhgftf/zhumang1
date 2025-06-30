package zysy.iflytek.zhumang.call.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import zysy.iflytek.zhumang.call.service.CallService;
import zysy.iflytek.zhumang.call.model.CallMessage;
import zysy.iflytek.zhumang.call.model.CallMessageType;
import zysy.iflytek.zhumang.utils.JwtUtils;
import zysy.iflytek.zhumang.notification.mapper.NotificationMapper;
import zysy.iflytek.zhumang.notification.entity.Notification;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class CallWebSocketHandler implements WebSocketHandler {

    @Autowired
    private CallService callService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NotificationMapper notificationMapper;

    // 存储用户ID和WebSocket会话的映射关系
    private static final Map<Long, WebSocketSession> USER_SESSIONS = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("WebSocket连接建立 - Session ID: {}, URI: {}", session.getId(), session.getUri());
        
        Long userId = getUserIdFromSession(session);
        log.info("从session解析出的用户ID: {}", userId);
        
        if (userId != null) {
            USER_SESSIONS.put(userId, session);
            callService.updateVolunteerStatus(userId, true);
            log.info("User {} connected successfully. Current online users: {}. Session ID: {}", 
                userId, USER_SESSIONS.size(), session.getId());

            // === 新增：补发未读CALL通知 ===
            try {
                java.util.List<Notification> unreadCallNotices = notificationMapper.selectUnreadCallNotifications(userId);
                if (unreadCallNotices != null && !unreadCallNotices.isEmpty()) {
                    log.info("[WebSocket补发] 用户{}有{}条未读CALL通知，准备补发...", userId, unreadCallNotices.size());
                    for (Notification notice : unreadCallNotices) {
                        CallMessage wsMsg = new CallMessage();
                        wsMsg.setType(CallMessageType.CALL);
                        wsMsg.setContent(notice.getContent());
                        // 解析roomId
                        String roomId = null;
                        if (notice.getExtraData() != null && !notice.getExtraData().isEmpty()) {
                            try {
                                com.fasterxml.jackson.databind.JsonNode node = objectMapper.readTree(notice.getExtraData());
                                roomId = node.path("roomId").asText("");
                            } catch (Exception e) {
                                log.warn("解析extraData获取roomId失败: {}", e.getMessage());
                            }
                        }
                        wsMsg.setRoomId(roomId);
                        wsMsg.setCallerId(notice.getSenderId());
                        wsMsg.setCalleeId(notice.getTargetUserId());
                        wsMsg.setData(notice);
                        sendMessage(userId, wsMsg);
                        log.info("[WebSocket补发] 已补发未读CALL通知给用户{}: {}", userId, wsMsg);
                    }
                } else {
                    log.info("[WebSocket补发] 用户{}没有未读CALL通知", userId);
                }
            } catch (Exception e) {
                log.error("[WebSocket补发] 查询或推送未读CALL通知异常", e);
            }
            // === 补发结束 ===
        } else {
            log.error("Failed to establish WebSocket connection: Invalid user token for session {}", session.getId());
            // 发送错误消息给客户端
            sendErrorMessage(session, "Invalid user token");
            // 关闭连接
            session.close();
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        if (message instanceof TextMessage) {
            String payload = ((TextMessage) message).getPayload();
            log.info("Received WebSocket message: {}", payload);
            
            CallMessage callMessage = objectMapper.readValue(payload, CallMessage.class);
            Long userId = getUserIdFromSession(session);

            if (userId == null) {
                log.error("Received message from unauthorized session: {}", session.getId());
                sendErrorMessage(session, "Unauthorized");
                return;
            }

            log.info("Processing message from user {}: type={}", userId, callMessage.getType());
            handleCallMessage(userId, callMessage);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("WebSocket transport error: ", exception);
        Long userId = getUserIdFromSession(session);
        if (userId != null) {
            USER_SESSIONS.remove(userId);
            callService.updateVolunteerStatus(userId, false);
            log.info("User {} disconnected due to transport error", userId);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Long userId = getUserIdFromSession(session);
        if (userId != null) {
            USER_SESSIONS.remove(userId);
            callService.updateVolunteerStatus(userId, false);
            log.info("User {} disconnected, status: {}", userId, status);
        }
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    private void handleCallMessage(Long userId, CallMessage message) {
        try {
            switch (message.getType()) {
                case CALL_REQUEST:
                    callService.handleCallRequest(userId, message);
                    break;
                case CALL_ACCEPT:
                    callService.handleCallAccept(userId, message);
                    break;
                case CALL_REJECT:
                    callService.handleCallReject(userId, message);
                    break;
                case CALL_END:
                    callService.handleCallEnd(userId, message);
                    break;
                case HEARTBEAT:
                    handleHeartbeat(userId);
                    break;
                default:
                    log.warn("Unknown message type: {}", message.getType());
            }
        } catch (Exception e) {
            log.error("Error handling call message: ", e);
            WebSocketSession session = USER_SESSIONS.get(userId);
            if (session != null) {
                sendErrorMessage(session, "Error processing message: " + e.getMessage());
            }
        }
    }

    private void handleHeartbeat(Long userId) {
        callService.updateVolunteerHeartbeat(userId);
    }

    private Long getUserIdFromSession(WebSocketSession session) {
        log.info("开始解析session中的用户ID - Session ID: {}", session.getId());
        
        String query = session.getUri().getQuery();
        log.info("Session URI查询参数: {}", query);
        
        if (query == null) {
            log.error("Session URI查询参数为空");
            return null;
        }
        
        if (!query.startsWith("token=")) {
            log.error("Session URI查询参数格式不正确，期望以'token='开头，实际为: {}", query);
            return null;
        }
        
        String token = query.substring(6); // 移除 "token=" 前缀
        log.info("提取的token: {}", token);
        
        try {
            Long userId = JwtUtils.getUserIdFromToken(token);
            log.info("成功从token解析出用户ID: {}", userId);
            return userId;
        } catch (Exception e) {
            log.error("解析token失败: {}", e.getMessage(), e);
            return null;
        }
    }

    public void sendMessage(Long userId, CallMessage message) {
        WebSocketSession session = USER_SESSIONS.get(userId);
        log.info("Attempting to send message to user {}: type={}, roomId={}, callerId={}, calleeId={}", 
            userId, message.getType(), message.getRoomId(), message.getCallerId(), message.getCalleeId());
        
        if (session == null) {
            log.error("User {} has no active WebSocket session", userId);
            return;
        }
        
        if (!session.isOpen()) {
            log.error("User {}'s WebSocket session is closed", userId);
            return;
        }
        
        try {
            String payload = objectMapper.writeValueAsString(message);
            session.sendMessage(new TextMessage(payload));
            log.info("Successfully sent message to user {}: {}", userId, payload);
        } catch (IOException e) {
            log.error("Error sending message to user {}: ", userId, e);
        }
    }

    private void sendErrorMessage(WebSocketSession session, String error) {
        try {
            CallMessage errorMessage = new CallMessage();
            errorMessage.setType(CallMessageType.ERROR);
            errorMessage.setContent(error);
            String payload = objectMapper.writeValueAsString(errorMessage);
            session.sendMessage(new TextMessage(payload));
        } catch (IOException e) {
            log.error("Error sending error message: ", e);
        }
    }
} 