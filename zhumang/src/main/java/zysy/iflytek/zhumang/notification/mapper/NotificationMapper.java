package zysy.iflytek.zhumang.notification.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import zysy.iflytek.zhumang.notification.entity.Notification;

import java.util.List;

/**
 * 通知Mapper接口
 */
@Mapper
public interface NotificationMapper extends BaseMapper<Notification> {
    /**
     * 查询某用户未读的CALL类型通知
     */
    @Select("SELECT * FROM notification WHERE target_user_id = #{userId} AND is_read = 0 AND type = 'CALL' ORDER BY create_time ASC")
    List<Notification> selectUnreadCallNotifications(Long userId);

    /**
     * 根据messageId查询通知
     */
    @org.apache.ibatis.annotations.Select("SELECT * FROM notification WHERE message_id = #{messageId} LIMIT 1")
    Notification selectByMessageId(String messageId);

    /**
     * 根据id将通知标记为已读
     */
    @Update("UPDATE notification SET is_read = 1, read_time = NOW() WHERE id = #{id}")
    int markAsRead(Long id);
} 