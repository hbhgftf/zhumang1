// WebSocket和UserSig调试工具
// 在uni-app控制台执行这些函数来排查问题

import config from '../config.js';

// 1. JWT Token验证
export const validateToken = () => {
  console.log('=== Token验证开始 ===');
  
  const token = uni.getStorageSync('token');
  const userInfo = uni.getStorageSync('userInfo');
  
  console.log('当前token:', token);
  console.log('userInfo:', userInfo);
  
  if (!token) {
    console.error('❌ Token不存在');
    return false;
  }
  
  // 解析JWT token（仅用于调试）
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Token解析失败:', e);
      return null;
    }
  };
  
  const payload = parseJwt(token);
  if (payload) {
    console.log('✅ Token解析成功');
    console.log('用户ID:', payload.sub);
    console.log('过期时间:', new Date(payload.exp * 1000));
    console.log('签发时间:', new Date(payload.iat * 1000));
    
    // 检查是否过期
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      console.error('❌ Token已过期');
      return false;
    } else {
      console.log('✅ Token未过期');
      return true;
    }
  } else {
    console.error('❌ Token格式错误');
    return false;
  }
};

// 2. UserSig接口测试
export const testUserSig = async () => {
  console.log('=== UserSig接口测试开始 ===');
  
  try {
    const token = uni.getStorageSync('token');
    console.log('使用的token:', token);
    
    const res = await uni.request({
      url: `${config.baseUrl}/user/userSig`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      data: { userID: '' }
    });
    
    console.log('响应状态:', res[1] ? res[1].statusCode : res.statusCode);
    console.log('响应数据:', res[1] ? res[1].data : res.data);
    
    if ((res[1] && res[1].statusCode === 200 && res[1].data.code === 200) || 
        (res.statusCode === 200 && res.data.code === 200)) {
      const data = res[1] ? res[1].data.data : res.data.data;
      console.log('✅ UserSig获取成功');
      console.log('返回的用户ID:', data.userID);
      console.log('UserSig长度:', data.userSig.length);
      console.log('UserSig前50字符:', data.userSig.substring(0, 50) + '...');
      return data;
    } else {
      console.error('❌ UserSig获取失败:', res[1] ? res[1].data.message : res.data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ 请求异常:', error);
    return null;
  }
};

// 3. WebSocket连接测试
export const testWebSocket = () => {
  console.log('=== WebSocket连接测试开始 ===');
  
  const token = uni.getStorageSync('token');
  const wsUrl = `${config.baseUrl.replace('http', 'ws')}/ws?token=${token}`;
  
  console.log('连接URL:', wsUrl);
  console.log('使用的token:', token);
  
  let socketTask = null;
  
  // 创建WebSocket连接
  socketTask = uni.connectSocket({
    url: wsUrl,
    success: () => {
      console.log('✅ WebSocket连接创建成功');
    },
    fail: (error) => {
      console.error('❌ WebSocket连接创建失败:', error);
    }
  });
  
  // 监听连接打开
  socketTask.onOpen(() => {
    console.log('✅ WebSocket连接已打开');
    
    // 发送测试消息
    socketTask.send({
      data: JSON.stringify({
        type: 'HEARTBEAT',
        timestamp: Date.now()
      }),
      success: () => {
        console.log('✅ 测试消息发送成功');
      },
      fail: (error) => {
        console.error('❌ 测试消息发送失败:', error);
      }
    });
  });
  
  // 监听消息
  socketTask.onMessage((res) => {
    console.log('收到WebSocket消息:', res.data);
  });
  
  // 监听错误
  socketTask.onError((error) => {
    console.error('❌ WebSocket连接错误:', error);
  });
  
  // 监听连接关闭
  socketTask.onClose((res) => {
    console.log('WebSocket连接关闭:', res);
    console.log('关闭代码:', res.code);
    console.log('关闭原因:', res.reason);
  });
  
  // 5秒后自动关闭测试连接
  setTimeout(() => {
    if (socketTask) {
      socketTask.close();
      console.log('测试连接已关闭');
    }
  }, 5000);
};

// 4. TUICallKit配置验证
export const validateTUICallKit = async () => {
  console.log('=== TUICallKit配置验证开始 ===');
  
  const TUICallKit = uni.requireNativePlugin('TencentCloud-TUICallKit');
  
  // 检查SDKAppID
  const sdkAppId = 1600093684;
  console.log('SDKAppID:', sdkAppId);
  
  // 获取UserSig
  try {
    const userSigData = await testUserSig();
    if (!userSigData) {
      console.error('❌ 无法获取UserSig');
      return null;
    }
    
    const userID = userSigData.userID;
    const userSig = userSigData.userSig;
    
    console.log('✅ UserSig获取成功');
    console.log('用户ID:', userID);
    console.log('UserSig:', userSig.substring(0, 50) + '...');
    
    // 验证TUICallKit登录参数
    const loginParams = {
      SDKAppID: sdkAppId,
      userID: userID,
      userSig: userSig
    };
    
    console.log('TUICallKit登录参数:', loginParams);
    
    // 尝试登录TUICallKit
    TUICallKit.login(loginParams, (res) => {
      console.log('TUICallKit登录结果:', res);
      if (res.code === 0) {
        console.log('✅ TUICallKit登录成功');
      } else {
        console.error('❌ TUICallKit登录失败:', res.msg);
      }
    });
    
    return loginParams;
  } catch (error) {
    console.error('❌ 获取UserSig异常:', error);
    return null;
  }
};

// 5. 完整调试流程
export const runFullDebug = async () => {
  console.log('🚀 开始完整调试流程...');
  
  // 1. 验证Token
  console.log('\n--- 步骤1: Token验证 ---');
  const tokenValid = validateToken();
  
  if (!tokenValid) {
    console.error('❌ Token验证失败，停止调试');
    return;
  }
  
  // 2. 测试UserSig接口
  console.log('\n--- 步骤2: UserSig接口测试 ---');
  const userSigData = await testUserSig();
  
  if (!userSigData) {
    console.error('❌ UserSig获取失败，停止调试');
    return;
  }
  
  // 3. 测试WebSocket连接
  console.log('\n--- 步骤3: WebSocket连接测试 ---');
  testWebSocket();
  
  // 4. 验证TUICallKit配置
  console.log('\n--- 步骤4: TUICallKit配置验证 ---');
  setTimeout(() => {
    validateTUICallKit();
  }, 2000);
  
  console.log('\n✅ 调试流程启动完成，请查看控制台输出');
};

// 6. 检查存储数据
export const checkStorageData = () => {
  console.log('=== 存储数据检查 ===');
  
  const token = uni.getStorageSync('token');
  const userInfo = uni.getStorageSync('userInfo');
  
  console.log('token:', token);
  console.log('userInfo:', userInfo);
  
  if (userInfo && userInfo.token) {
    console.log('userInfo.token:', userInfo.token);
    console.log('token是否一致:', token === userInfo.token);
  }
  
  return { token, userInfo };
};

// 导出所有调试函数
export default {
  validateToken,
  testUserSig,
  testWebSocket,
  validateTUICallKit,
  runFullDebug,
  checkStorageData
}; 