<script>
	import TIM from 'tim-wx-sdk'

	export default {
		globalData: {
			token: "",
			userInfo: {},
			shareCode: '',
			roleType:'',
		},
		onLaunch: function() {
			uni.hideTabBar()
			this.initTencentIm();

		},
		onShow: function() {
			uni.hideTabBar()
			console.log('应用启动App Show')
			if (!getApp().globalData.userInfo.token) {
				let user = uni.getStorageSync('REDEN_CACHEKEYS_USERINFO');
				if (user) {
					getApp().globalData.userInfo = user;
					getApp().globalData.token = user.token;
				}
			}
			let shareCode = uni.getStorageSync('REDEN_CACHEKEYS_SHARECODE');
			if (shareCode) {
				getApp().globalData.shareCode = shareCode;
			}
		},
		onHide: function() {
			console.log('应用隐藏App Hide')
		},
		methods: {
			initTencentIm() {
				console.log('App Launch');
				let SDKAppID = 1400737558; // 填自己的 SDKAppID
				uni.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true);
				// 重点注意： 为了 uni-app 更好地接入使用 tim，快速定位和解决问题，请勿修改 uni.$TUIKit 命名。
				// 如果您已经接入 tim ，请将 uni.tim 修改为 uni.$TUIKit。
				uni.$TUIKit = TIM.create({
					SDKAppID: SDKAppID
				});
				uni.$TUIKit.setLogLevel(1);
				// 将原生插件挂载在 uni 上
				// #ifdef APP-PLUS
				uni.$TUICalling = TUICalling;
				// #endif
				// 如果您已创建了 tim，请将 tim 实例挂载在 wx 上，且不可以修改 wx.$TIM（修改变量可能导致 TUICalling 组件无法正常使用）, 完成 TUICalling 初始化，
				// 如果您没有创建，可以不传
				// #ifdef MP-WEIXIN
				wx.$TIM = uni.$TUIKit;
				// #endif
				uni.$TUIKitTIM = TIM;
				uni.$TUIKitEvent = TIM.EVENT;
				uni.$TUIKitVersion = TIM.VERSION;
				uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
				// 监听事件，如：

				uni.$TUIKit.on(TIM.EVENT.ERROR, function(event) {
					// 收到 SDK 发生错误通知，可以获取错误码和错误信息
					// event.name - TIM.EVENT.ERROR
					// event.data.code - 错误码
					// event.data.message - 错误信息
					console.info("=======ERROR======");
				});

				uni.$TUIKit.on(TIM.EVENT.SDK_NOT_READY, function(event) {
					// 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
					// event.name - TIM.EVENT.SDK_NOT_READY
					console.info("=======SDK_NOT_READY======");
				});
				uni.$TUIKit.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
					// 网络状态发生改变（v2.5.0 起支持）
					// event.name - TIM.EVENT.NET_STATE_CHANGE
					// event.data.state 当前网络状态，枚举值及说明如下：
					//   - TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
					//   - TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
					//   - TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
					console.info("=======NET_STATE_CHANGE======");
				});
			},
			getRunSystemInfo() {
				var info = uni.getSystemInfoSync().uniPlatform;
				if (info == "web") {
					info = navigator.userAgent.toLowerCase();
				}
				return info;
			},
			saveUserInfo(userInfo) {
				if (userInfo) {
					try {
						uni.setStorageSync('REDEN_CACHEKEYS_USERINFO', userInfo);
					} catch (e) {
						console.error("本地存储异常：", e)
					}
				}
			},
			saveShareCode(shareCode) {
				try {
					if (shareCode) {
						uni.setStorageSync('REDEN_CACHEKEYS_SHARECODE', shareCode);
					}
				} catch (e) {
					console.error("本地存储异常：", e)
				}
			},
			getShareCode() {
				return uni.getStorageSync('REDEN_CACHEKEYS_SHARECODE');
			},
			saveUserAccount(userAcount) {
				if (userAcount) {
					try {
						uni.setStorageSync('REDEN_CACHEKEYS_USERACCOUNT', userAcount);
					} catch (e) {
						console.error("本地存储异常：", e)
					}
				}
			},
			getUserAccount() {
				return uni.getStorageSync('REDEN_CACHEKEYS_USERACCOUNT');
			},
			saveStorageData(key, value) {
				try {
					if (value) {
						uni.setStorageSync(key, value);
					}
				} catch (e) {
					console.error("本地存储异常：", e)
				}
			},
			getStorageData(key) {
				return uni.getStorageSync(key);
			}

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
