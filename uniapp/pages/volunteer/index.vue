<!-- 模板部分 -->
<template>
  <view class="volunteer-container">
    <!-- 非志愿者显示注册按钮 -->
    <view v-if="!isVolunteer" class="register-section">
      <view class="register-header">
        <text class="register-title">成为志愿者</text>
        <text class="register-subtitle">加入我们，一起帮助他人</text>
      </view>
      <button class="register-btn" @tap="goToRegister">成为志愿者</button>
    </view>

    <!-- 志愿者显示服务内容 -->
    <block v-else>
    <!-- 状态控制栏 -->
    <view class="status-bar">
      <text class="status-title">服务状态</text>
        <!-- 真实的uni-switch 组件 -->
        <switch 
          :checked="isOnline" 
          @change="toggleOnlineStatus" 
          color="#1AAD19"
          class="status-switch"
        />
        <text class="status-text">{{ isOnline ? '在线' : '离线' }}</text>
    </view>



    <!-- 服务范围选择 -->
    <view class="service-scope">
      <text class="section-title">您提供的帮助类型</text>
      <view class="tag-container">
        <view class="tag mock-tag active" @tap="goToVideoAssist" role="button" aria-label="视频协助，点击进入视频协助页面" tabindex="0">视频协助</view>
        <view class="tag mock-tag active" @tap="goToTravelAppointment" role="button" aria-label="出行预约，点击进入出行预约页面" tabindex="0">出行预约</view>
        <view class="tag mock-tag active" role="button" aria-label="政策咨询，点击进入政策咨询页面" tabindex="0">政策咨询</view>
      </view>
    </view>

    <!-- 通话请求弹窗 -->
    <view v-if="showCallRequest" class="call-request-modal">
      <view class="call-request-content">
        <view class="call-request-header">
          <text class="call-request-title">收到通话请求</text>
          <text class="call-request-subtitle">用户 {{callRequestInfo.callerId}} 请求与您通话</text>
        </view>
        <view class="call-request-buttons">
          <button class="call-btn reject" @tap="handleRejectCall" aria-label="拒绝通话" tabindex="0">拒绝</button>
          <button class="call-btn accept" @tap="handleAcceptCall" aria-label="接受通话" tabindex="0">接受</button>
        </view>
      </view>
    </view>

   
    <!-- 任务列表 -->
    <view class="task-list">
      <text class="section-title">感谢您提供帮助，如有人需要您的帮助，我们会弹窗通知您	        
	  若您接到视频协助，请耐心回复，
	  若您接到出行预约，请您问清楚出行站点，出行时间，个人信息，
	  然后在地铁/机场官网联系工作人员预约</text>
    </view>
    </block>
  </view>
</template>

<script>
import config from '../../config.js'
import notificationService from '../../utils/notification-service.js'

