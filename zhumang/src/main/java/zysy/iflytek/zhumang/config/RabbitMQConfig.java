package zysy.iflytek.zhumang.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class RabbitMQConfig {

    // 交换机名称
    public static final String NOTIFICATION_EXCHANGE = "notification.exchange";
    public static final String CALL_EXCHANGE = "call.exchange";
    
    // 队列名称
    public static final String SYSTEM_NOTIFICATION_QUEUE = "system.notification.queue";
    public static final String USER_NOTIFICATION_QUEUE = "user.notification.queue";
    public static final String CALL_NOTIFICATION_QUEUE = "call.notification.queue";
    public static final String EMAIL_NOTIFICATION_QUEUE = "email.notification.queue";
    
    // 路由键
    public static final String SYSTEM_NOTIFICATION_ROUTING_KEY = "system.notification";
    public static final String USER_NOTIFICATION_ROUTING_KEY = "user.notification";
    public static final String CALL_NOTIFICATION_ROUTING_KEY = "call.notification";
    public static final String EMAIL_NOTIFICATION_ROUTING_KEY = "email.notification";

    /**
     * 配置消息转换器
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return new Jackson2JsonMessageConverter(objectMapper);
    }

    /**
     * 配置RabbitTemplate
     */
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    /**
     * 通知交换机
     */
    @Bean
    public DirectExchange notificationExchange() {
        return new DirectExchange(NOTIFICATION_EXCHANGE);
    }

    /**
     * 通话交换机
     */
    @Bean
    public DirectExchange callExchange() {
        return new DirectExchange(CALL_EXCHANGE);
    }

    /**
     * 系统通知队列
     */
    @Bean
    public Queue systemNotificationQueue() {
        return QueueBuilder.durable(SYSTEM_NOTIFICATION_QUEUE)
                .withArgument("x-message-ttl", 86400000) // 24小时过期
                .build();
    }

    /**
     * 用户通知队列
     */
    @Bean
    public Queue userNotificationQueue() {
        return QueueBuilder.durable(USER_NOTIFICATION_QUEUE)
                .withArgument("x-message-ttl", 86400000) // 24小时过期
                .build();
    }

    /**
     * 通话通知队列
     */
    @Bean
    public Queue callNotificationQueue() {
        return QueueBuilder.durable(CALL_NOTIFICATION_QUEUE)
                .withArgument("x-message-ttl", 300000) // 5分钟过期
                .build();
    }

    /**
     * 邮件通知队列
     */
    @Bean
    public Queue emailNotificationQueue() {
        return QueueBuilder.durable(EMAIL_NOTIFICATION_QUEUE)
                .withArgument("x-message-ttl", 300000) // 5分钟过期
                .build();
    }

    /**
     * 绑定系统通知队列到交换机
     */
    @Bean
    public Binding systemNotificationBinding() {
        return BindingBuilder.bind(systemNotificationQueue())
                .to(notificationExchange())
                .with(SYSTEM_NOTIFICATION_ROUTING_KEY);
    }

    /**
     * 绑定用户通知队列到交换机
     */
    @Bean
    public Binding userNotificationBinding() {
        return BindingBuilder.bind(userNotificationQueue())
                .to(notificationExchange())
                .with(USER_NOTIFICATION_ROUTING_KEY);
    }

    /**
     * 绑定通话通知队列到交换机
     */
    @Bean
    public Binding callNotificationBinding() {
        return BindingBuilder.bind(callNotificationQueue())
                .to(callExchange())
                .with(CALL_NOTIFICATION_ROUTING_KEY);
    }

    /**
     * 绑定邮件通知队列到交换机
     */
    @Bean
    public Binding emailNotificationBinding() {
        return BindingBuilder.bind(emailNotificationQueue())
                .to(notificationExchange())
                .with(EMAIL_NOTIFICATION_ROUTING_KEY);
    }
} 