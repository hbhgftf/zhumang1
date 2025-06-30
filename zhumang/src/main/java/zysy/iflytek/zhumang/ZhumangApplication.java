package zysy.iflytek.zhumang;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
@MapperScan("zysy.iflytek.zhumang.**.mapper")
public class ZhumangApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZhumangApplication.class, args);
    }
}