package zysy.iflytek.zhumang.user.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import zysy.iflytek.zhumang.user.entity.User;
import zysy.iflytek.zhumang.user.dto.UserManageDto;
import zysy.iflytek.zhumang.user.dto.EmailLoginDto;
import zysy.iflytek.zhumang.user.dto.SetPasswordDto;
import zysy.iflytek.zhumang.user.dto.UserLoginDto;
import zysy.iflytek.zhumang.user.dto.VolunteerRegisterDto;
import zysy.iflytek.zhumang.user.dto.UserInfoDto;
import zysy.iflytek.zhumang.user.dto.UserUpdateDto;
import zysy.iflytek.zhumang.user.dto.AdminRegisterDto;
import java.util.Map;

public interface IUserService extends IService<User> {
    User findByOpenid(String openid);
    void createUser(User user);

    String loginByEmailCode(String email, String code);

    /**
     * 根据邮箱查询用户
     * @param email 邮箱
     * @return 用户信息
     */
    User findByEmail(String email);

    // 用户管理相关方法
    User createUser(UserManageDto dto);
    User updateUser(UserManageDto dto);
    void deleteUser(Long id);
    IPage<User> pageUsers(Integer pageNum, Integer pageSize, String email, String role, Integer status);

    UserInfoForLogin loginByEmail(EmailLoginDto loginDto, String ip, String userAgent);
    void setPassword(SetPasswordDto setPasswordDto, String ip, String userAgent);
    UserInfoForLogin wxLogin(String code) throws Exception;
    
    // 密码登录
    UserInfoForLogin loginByPassword(UserLoginDto loginDto, String ip, String userAgent);
    
    // 注册相关
    void registerVolunteer(VolunteerRegisterDto registerDto);
    void registerAdmin(AdminRegisterDto registerDto);
    
    // Token相关
    Map<String, Object> refreshToken(String refreshToken);
    
    // 用户信息相关
    void saveUserInfo(UserInfoDto userInfo);
    void updateUserInfo(UserUpdateDto userInfo);
    Map<String, Object> getUserInfo(Long id);
    
    // UserSig相关
    Map<String, Object> getUserSig(String token);
    
    // 发送验证码
    String sendEmailCode(String email);

    // 登录返回信息
    class UserInfoForLogin {
        private String token;
        private Long id;
        private String openid;
        private String nickname;
        private String avatarUrl;
        private String role;
        
        public UserInfoForLogin(String token, Long id, String openid, String nickname, String avatarUrl, String role) {
            this.token = token;
            this.id = id;
            this.openid = openid;
            this.nickname = nickname;
            this.avatarUrl = avatarUrl;
            this.role = role;
        }
        
        // Getter methods
        public String getToken() {
            return token;
        }
        
        public Long getId() {
            return id;
        }
        
        public String getOpenid() {
            return openid;
        }
        
        public String getNickname() {
            return nickname;
        }
        
        public String getAvatarUrl() {
            return avatarUrl;
        }
        
        public String getRole() {
            return role;
        }
        
        // Setter methods
        public void setToken(String token) {
            this.token = token;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public void setOpenid(String openid) {
            this.openid = openid;
        }
        
        public void setNickname(String nickname) {
            this.nickname = nickname;
        }
        
        public void setAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }
        
        public void setRole(String role) {
            this.role = role;
        }
    }
}