export default {
  data() {
    return {
      isVolunteer: false,
      isOnline: false,
      wsConnection: null,
      showCallRequest: false,
      isInCall: false,
      callRequestInfo: {
        roomId: '',
        callerId: '',
        calleeId: ''
      },
      heartbeatTimer: null,
      wsReconnectTimer: null,
      isLogin: false,
      tuicallkitUserSig: '',
      tuicallkitSDKAppID: 1600094381,
      tuicallkitUserID: '',
    }
  },
  onLoad() {
    console.log('[Volunteer] 页面加载开始');
    this.checkVolunteerStatus();
    this.loginToTUICallKit();
  },
  onShow() {

    console.log('[Volunteer] 页面显示，重新检查状态');
    this.checkVolunteerStatus();
  },
  onUnload() {
    if (this.wsConnection) {
      try { this.wsConnection.close(); } catch (e) {}
      this.wsConnection = null;
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null;
    }
    if (this.wsReconnectTimer) {
      clearTimeout(this.wsReconnectTimer);
      this.wsReconnectTimer = null;
    }
  },
  methods: {
    // 检查志愿者状态并获取在线状态
    async checkVolunteerStatus() {
      console.log('[Volunteer] 开始检查志愿者状态');
      const userInfo = uni.getStorageSync('userInfo')
      
      if (!userInfo || typeof userInfo === 'string') {
         // 如果userInfo不存在或不是对象，则不是志愿者且无法获取openid
        console.log('[Volunteer] 用户信息不存在或格式错误，设置为非志愿者');
        this.isVolunteer = false
        this.isOnline = false // 未登录或信息异常，设置为离线
        return
      }

      console.log('[Volunteer] 用户信息:', userInfo);
      console.log('[Volunteer] 用户角色:', userInfo.role);

      // 检查角色
      if (userInfo.role === '志愿者') {
        console.log('[Volunteer] 确认是志愿者，开始获取在线状态');
        this.isVolunteer = true
        // 如果是志愿者，则获取在线状态
        try {
          const res = await uni.request({
            url: `${config.baseUrl}/api/volunteer/status/${userInfo.id}`,
            method: 'GET',
            header: {'Authorization': `Bearer ${userInfo.token}`}
          });

          console.log('[Volunteer] 获取在线状态响应:', res);

          if (res.data.code === 200) {
            this.isOnline = res.data.data; // 后端返回的是布尔值
            console.log('[Volunteer] 在线状态设置为:', this.isOnline);
          } else {
            console.error('获取志愿者在线状态失败:', res.data.msg);
            // 获取失败，可以给用户提示或将状态设为默认离线
            this.isOnline = false;
             uni.showToast({
              title: res.data.msg || '获取状态失败',
              icon: 'none'
            });
          }
        } catch (error) {
          console.error('请求获取志愿者在线状态失败:', error);
          this.isOnline = false;
           uni.showToast({
            title: '请求获取状态失败',
            icon: 'none'
          });
        }
        // 确认身份后再连接 WebSocket（避免重复连接）
        if (!this.wsConnection) {
          console.log('[Volunteer] 开始初始化WebSocket连接');
          this.initWebSocket();
        } else {
          console.log('[Volunteer] WebSocket连接已存在，跳过初始化');
        }
      } else {
        console.log('[Volunteer] 用户不是志愿者角色');
        this.isVolunteer = false
        this.isOnline = false // 不是志愿者，设置为离线
      }
    },

    // 切换志愿者在线状态
    async toggleOnlineStatus(event) {
       const userInfo = uni.getStorageSync('userInfo')
       if (!userInfo || userInfo.role !== '志愿者') {
         uni.showToast({ title: '您不是志愿者', icon: 'none' });
         // 回滚开关状态
         this.$nextTick(() => { this.isOnline = !event.detail.value; });
         return;
       }

      const newStatus = event.detail.value; // 开关的新状态 (true/false)
      const userId = userInfo.id; // 获取userId

      uni.showLoading({ title: '更新状态中...' });

      // 修改为将userId和isOnline作为URL参数发送
      const url = `${config.baseUrl}/api/volunteer/status?userId=${userId}&isOnline=${newStatus}`;
      
      console.log('请求URL:', url); // 打印完整的请求URL
      console.log('请求数据(作为URL参数):', { userId, isOnline: newStatus }); // 打印参数数据

      try {
        const res = await uni.request({
          url: url,
          method: 'POST', // 保持POST方法，但数据通过URL参数发送
          // data: {}, // 无需发送请求体
           header: {
               'Authorization': `Bearer ${userInfo.token}`
               // 对于URL参数，Content-Type通常不是application/json
            }
        });

        if (res.data.code === 200) {
          this.isOnline = newStatus; // 成功后更新前端状态
          uni.showToast({ title: '状态更新成功', icon: 'success' });
          // 如果切换为在线，强制重连WebSocket
          if (newStatus) {
            // 关闭旧连接
            if (this.wsConnection) {
              try { this.wsConnection.close(); } catch (e) {}
              this.wsConnection = null;
            }
            if (this.wsReconnectTimer) {
              clearTimeout(this.wsReconnectTimer);
              this.wsReconnectTimer = null;
            }
            this.initWebSocket();
            // 切换为在线时重新登录 TUICallKit
            this.loginToTUICallKit();
          }
        } else {
          console.error('更新志愿者在线状态失败:', res.data.msg);
          // 更新失败，回滚开关状态
          this.$nextTick(() => { this.isOnline = !newStatus; });
           uni.showToast({ 
             title: res.data.msg || '更新状态失败', 
             icon: 'none' 
           });
        }
      } catch (error) {
        console.error('请求更新志愿者在线状态失败:', error);
        // 请求失败，回滚开关状态
        this.$nextTick(() => { this.isOnline = !newStatus; });
         uni.showToast({ 
           title: '请求更新状态失败', 
           icon: 'none' 
         });
      } finally {
        uni.hideLoading();
      }
    },

    goToRegister() {
      // 检查是否登录
      const userInfo = uni.getStorageSync('userInfo')
      if (!userInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/user/profile'
          })
        }, 1500)
        return
      }
      
      // 已登录，跳转到志愿者注册页面
      uni.navigateTo({
        url: '/pages/volunteer/register'
      })
    },
    
    // 跳转到视频协助页面
    goToVideoAssist() {
      uni.navigateTo({
        url: '/pages/video-call/caller'
      });
    },

    // 跳转到出行预约页面
    goToTravelAppointment() {
      uni.navigateTo({
        url: '/pages/travel/travel-appointment/travel-appointment'
      });
    },

    // 初始化WebSocket连接
    initWebSocket() {
      const userInfo = uni.getStorageSync('userInfo')
      if (!userInfo || !userInfo.token) {
        console.error('[WebSocket] 用户信息或token缺失，无法建立连接');
        return;
      }

      // 避免重复连接
      if (this.wsConnection && this.wsConnection.readyState === 1) {
        console.log('[WebSocket] 已有活跃连接，跳过新建');
        return;
      }

      // 清理旧连接和重连定时器
      if (this.wsConnection) {
        try { this.wsConnection.close(); } catch (e) {}
        this.wsConnection = null;
      }
      if (this.wsReconnectTimer) {
        clearTimeout(this.wsReconnectTimer);
        this.wsReconnectTimer = null;
      }

      // 使用正确的token
      const token = userInfo.token; // 直接使用userInfo中的token
      console.log('[WebSocket] 使用的token:', token);

      const wsUrl = `${config.baseUrl.replace('http', 'ws')}/ws?token=${token}`;
      console.log('[WebSocket] 尝试建立连接，URL:', wsUrl);
      
      this.wsConnection = uni.connectSocket({
        url: wsUrl,
        success: () => {
          console.log('[WebSocket] connectSocket 调用成功');
        },
        fail: (err) => {
          console.error('[WebSocket] connectSocket 调用失败:', err);
        }
      });

      // 监听WebSocket打开
      this.wsConnection.onOpen(() => {
        console.log('[WebSocket] 连接已打开，准备开始心跳');
        // 连接成功后清理重连定时器
        if (this.wsReconnectTimer) {
          clearTimeout(this.wsReconnectTimer);
          this.wsReconnectTimer = null;
        }
        this.startHeartbeat();
      });

      // 监听WebSocket消息
      this.wsConnection.onMessage((res) => {
        console.log('[WebSocket] 收到原始消息:', res.data);
        try {
          const data = JSON.parse(res.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('[WebSocket] 消息解析失败:', error, '原始数据:', res.data);
        }
      });

      // 监听连接关闭
      this.wsConnection.onClose(() => {
        console.warn('[WebSocket] 连接已关闭');
        // 自动重连
        this.scheduleReconnect();
      });

      // 监听连接错误
      this.wsConnection.onError((err) => {
        console.error('[WebSocket] 连接发生错误:', err);
        // 自动重连
        this.scheduleReconnect();
      });
    },

    // 自动重连机制
    scheduleReconnect() {
      if (this.wsReconnectTimer) return; // 已有重连定时器
      console.log('[WebSocket] 5秒后尝试重连...');
      this.wsReconnectTimer = setTimeout(() => {
        this.wsReconnectTimer = null;
        this.initWebSocket();
      }, 5000);
    },

    // 启动心跳
    startHeartbeat() {
      if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => {
        if (this.wsConnection && this.wsConnection.readyState === 1) {
          this.wsConnection.send({
            data: JSON.stringify({
              type: 'HEARTBEAT'
            })
          })
          console.log('[WebSocket] 发送心跳包');
        }
      }, 15000)
    },

    // 处理WebSocket消息
    handleWebSocketMessage(message) {
      console.log('[WebSocket] 收到消息类型:', message.type, '完整消息:', message);
      switch(message.type) {
        case 'CALL_REQUEST':
          // 检查是否已经在通话中或正在处理通话请求
         
          console.log('[WebSocket] 收到通话请求，准备显示弹窗');
          console.log('[WebSocket] 通话请求详情:', {
            roomId: message.roomId,
            callerId: message.callerId,
            calleeId: message.calleeId
          });
          this.showCallRequest = true;
          this.callRequestInfo = {
            roomId: message.roomId,
            callerId: message.callerId,
            calleeId: message.calleeId
          };
          // 播放提示音
          this.playCallRingtone();
          console.log('[WebSocket] 弹窗状态已设置为显示:', this.showCallRequest);
          break;
        case 'CALL_END':
          // 通话结束
          this.handleCallEnded(message);
          break;
        case 'CALL':
          // 新增：收到CALL类型消息时，加入全局消息中心
          notificationService.addNotification({
            ...message,
            title: message.title || '新的通话请求',
            level: message.level || 'HIGH',
            content: message.content || '',
          });
          break;
        case 'ERROR':
          uni.showToast({
            title: message.content || '发生错误',
            icon: 'none'
          });
          break;
        default:
          console.log('[WebSocket] 未处理的消息类型:', message.type);
      }
    },

    // 播放提示音
    playCallRingtone() {
      const innerAudioContext = uni.createInnerAudioContext()
      innerAudioContext.src = '/static/audio/call-ringtone.mp3' // 需要添加提示音文件
      innerAudioContext.loop = true
      innerAudioContext.play()
      // 保存引用以便后续停止
      this.ringtone = innerAudioContext
    },

    // 停止提示音
    stopCallRingtone() {
      if (this.ringtone) {
        this.ringtone.stop()
        this.ringtone = null
      }
    },

    // 处理接受通话
    async handleAcceptCall() {
      const userInfo = uni.getStorageSync('userInfo')
      if (!userInfo) return

      this.stopCallRingtone()
      this.showCallRequest = false
      
      // 保存通话信息用于后续处理
      const roomId = this.callRequestInfo.roomId
      const callerId = this.callRequestInfo.callerId
      
      // 清理通话请求信息
      this.callRequestInfo = {
        roomId: '',
        callerId: '',
        calleeId: ''
      }
      
      if (!roomId) {
        console.error('[handleAcceptCall] roomId 为空，无法发起通话');
        uni.showToast({ title: '通话房间信息缺失', icon: 'none' });
        return;
      }
      if (!callerId) {
        console.error('[handleAcceptCall] callerId 为空，无法发起通话');
        uni.showToast({ title: '通话发起人信息缺失', icon: 'none' });
        return;
      }
      
      try {
        const res = await uni.request({
          url: `${config.baseUrl}/api/call/accept`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${userInfo.token}`
          },
          data: {
            roomId: roomId
          }
        })

        if (res.data.code === 200) {
          this.isInCall = true
          console.log('[handleAcceptCall] 接受通话成功，准备调用 TUICallKit.accept');
          // 使用TUICallKit的accept方法接听通话
          this.acceptCallWithTUICallKit(roomId);
        } else {
          uni.showToast({
            title: res.data.message || '接受通话失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('接受通话请求失败:', error)
        uni.showToast({
          title: '接受通话失败',
          icon: 'none'
        })
      }
    },

    // 使用TUICallKit的accept方法接听通话
    acceptCallWithTUICallKit(roomId) {
      if (!this.isLogin) {
        uni.showToast({ title: '视频通话系统未登录', icon: 'none' });
        return;
      }
      
      // 检查TUICallKit是否可用
      if (!uni.$TUICallKit) {
        console.error('[TUICallKit] TUICallKit未初始化');
        uni.showToast({ title: '视频通话系统未初始化', icon: 'none' });
        return;
      }
      
      try {
        // 检查可用的方法
        const availableMethods = Object.keys(uni.$TUICallKit);
        console.log('[TUICallKit] 可用方法:', availableMethods);
        
        // 被叫方应该使用answer方法，而不是accept方法
        const answerParams = {
          callMediaType: 2, // 视频通话
          callParams: {
            strRoomID: String(roomId),
            timeout: 30
          }
        };
        
        console.log('[acceptCallWithTUICallKit] 接听参数:', answerParams);
        
    
        if (typeof uni.$TUICallKit.answer === 'function') {
          uni.$TUICallKit.answer(answerParams, res => {
            console.log('[TUICallKit] answer 返回:', res);
            if (res.code !== 0) {
              console.error('[TUICallKit] 接听通话失败，错误码:', res.code, '错误信息:', res.msg);
              uni.showToast({
                title: '接听通话失败: ' + (res.msg || res.code),
                icon: 'none'
              });
            } else {
              console.log('[TUICallKit] 接听通话成功');
              this.isInCall = true;
            }
          });
        } else {
         
        }
      } catch (error) {
        console.error('[TUICallKit] 接听通话错误:', error);
        uni.showToast({ title: '接听通话失败: ' + error.message, icon: 'none' });
      }
    },

    // 处理拒绝通话
    async handleRejectCall() {
      const userInfo = uni.getStorageSync('userInfo')
      if (!userInfo) return

      // 立即停止提示音和隐藏弹窗
      this.stopCallRingtone()
      this.showCallRequest = false
      
      // 保存roomId用于发送请求
      const roomId = this.callRequestInfo.roomId
      
      // 清理通话请求信息
      this.callRequestInfo = {
        roomId: '',
        callerId: '',
        calleeId: ''
      }
      
      try {
        const res = await uni.request({
          url: `${config.baseUrl}/api/call/reject`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${userInfo.token}`
          },
          data: {
            roomId: roomId
          }
        })

        if (res.data.code === 200) {
          console.log('已拒绝通话请求');
        } else {
          uni.showToast({
            title: res.data.message || '拒绝通话失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('拒绝通话请求失败:', error)
        uni.showToast({
          title: '拒绝通话失败',
          icon: 'none'
        })
      }
    },

    // 处理通话结束
    async handleCallEnded(message) {
      this.isInCall = false
      this.stopCallRingtone()
      this.showCallRequest = false
      
      // 清理通话请求信息
      this.callRequestInfo = {
        roomId: '',
        callerId: '',
        calleeId: ''
      }
      
      // 结束TUICallKit通话
      if (uni.$TUICallKit && typeof uni.$TUICallKit.hangup === 'function') {
        uni.$TUICallKit.hangup()
      }
      
      uni.showToast({
        title: '通话已结束',
        icon: 'none'
      })
    },

    // 主动结束通话
    async handleEndCall() {
      const userInfo = uni.getStorageSync('userInfo')
      if (!userInfo) return

      try {
        const res = await uni.request({
          url: `${config.baseUrl}/api/call/end`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${userInfo.token}`
          },
          data: {
            roomId: this.callRequestInfo.roomId
          }
        })

        if (res.data.code === 200) {
          this.handleCallEnded()
        } else {
          uni.showToast({
            title: res.data.message || '结束通话失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('结束通话失败:', error)
        uni.showToast({
          title: '结束通话失败',
          icon: 'none'
        })
      }
    },

    // 使用TUICallKit接听通话
    answerCall(roomId, callerId) {
      if (!this.isLogin) {
        uni.showToast({ title: '视频通话系统未登录', icon: 'none' });
        return;
      }
      
      console.log('[answerCall] 志愿者接听通话参数:');
      console.log('  - roomId:', roomId);
      console.log('  - callerId:', callerId);
      console.log('  - 志愿者用户ID:', this.tuicallkitUserID);
      console.log('  - 志愿者UserSig长度:', this.tuicallkitUserSig.length);
      
      if (!callerId) {
        console.error('[TUICallKit] answerCall: callerId 为空，无法接听通话');
        uni.showToast({ title: '通话发起人信息缺失', icon: 'none' });
        return;
      }
      if (!roomId) {
        console.error('[TUICallKit] answerCall: roomId 为空，无法接听通话');
        uni.showToast({ title: '通话房间信息缺失', icon: 'none' });
        return;
      }
      
      // 检查TUICallKit是否可用
      if (!uni.$TUICallKit) {
        console.error('[TUICallKit] TUICallKit未初始化');
        uni.showToast({ title: '视频通话系统未初始化', icon: 'none' });
        return;
      }
      
      try {
        // 检查可用的方法
        const availableMethods = Object.keys(uni.$TUICallKit);
        console.log('[TUICallKit] 可用方法:', availableMethods);
        
        // 志愿者接听通话应该使用 answer 方法
        const answerParams = {
          callMediaType: 2, // 视频通话
          callParams: {
            strRoomID: String(roomId),
            timeout: 30
          }
        };
        
        console.log('[answerCall] 志愿者调用 TUICallKit.answer 参数:', answerParams);
        
        // 使用answer方法而不是accept方法
        if (typeof uni.$TUICallKit.answer === 'function') {
          uni.$TUICallKit.answer(answerParams, res => {
            console.log('[TUICallKit] 志愿者接听通话返回:', JSON.stringify(res));
            if (res.code !== 0) {
              this.isInCall = false;
              console.error('[TUICallKit] 志愿者接听通话失败，错误码:', res.code, '错误信息:', res.msg);
              uni.showToast({
                title: '接听通话失败: ' + (res.msg || res.code),
                icon: 'none'
              });
            } else {
              console.log('[TUICallKit] 志愿者接听通话成功');
              this.isInCall = true;
            }
          });
        } else {
          console.error('[TUICallKit] answer方法不存在，可用方法:', availableMethods);
          uni.showToast({ title: '视频通话系统方法不可用', icon: 'none' });
        }
      } catch (error) {
        console.error('[TUICallKit] 志愿者接听通话错误:', error);
        this.isInCall = false;
        uni.showToast({
          title: '接听通话失败: ' + error.message,
          icon: 'none'
        });
      }
    },

    async loginToTUICallKit() {
      const userInfo = uni.getStorageSync('userInfo');
      if (!userInfo || !userInfo.id) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      
      const userID = userInfo.id.toString();
      this.tuicallkitUserID = userID;
      
      try {
        console.log('[被叫方TUICallKit] 开始获取UserSig, userID:', userID);
        
        const res = await uni.request({
          url: `${config.baseUrl}/user/userSig`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${userInfo.token}`  
          },
          data: { userID }
        });
        
        console.log('[被叫方TUICallKit] UserSig响应:', res);
        
        const data = res[1] ? res[1].data : res.data;
        if ((res[1] && res[1].statusCode === 200 && data.code === 200) || 
            (res.statusCode === 200 && data.code === 200)) {
          
          const userSig = data.data.userSig;
          const realUserID = data.data.userId; // 使用后端返回的真实用户ID
          
          if (!userSig || !realUserID) {
            throw new Error('UserSig或userID为空');
          }
          
          this.tuicallkitUserSig = userSig;
          this.tuicallkitUserID = realUserID;
          
          const SDKAppID = this.tuicallkitSDKAppID;
          
          uni.$TUICallKit.login({ 
            SDKAppID: SDKAppID, 
            userID: realUserID, 
            userSig: userSig 
          }, loginRes => {
            if (loginRes.code === 0) {
              this.isLogin = true;
              console.log('[被叫方TUICallKit] 登录成功');
              
              // 调试：打印TUICallKit的可用方法
              console.log('[TUICallKit] 可用方法列表:', Object.keys(uni.$TUICallKit));
              
              this.setupTUICallKitListeners();
            } else {
              this.isLogin = false;
              console.error('[被叫方TUICallKit] 登录失败:', loginRes.msg);
              uni.showToast({ title: '视频通话系统登录失败: ' + loginRes.msg, icon: 'none' });
            }
          });
        } else {
          this.isLogin = false;
          console.error('[被叫方TUICallKit] 获取UserSig失败:', data.message);
          uni.showToast({ title: '获取UserSig失败: ' + data.message, icon: 'none' });
        }
      } catch (err) {
        this.isLogin = false;
        console.error('[被叫方TUICallKit] 获取UserSig异常:', err);
        uni.showToast({ title: '获取UserSig失败', icon: 'none' });
      }
    },

    // 设置TUICallKit事件监听
    setupTUICallKitListeners() {
      if (!uni.$TUICallKit) {
        console.error('[TUICallKit] TUICallKit未初始化，无法设置事件监听');
        return;
      }

      // 监听通话邀请
      uni.$TUICallKit.addEventListener('onCallReceived', (event) => {
        console.log('[被叫方TUICallKit] 收到通话邀请:', event);
      });
      
      // 监听通话接受
      uni.$TUICallKit.addEventListener('onCallAccepted', (event) => {
        console.log('[被叫方TUICallKit] 通话被接受:', event);
      });
      
      // 监听通话拒绝
      uni.$TUICallKit.addEventListener('onCallRejected', (event) => {
        console.log('[被叫方TUICallKit] 通话被拒绝:', event);
        this.isInCall = false;
        this.showCallRequest = false;
        this.stopCallRingtone();
        uni.showToast({ title: '通话被拒绝', icon: 'none' });
      });
      
      // 监听通话结束
      uni.$TUICallKit.addEventListener('onCallEnded', (event) => {
        console.log('[被叫方TUICallKit] 通话结束:', event);
        this.isInCall = false;
        this.showCallRequest = false;
        this.stopCallRingtone();
        uni.showToast({ title: '通话已结束', icon: 'none' });
      });
      
      // 监听通话超时
      uni.$TUICallKit.addEventListener('onCallTimeout', (event) => {
        console.log('[被叫方TUICallKit] 通话超时:', event);
        this.isInCall = false;
        this.showCallRequest = false;
        this.stopCallRingtone();
        uni.showToast({ title: '通话请求超时', icon: 'none' });
      });
      
      // 监听错误
      uni.$TUICallKit.addEventListener('onError', (event) => {
        console.error('[被叫方TUICallKit] 发生错误:', event);
        this.isInCall = false;
        this.showCallRequest = false;
        this.stopCallRingtone();
        uni.showToast({ title: '通话系统错误: ' + (event.code || event.message), icon: 'none' });
      });
    },
  }  
}

