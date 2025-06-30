<template>
	<view class="container">
		<text v-if="!isLogin" >正在登录视频通话系统...</text>
		<text v-if="isLogin" >已登录志愿者协助系统，用户ID: {{ userID }}</text>
		<view v-if="isLogin" class="call-section">
			<button @click="handleCall" :disabled="isRequesting" aria-label="点击开始寻找帮助" tabindex="0">
				{{ isRequesting ? '正在寻找在线志愿者...' : '点击开始寻找帮助' }}
			</button>
			<text v-if="isRequesting" class="hint-text" aria-label="请稍候，系统正在为您匹配在线志愿者">请稍候，系统正在为您匹配在线志愿者...</text>
		</view>
	</view>
</template>

<script>
	const TUICallKit = uni.requireNativePlugin('TencentCloud-TUICallKit');
	uni.$TUICallKit = TUICallKit;
	import config from '../../config.js';
	
	export default {       
		data() {
			return {
				isLogin: false,
				userID: '',
				isRequesting: false,
				wsConnection: null,
				roomId: null,
				heartbeatTimer: null,
				tuicallkitUserSig: '',
				tuicallkitSDKAppID: 1600094381,
			}
		},
		onLoad() {
			// 获取登录用户信息并自动登录TUICallKit
			const userInfo = uni.getStorageSync('userInfo');
			if (!userInfo || !userInfo.id) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
				return;
			}
			
			this.userID = userInfo.id.toString();
			this.loginToTUICallKit();
			this.initWebSocket();
		},
		onUnload() {
			// 页面卸载时清理资源
			if (this.wsConnection) {
				this.wsConnection.close();
			}
			if (this.heartbeatTimer) {
				clearInterval(this.heartbeatTimer);
			}
			// 清理TUICallKit事件监听
			if (uni.$TUICallKit) {
				uni.$TUICallKit.removeEventListener('onCallReceived');
				uni.$TUICallKit.removeEventListener('onCallAccepted');
				uni.$TUICallKit.removeEventListener('onCallRejected');
				uni.$TUICallKit.removeEventListener('onCallEnded');
				uni.$TUICallKit.removeEventListener('onCallTimeout');
				uni.$TUICallKit.removeEventListener('onError');
			}
		},
		methods: {
			initWebSocket() {
				const token = uni.getStorageSync('token');
				// 建立WebSocket连接，带上token
				this.wsConnection = uni.connectSocket({
					url: `${config.baseUrl.replace('http', 'ws')}/ws?token=${token}`,
					success: () => {
						console.log('WebSocket连接成功');
						// 启动心跳
						this.startHeartbeat();
					}
				});
				
				// 监听WebSocket消息
				this.wsConnection.onMessage((res) => {
					const data = JSON.parse(res.data);
					console.log('[WebSocket] 收到消息:', data);
					if (data.type === 'CALL_ACCEPT') {
						if (!data.data || !data.data.callerId || !data.data.calleeId) {
							console.error('[WebSocket] CALL_ACCEPT消息数据不完整:', data);
							return;
						}
						this.handleCallAccepted(data);
					} else {
						this.handleWebSocketMessage(data);
					}
				});
				
				// 监听连接关闭
				this.wsConnection.onClose(() => {
					console.log('WebSocket连接已关闭');
					// 重连逻辑可以在这里实现
				});
			},
			
			startHeartbeat() {
				// 每15秒发送一次心跳
				this.heartbeatTimer = setInterval(() => {
					if (this.wsConnection) {
						this.wsConnection.send({
							data: JSON.stringify({
								type: 'HEARTBEAT'
							})
						});
					}
				}, 15000);
			},
			
			handleWebSocketMessage(message) {
				console.log('[WebSocket] 收到消息:', message);
				switch(message.type) {
					case 'CALL_REQUEST':
						this.handleIncomingCall(message);
						break;
					case 'CALL_ACCEPT':
						this.handleCallAccepted(message);
						break;
					case 'CALL_REJECT':
						this.handleCallRejected(message);
						break;
					case 'CALL_END':
						this.handleCallEnded(message);
						break;
					case 'CALL_TIMEOUT':
						this.handleCallTimeout(message);
						break;
					case 'ERROR':
						this.handleErrorMessage(message);
						break;
					default:
						console.warn('[WebSocket] 未知消息类型:', message.type);
				}
			},
			
			async loginToTUICallKit() {
				const token = uni.getStorageSync('token');
				if (!token) {
					uni.showToast({ title: '请先登录', icon: 'none' });
					return;
				}
				
				try {
					const res = await uni.request({
						url: `${config.baseUrl}/user/userSig`,
						method: 'GET',
						header: { 'Authorization': `Bearer ${token}` },
						data: { userID: '' } 
					});
					
					if ((res[1] && res[1].statusCode === 200 && res[1].data.code === 200) || 
						(res.statusCode === 200 && res.data.code === 200)) {
						
						const data = res[1] ? res[1].data.data : res.data.data;
						const userSig = data.userSig;
						const userID = data.userId; 
						
						if (!userSig || !userID) {
							throw new Error('UserSig或userID为空');
						}
						
						this.tuicallkitUserSig = userSig;
						this.userID = userID;
						
						const SDKAppID = this.tuicallkitSDKAppID;
						
						uni.$TUICallKit.login({ 
							SDKAppID: SDKAppID, 
							userID: userID, 
							userSig: userSig 
						}, loginRes => {
							if (loginRes.code === 0) {
								this.isLogin = true;
								console.log('[主叫方TUICallKit] 登录成功');
								this.setupTUICallKitListeners();
							} else {
								this.isLogin = false;
								console.error('[主叫方TUICallKit] 登录失败:', loginRes.msg);
								uni.showToast({ title: '视频通话系统登录失败: ' + loginRes.msg, icon: 'none' });
							}
						});
					} else {
						this.isLogin = false;
						const errorMsg = res[1] ? res[1].data.message : res.data.message;
						console.error('[主叫方TUICallKit] 获取UserSig失败:', errorMsg);
						uni.showToast({ title: '获取UserSig失败: ' + errorMsg, icon: 'none' });
					}
				} catch (err) {
					this.isLogin = false;
					console.error('[主叫方TUICallKit] 获取UserSig异常:', err);
					uni.showToast({ title: '获取UserSig失败', icon: 'none' });
				}
			},
			
			handleCall() {
				if (this.isRequesting) return;
				
				this.isRequesting = true;
				
				// 发起通话请求
				uni.request({
					url: `${config.baseUrl}/api/call/request`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${uni.getStorageSync('token')}`
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 200) {
							console.log('通话请求已发送，等待志愿者接听');
						} else {
							this.isRequesting = false;
							uni.showToast({
								title: res.data.message || '发起通话请求失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						this.isRequesting = false;
						console.error('请求失败:', err);
						uni.showToast({
							title: '网络请求失败',
							icon: 'none'
						});
					}
				});
			},
			
			handleIncomingCall(message) {
				console.log('[TUICallKit] handleIncomingCall triggered with message:', message);
				// 作为志愿者收到通话请求
				uni.showModal({
					title: '收到通话请求',
					content: `用户 ${message.callerId} 请求与您通话`,
					confirmText: '接受',
					cancelText: '拒绝',
					success: (res) => {
						if (res.confirm) {
							// 接受通话
							this.acceptCall(message.roomId);
						} else {
							// 拒绝通话
							this.rejectCall(message.roomId);
						}
					}
				});
			},
			
			acceptCall(roomId) {
				uni.request({
					url: `${config.baseUrl}/api/call/accept`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${uni.getStorageSync('token')}`,
						'Content-Type': 'application/json' 
					},
					data: {
						roomId: roomId
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 200) {
							console.log('已接受通话请求');
						} else {
							uni.showToast({
								title: res.data.message || '接受通话失败',
								icon: 'none'
							});
						}
					}
				});
			},
			
			rejectCall(roomId) {
				uni.request({
					url: `${config.baseUrl}/api/call/reject`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${uni.getStorageSync('token')}`,
						'Content-Type': 'application/json' 
					},
					data: {
						roomId: roomId
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 200) {
							console.log('已拒绝通话请求');
						} else {
							uni.showToast({
								title: res.data.message || '拒绝通话失败',
								icon: 'none'
							});
						}
					}
				});
			},
			
			handleCallAccepted(message) {
				console.log('[handleCallAccepted] 收到通话接受消息:', message);
				
				// 兼容新旧格式
				const data = message.data || {};
				const callerId = data.callerId || message.callerId;
				const calleeId = data.calleeId || message.calleeId;
				const roomId = data.roomId || message.roomId;
				const callerRole = data.callerRole || '视障用户';
				const calleeRole = data.calleeRole || '志愿者';

				console.log('[handleCallAccepted] 用户信息:', { 
					callerId, 
					calleeId, 
					roomId, 
					callerRole, 
					calleeRole 
				});

		
				this.startCall(roomId, calleeId);
			},
			
			handleCallRejected(message) {
				this.isRequesting = false;
				uni.showToast({
					title: '志愿者拒绝了通话请求',
					icon: 'none'
				});
			},
			
			handleCallEnded(message) {
				this.isRequesting = false;
				// 结束TUICallKit通话
				uni.$TUICallKit.hangup();
				uni.showToast({
					title: '通话已结束',
					icon: 'none'
				});
			},
			
			handleCallTimeout(message) {
				this.isRequesting = false;
				uni.showToast({
					title: message.content || '通话请求超时',
					icon: 'none'
				});
			},
			
			handleErrorMessage(message) {
				this.isRequesting = false;
				uni.showToast({
					title: message.content || '发生错误',
					icon: 'none'
				});
			},
			
			startCall(roomId, remoteUserId) {
				try {
					const userIDList = [String(remoteUserId)];
					const callParams = {
						userIDList,
						callMediaType: 2,
						callParams: {
							strRoomID: String(roomId),
							timeout: 30
						}
					};

					uni.$TUICallKit.calls(callParams, res => {
						if (res.code !== 0) {
							this.isRequesting = false;
							console.error('[TUICallKit] 通话启动失败:', res.msg);
							uni.showToast({
								title: '发起通话失败: ' + (res.msg || res.code),
								icon: 'none'
							});
						} else {
							console.log('[TUICallKit] 通话启动成功');
						}
					});
				} catch (error) {
					console.error('[TUICallKit] 通话错误:', error);
					this.isRequesting = false;
					uni.showToast({
						title: '发起通话失败: ' + error.message,
						icon: 'none'
					});
				}
			},
			
			// 设置TUICallKit事件监听
			setupTUICallKitListeners() {
				// 监听通话邀请
				uni.$TUICallKit.addEventListener('onCallReceived', (event) => {
					console.log('[主叫方TUICallKit] 收到通话邀请');
				});
				
				// 监听通话接受
				uni.$TUICallKit.addEventListener('onCallAccepted', (event) => {
					console.log('[主叫方TUICallKit] 通话被接受');
				});
				
				// 监听通话拒绝
				uni.$TUICallKit.addEventListener('onCallRejected', (event) => {
					console.log('[主叫方TUICallKit] 通话被拒绝');
					this.isRequesting = false;
					uni.showToast({ title: '通话被拒绝', icon: 'none' });
				});
				
				// 监听通话结束
				uni.$TUICallKit.addEventListener('onCallEnded', (event) => {
					console.log('[主叫方TUICallKit] 通话结束');
					this.isRequesting = false;
					uni.showToast({ title: '通话已结束', icon: 'none' });
				});
				
				// 监听通话超时
				uni.$TUICallKit.addEventListener('onCallTimeout', (event) => {
					console.log('[主叫方TUICallKit] 通话超时');
					this.isRequesting = false;
					uni.showToast({ title: '通话请求超时', icon: 'none' });
				});
				
				// 监听错误
				uni.$TUICallKit.addEventListener('onError', (event) => {
					console.error('[主叫方TUICallKit] 发生错误:', event.code);
					this.isRequesting = false;
					uni.showToast({ title: '通话系统错误: ' + event.code, icon: 'none' });
				});
			}
		}
	}
</script>

<style>
.container {
	margin: 30px;
}
.call-section {
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.container button {
	margin-top: 20px;
	background-color: #007AFF;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 15px 30px;
	font-size: 16px;
	width: 80%;
}
.container button:disabled {
	background-color: #ccc;
}
.container text {
	font-size: 16px;
	color: #333;
	margin-top: 10px;
}
.hint-text {
	color: #666;
	font-size: 14px;
	text-align: center;
	margin-top: 15px;
}
</style> 