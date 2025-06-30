package zysy.iflytek.zhumang.user.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import zysy.iflytek.zhumang.common.model.Result;
import zysy.iflytek.zhumang.user.dto.UserInfoDto;
import zysy.iflytek.zhumang.user.dto.VolunteerRegisterDto;
import zysy.iflytek.zhumang.user.dto.EmailLoginDto;
import zysy.iflytek.zhumang.user.dto.AdminRegisterDto;
import zysy.iflytek.zhumang.user.dto.UserLoginDto;
import zysy.iflytek.zhumang.user.dto.SetPasswordDto;
import zysy.iflytek.zhumang.user.service.IUserService;
import java.util.Map;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@Api(tags = "用户接口")
public class UserController {
    @Autowired
    private IUserService userService;

    // 微信登录接口
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestParam("code") String code) {
        try {
            IUserService.UserInfoForLogin userInfo = userService.wxLogin(code);
            Map<String, Object> data = new HashMap<>();
            data.put("userInfo", userInfo);
            return Result.success("登录成功", data);
        } catch (Exception e) {
            return Result.error("微信登录失败: " + e.getMessage());
        }
    }

    @PostMapping("/login/email")
    @ApiOperation("邮箱验证码登录")
    public Result<Map<String, Object>> loginByEmail(@RequestBody EmailLoginDto loginDto, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        try {
            IUserService.UserInfoForLogin userInfo = userService.loginByEmail(loginDto, ip, userAgent);
            Map<String, Object> data = new HashMap<>();
            data.put("userInfo", userInfo);
            // refreshToken、hasPassword等可在Service返回的UserInfoForLogin中扩展
            return Result.success("登录成功", data);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/set-password")
    @ApiOperation("设置密码")
    public Result<Void> setPassword(@RequestBody SetPasswordDto setPasswordDto, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        try {
            userService.setPassword(setPasswordDto, ip, userAgent);
            return Result.success("密码设置成功", null);
        } catch (Exception e) {
            return Result.error("设置密码失败：" + e.getMessage());
        }
    }

    @ApiOperation(value = "发送邮箱验证码")
    @GetMapping(value = "/sendEmail/{email}")
    public String sendCode(@PathVariable String email) {
        try {
            return userService.sendEmailCode(email);
        } catch (Exception e) {
            return "验证码发送失败：" + e.getMessage();
        }
    }

    @PostMapping("/admin/refresh-token")
    @ApiOperation("刷新访问令牌")
    public Result<Map<String, Object>> refreshToken(@RequestParam String refreshToken) {
        try {
            Map<String, Object> data = userService.refreshToken(refreshToken);
            return Result.success("令牌刷新成功", data);
        } catch (Exception e) {
            return Result.error("令牌刷新失败: " + e.getMessage());
        }
    }

    @PostMapping("/admin/register")
    @ApiOperation("管理员注册")
    public Result<Void> registerAdmin(@RequestBody AdminRegisterDto registerDto) {
        try {
            userService.registerAdmin(registerDto);
            return Result.success("管理员注册成功", null);
        } catch (Exception e) {
            return Result.error("注册失败：" + e.getMessage());
        }
    }

    // 用户信息保存接口
    @PostMapping("/saveUserInfo")
    public Result<Void> saveUserInfo(@RequestBody UserInfoDto userInfo) {
        try {
            userService.saveUserInfo(userInfo);
            return Result.success("用户信息保存成功", null);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    // 通用用户信息修改接口
    @PostMapping("/updateUserInfo")
    public Result<Void> updateUserInfo(@RequestBody zysy.iflytek.zhumang.user.dto.UserUpdateDto userInfo) {
        try {
            userService.updateUserInfo(userInfo);
            return Result.success("用户信息修改成功", null);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    // 用户基本信息查询接口
    @GetMapping("/getUserInfo")
    public Result<Map<String, Object>> getUserInfo(@RequestParam("id") Long id) {
        try {
            Map<String, Object> data = userService.getUserInfo(id);
            return Result.success("查询成功", data);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    // 志愿者注册接口
    @PostMapping("/volunteer/register")
    public Result<Void> registerVolunteer(@RequestBody VolunteerRegisterDto registerDto) {
        try {
            userService.registerVolunteer(registerDto);
            return Result.success("志愿者注册成功", null);
        } catch (Exception e) {
            return Result.error("注册失败：" + e.getMessage());
        }
    }

    @PostMapping("/login/password")
    @ApiOperation("用户密码登录")
    public Result<Map<String, Object>> loginByPassword(@RequestBody UserLoginDto loginDto, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        try {
            IUserService.UserInfoForLogin userInfo = userService.loginByPassword(loginDto, ip, userAgent);
            Map<String, Object> data = new HashMap<>();
            data.put("userInfo", userInfo);
            // refreshToken可在Service返回的UserInfoForLogin中扩展
            return Result.success("登录成功", data);
        } catch (Exception e) {
            return Result.error("登录失败：" + e.getMessage());
        }
    }

    @ApiOperation("获取腾讯云UserSig")
    @GetMapping("/userSig")
    public Result<Map<String, Object>> getUserSig(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");
            Map<String, Object> data = userService.getUserSig(token);
            return Result.success("获取UserSig成功", data);
        } catch (Exception e) {
            return Result.error("获取UserSig失败: " + e.getMessage());
        }
    }
}



