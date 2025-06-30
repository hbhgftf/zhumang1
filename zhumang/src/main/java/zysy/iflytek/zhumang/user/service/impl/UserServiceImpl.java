package zysy.iflytek.zhumang.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import zysy.iflytek.zhumang.user.entity.User;
import zysy.iflytek.zhumang.user.mapper.IUserMapper;
import zysy.iflytek.zhumang.user.service.IUserService;
import zysy.iflytek.zhumang.utils.JwtUtils;
import java.util.Date;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import zysy.iflytek.zhumang.common.exception.BusinessException;
import zysy.iflytek.zhumang.user.dto.UserManageDto;
import zysy.iflytek.zhumang.utils.PasswordUtils;
import zysy.iflytek.zhumang.user.dto.EmailLoginDto;
import zysy.iflytek.zhumang.user.dto.SetPasswordDto;
import zysy.iflytek.zhumang.user.service.IUserService.UserInfoForLogin;
import zysy.iflytek.zhumang.user.service.ILoginLogService;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import zysy.iflytek.zhumang.user.dto.UserLoginDto;
import zysy.iflytek.zhumang.user.dto.VolunteerRegisterDto;
import zysy.iflytek.zhumang.user.dto.UserInfoDto;
import zysy.iflytek.zhumang.user.dto.UserUpdateDto;
import zysy.iflytek.zhumang.user.dto.AdminRegisterDto;
import zysy.iflytek.zhumang.common.email.MailMsg;
import zysy.iflytek.zhumang.utils.GenerateTestUserSig;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl extends ServiceImpl<IUserMapper, User>
        implements IUserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Resource
    private ILoginLogService loginLogService;

    @Resource
    private MailMsg mailMsg;

    private static final String EMAIL_CODE_PREFIX = "email:code:";
    private static final long CODE_EXPIRE_MINUTES = 5;

    // 登录失败相关常量
    private static final String LOGIN_FAIL_PREFIX = "login:fail:";
    private static final int MAX_FAIL_COUNT = 5;
    private static final long LOCK_TIME = 30; // 锁定时间（分钟）

    @Override
    public User findByOpenid(String openid) {
        return baseMapper.selectByOpenid(openid);
    }

    @Override
    public void createUser(User user) {
        baseMapper.insert(user);
    }

    @Override
    public String loginByEmailCode(String email, String code) {
        // 1. 从Redis获取验证码
        String savedCode = redisTemplate.opsForValue().get(email);
        if (savedCode == null) {
            throw new RuntimeException("验证码已过期");
        }

        // 2. 验证码校验
        if (!savedCode.equals(code)) {
            throw new RuntimeException("验证码错误");
        }

        // 3. 查找或创建用户
        User user = lambdaQuery().eq(User::getEmail, email).one();
        if (user == null) {
            // 创建新用户
            user = new User();
            user.setEmail(email);
            user.setCreatedTime(new Date());
            user.setRole("视障用户"); // 设置默认角色
            // 保存用户并获取ID
            save(user);
            // 立即刷新用户对象以获取ID
            user = getById(user.getId());
            if (user == null) {
                throw new RuntimeException("用户创建失败");
            }
        }

        // 4. 生成JWT token
        String token = JwtUtils.generateToken(user.getId());

        // 5. 删除已使用的验证码
        redisTemplate.delete(email);

        return token;
    }

    @Override
    public User findByEmail(String email) {
        return getOne(new LambdaQueryWrapper<User>()
                .eq(User::getEmail, email)
                .last("LIMIT 1"));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public User createUser(UserManageDto dto) {
        // 检查邮箱是否已存在
        if (findByEmail(dto.getEmail()) != null) {
            throw new BusinessException("邮箱已被使用");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setCreatedTime(new Date());
        user.setStatus(dto.getStatus() != null ? dto.getStatus() : 1); // 默认状态为正常

        // 如果提供了密码，则加密存储
        if (StringUtils.hasText(dto.getPassword())) {
            user.setPassword(PasswordUtils.encode(dto.getPassword()));
        }

        save(user);
        return user;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public User updateUser(UserManageDto dto) {
        User user = getById(dto.getId());
        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // 如果修改了邮箱，需要检查新邮箱是否已被使用
        if (!user.getEmail().equals(dto.getEmail())) {
            User existingUser = findByEmail(dto.getEmail());
            if (existingUser != null && !existingUser.getId().equals(dto.getId())) {
                throw new BusinessException("邮箱已被使用");
            }
            user.setEmail(dto.getEmail());
        }

        user.setRole(dto.getRole());
        if (dto.getStatus() != null) {
            user.setStatus(dto.getStatus());
        }

        // 如果提供了新密码，则更新密码
        if (StringUtils.hasText(dto.getPassword())) {
            user.setPassword(PasswordUtils.encode(dto.getPassword()));
        }

        updateById(user);
        return user;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long id) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        removeById(id);
    }

    @Override
    public IPage<User> pageUsers(Integer pageNum, Integer pageSize, String email, String role, Integer status) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(StringUtils.hasText(email), User::getEmail, email)
                .eq(StringUtils.hasText(role), User::getRole, role)
                .eq(status != null, User::getStatus, status)
                .orderByDesc(User::getCreatedTime);
        
        return page(new Page<>(pageNum, pageSize), wrapper);
    }

    @Override
    public UserInfoForLogin loginByEmail(EmailLoginDto loginDto, String ip, String userAgent) {
        if (loginDto.getEmail() == null || loginDto.getEmail().trim().isEmpty()) {
            throw new BusinessException("邮箱不能为空");
        }
        if (loginDto.getCode() == null || loginDto.getCode().trim().isEmpty()) {
            throw new BusinessException("验证码不能为空");
        }
        // 从Redis获取验证码
        String storedCode = redisTemplate.opsForValue().get(loginDto.getEmail());
        if (storedCode == null) {
            throw new BusinessException("验证码不存在或已过期，请重新获取验证码");
        }
        if (!loginDto.getCode().equals(storedCode)) {
            throw new BusinessException("验证码错误");
        }
        // 验证码正确，查找或创建用户
        User user = findByEmail(loginDto.getEmail());
        if (user == null) {
            user = new User();
            user.setEmail(loginDto.getEmail());
            user.setCreatedTime(new Date());
            user.setRole("视障用户");
            user.setStatus(1);
            save(user);
            user = findByEmail(loginDto.getEmail());
        }
        if (user.getStatus() != null && user.getStatus() == 0) {
            loginLogService.recordLoginLog(user.getId(), loginDto.getEmail(), ip, userAgent, false, "账号被禁用");
            throw new BusinessException("账号已被禁用，请联系管理员");
        }
        String token = JwtUtils.generateToken(user.getId());
        String refreshToken = JwtUtils.generateRefreshToken(user.getId());
        redisTemplate.delete(loginDto.getEmail());
        loginLogService.recordLoginLog(user.getId(), loginDto.getEmail(), ip, userAgent, true, null);
        return new UserInfoForLogin(token, user.getId(), user.getOpenid(), user.getNickname(), user.getAvatarUrl(), user.getRole());
    }

    @Override
    public void setPassword(SetPasswordDto setPasswordDto, String ip, String userAgent) {
        if (setPasswordDto.getEmail() == null || setPasswordDto.getEmail().trim().isEmpty()) {
            throw new BusinessException("邮箱不能为空");
        }
        if (setPasswordDto.getCode() == null || setPasswordDto.getCode().trim().isEmpty()) {
            throw new BusinessException("验证码不能为空");
        }
        if (setPasswordDto.getPassword() == null || setPasswordDto.getPassword().trim().isEmpty()) {
            throw new BusinessException("密码不能为空");
        }
        String storedCode = redisTemplate.opsForValue().get(setPasswordDto.getEmail());
        if (storedCode == null) {
            throw new BusinessException("验证码不存在或已过期，请重新获取验证码");
        }
        if (!setPasswordDto.getCode().equals(storedCode)) {
            throw new BusinessException("验证码错误");
        }
        User user = findByEmail(setPasswordDto.getEmail());
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(User::getId, user.getId())
                .set(User::getPassword, PasswordUtils.encode(setPasswordDto.getPassword()));
        boolean success = update(updateWrapper);
        if (!success) {
            throw new BusinessException("密码设置失败，请重试");
        }
        redisTemplate.delete(setPasswordDto.getEmail());
        loginLogService.recordLoginLog(user.getId(), setPasswordDto.getEmail(), ip, userAgent, true, "设置密码成功");
    }

    @Override
    public UserInfoForLogin wxLogin(String code) throws Exception {
        // 这里需要注入WxMaService
        throw new UnsupportedOperationException("wxLogin方法需在Controller中注入WxMaService后实现");
    }

    @Override
    public UserInfoForLogin loginByPassword(UserLoginDto loginDto, String ip, String userAgent) {
        if (loginDto.getEmail() == null || loginDto.getEmail().trim().isEmpty()) {
            throw new BusinessException("邮箱不能为空");
        }
        if (loginDto.getPassword() == null || loginDto.getPassword().trim().isEmpty()) {
            throw new BusinessException("密码不能为空");
        }

        String email = loginDto.getEmail().trim();
        
        // 检查是否被锁定
        String failKey = LOGIN_FAIL_PREFIX + email;
        String failCount = redisTemplate.opsForValue().get(failKey);
        if (failCount != null && Integer.parseInt(failCount) >= MAX_FAIL_COUNT) {
            loginLogService.recordLoginLog(null, email, ip, userAgent, false, "账号已被锁定");
            throw new BusinessException("登录失败次数过多，请" + LOCK_TIME + "分钟后再试");
        }

        // 查找用户
        User user = lambdaQuery().eq(User::getEmail, email).one();
        if (user == null) {
            incrementFailCount(failKey);
            loginLogService.recordLoginLog(null, email, ip, userAgent, false, "用户不存在");
            throw new BusinessException("邮箱或密码错误");
        }

        // 验证密码
        if (!PasswordUtils.matches(loginDto.getPassword(), user.getPassword())) {
            incrementFailCount(failKey);
            loginLogService.recordLoginLog(user.getId(), email, ip, userAgent, false, "密码错误");
            throw new BusinessException("邮箱或密码错误");
        }

        // 检查用户状态
        if (user.getStatus() != null && user.getStatus() == 0) {
            loginLogService.recordLoginLog(user.getId(), email, ip, userAgent, false, "账号被禁用");
            throw new BusinessException("账号已被禁用，请联系管理员");
        }

        // 登录成功，清除失败记录
        redisTemplate.delete(failKey);

        // 生成访问令牌
        String accessToken = JwtUtils.generateToken(user.getId());

        // 记录成功日志
        loginLogService.recordLoginLog(user.getId(), email, ip, userAgent, true, null);

        // 确保返回的用户信息字段不为null
        return new UserInfoForLogin(
            accessToken, 
            user.getId(), 
            user.getOpenid() != null ? user.getOpenid() : "", 
            user.getNickname() != null ? user.getNickname() : "", 
            user.getAvatarUrl() != null ? user.getAvatarUrl() : "", 
            user.getRole() != null ? user.getRole() : ""
        );
    }

    @Override
    public void registerVolunteer(VolunteerRegisterDto registerDto) {
        if (registerDto.getOpenid() == null || registerDto.getOpenid().trim().isEmpty() ||
            registerDto.getNickname() == null || registerDto.getNickname().trim().isEmpty() ||
            registerDto.getAvatarUrl() == null || registerDto.getAvatarUrl().trim().isEmpty() ||
            registerDto.getPhone() == null || registerDto.getPhone().trim().isEmpty() ||
            registerDto.getIdCard() == null || registerDto.getIdCard().trim().isEmpty()) {
            throw new BusinessException("OpenId, 昵称, 头像URL, 手机号, 身份证号均为必填参数");
        }

        User existingUser = findByOpenid(registerDto.getOpenid());
        if (existingUser != null) {
            throw new BusinessException("该OpenId已注册");
        }

        // 检查手机号是否已存在
        User existingUserByPhone = lambdaQuery().eq(User::getPhone, registerDto.getPhone()).one();
        if (existingUserByPhone != null) {
            throw new BusinessException("手机号已被注册");
        }

        User volunteer = new User();
        volunteer.setOpenid(registerDto.getOpenid());
        volunteer.setNickname(registerDto.getNickname());
        volunteer.setAvatarUrl(registerDto.getAvatarUrl());
        volunteer.setPhone(registerDto.getPhone());
        volunteer.setIdCard(registerDto.getIdCard());
        volunteer.setRole("志愿者");
        volunteer.setCreatedTime(new Date());
        volunteer.setStatus(1); // 志愿者默认状态为正常
        save(volunteer);
    }

    @Override
    public void registerAdmin(AdminRegisterDto registerDto) {
        if (registerDto.getUsername() == null || registerDto.getUsername().trim().isEmpty() ||
            registerDto.getPassword() == null || registerDto.getPassword().trim().isEmpty() ||
            registerDto.getEmail() == null || registerDto.getEmail().trim().isEmpty()) {
            throw new BusinessException("用户名、密码和邮箱均不能为空");
        }

        User existingUserByUsername = lambdaQuery().eq(User::getUsername, registerDto.getUsername()).one();
        if (existingUserByUsername != null) {
            throw new BusinessException("用户名已存在");
        }

        User existingUserByEmail = lambdaQuery().eq(User::getEmail, registerDto.getEmail()).one();
        if (existingUserByEmail != null) {
            throw new BusinessException("邮箱已被注册");
        }

        User admin = new User();
        admin.setUsername(registerDto.getUsername());
        admin.setPassword(PasswordUtils.encode(registerDto.getPassword()));
        admin.setEmail(registerDto.getEmail());
        admin.setRole("管理员");
        admin.setCreatedTime(new Date());
        admin.setStatus(1); // 管理员默认状态为正常
        save(admin);
    }

    @Override
    public Map<String, Object> refreshToken(String refreshToken) {
        if (JwtUtils.isTokenExpired(refreshToken)) {
            throw new BusinessException("刷新令牌已过期，请重新登录");
        }
        Long userId = JwtUtils.getUserIdFromToken(refreshToken);
        String newAccessToken = JwtUtils.generateToken(userId);

        Map<String, Object> data = new HashMap<>();
        data.put("accessToken", newAccessToken);
        return data;
    }

    @Override
    public void saveUserInfo(UserInfoDto userInfo) {
        if (userInfo.getId() == null) {
            throw new BusinessException("用户ID为必填参数");
        }

        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(User::getId, userInfo.getId());
        
        if (userInfo.getNickname() != null) {
            updateWrapper.set(User::getNickname, userInfo.getNickname());
        }
        
        if (userInfo.getAvatarUrl() != null) {
            updateWrapper.set(User::getAvatarUrl, userInfo.getAvatarUrl());
        }

        boolean success = update(updateWrapper);
        if (!success) {
            throw new BusinessException("用户信息保存失败");
        }
    }

    @Override
    public void updateUserInfo(UserUpdateDto userInfo) {
        if (userInfo.getId() == null) {
            throw new BusinessException("用户ID为必填参数");
        }
        
        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(User::getId, userInfo.getId());
        
        if (userInfo.getNickname() != null) updateWrapper.set(User::getNickname, userInfo.getNickname());
        if (userInfo.getAvatarUrl() != null) updateWrapper.set(User::getAvatarUrl, userInfo.getAvatarUrl());
        if (userInfo.getPhone() != null) updateWrapper.set(User::getPhone, userInfo.getPhone());
        if (userInfo.getUsualAddress() != null) updateWrapper.set(User::getUsualAddress, userInfo.getUsualAddress());
        if (userInfo.getVoiceSettings() != null) updateWrapper.set(User::getVoiceSettings, userInfo.getVoiceSettings());
        if (userInfo.getServiceHours() != null) updateWrapper.set(User::getServiceHours, userInfo.getServiceHours());
        if (userInfo.getServiceRating() != null) updateWrapper.set(User::getServiceRating, userInfo.getServiceRating());
        if (userInfo.getOrganization() != null) updateWrapper.set(User::getOrganization, userInfo.getOrganization());
        if (userInfo.getCertificationTime() != null) updateWrapper.set(User::getCertificationTime, userInfo.getCertificationTime());
        if (userInfo.getUsername() != null) updateWrapper.set(User::getUsername, userInfo.getUsername());
        
        boolean success = update(updateWrapper);
        if (!success) {
            throw new BusinessException("用户信息修改失败");
        }
    }

    @Override
    public Map<String, Object> getUserInfo(Long id) {
        if (id == null) {
            throw new BusinessException("用户ID为必填参数");
        }
        
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        
        UserUpdateDto userInfo = new UserUpdateDto();
        userInfo.setId(user.getId());
        userInfo.setNickname(user.getNickname());
        userInfo.setAvatarUrl(user.getAvatarUrl());
        userInfo.setPhone(user.getPhone());
        userInfo.setUsualAddress(user.getUsualAddress());
        userInfo.setVoiceSettings(user.getVoiceSettings());
        userInfo.setServiceHours(user.getServiceHours());
        userInfo.setServiceRating(user.getServiceRating());
        userInfo.setOrganization(user.getOrganization());
        userInfo.setCertificationTime(user.getCertificationTime());
        userInfo.setUsername(user.getUsername());

        Map<String, Object> data = new HashMap<>();
        data.put("userInfo", userInfo);
        return data;
    }

    @Override
    public Map<String, Object> getUserSig(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new BusinessException("Authorization header is required");
        }
        
        token = token.substring(7); // 移除"Bearer "前缀
        Long userId = JwtUtils.getUserIdFromToken(token);
        if (userId == null) {
            throw new BusinessException("Invalid token");
        }
        
        // 生成userSig
        String userSig = GenerateTestUserSig.generateUserSig(userId.toString(), 604800L); // 7天有效期
        
        Map<String, Object> data = new HashMap<>();
        data.put("userId", userId.toString());
        data.put("userSig", userSig);
        return data;
    }

    @Override
    public String sendEmailCode(String email) {
        try {
            boolean success = mailMsg.mail(email);
            if (success) {
                return "验证码发送成功！";
            } else {
                return "邮箱地址不存在或发送失败，请检查邮箱地址是否正确！";
            }
        } catch (Exception e) {
            logger.error("验证码发送异常: {}", e.getMessage());
            return "邮箱地址不存在或发送失败，请检查邮箱地址是否正确！";
        }
    }

    /**
     * 增加登录失败次数
     */
    private void incrementFailCount(String failKey) {
        String count = redisTemplate.opsForValue().get(failKey);
        if (count == null) {
            redisTemplate.opsForValue().set(failKey, "1", LOCK_TIME, TimeUnit.MINUTES);
        } else {
            redisTemplate.opsForValue().increment(failKey);
        }
    }
}