</script>

<style scoped>
/* ========== 核心视觉样式 ========== */
/* 容器样式 */
.volunteer-container {
  padding: 30rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

/* 注册部分样式 */
.register-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx 30rpx;
  text-align: center;
  margin-top: 100rpx;
}

.register-header {
  margin-bottom: 40rpx;
}

.register-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.register-subtitle {
  font-size: 28rpx;
  color: #666;
}

.register-btn {
  background: #1AAD19;
  color: white;
  border-radius: 40rpx;
  font-size: 32rpx;
  padding: 20rpx 0;
  width: 100%;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(26, 173, 25, 0.2);
}

/* 状态栏 */
.status-bar {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.status-title {
  font-size: 36rpx;
  color: #333;
  margin-right: 30rpx;
}

.status-switch {
  transform: scale(0.9);
  margin-right: 10rpx;
}

.status-text {
  font-size: 28rpx;
  color: #666;
}

/* 服务标签 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 20rpx;
}

.mock-tag {
  padding: 16rpx 32rpx;
  border: 2rpx solid #eee;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.mock-tag.active {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

/* 通话请求弹窗样式 */
.call-request-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.call-request-content {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  width: 80%;
  max-width: 600rpx;
}

.call-request-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.call-request-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.call-request-subtitle {
  font-size: 28rpx;
  color: #666;
}

.call-request-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.call-btn {
  flex: 1;
  padding: 20rpx 0;
  border-radius: 40rpx;
  font-size: 32rpx;
  text-align: center;
}

.call-btn.reject {
  background: #ff4d4f;
  color: #fff;
}

.call-btn.accept {
  background: #1AAD19;
  color: #fff;
}

/* 服务范围样式 */
.service-scope {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

/* 任务列表样式 */
.task-list {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.task-list .section-title {
  font-size: 28rpx;
  line-height: 1.6;
  color: #666;
  text-align: center;
}
</style> 