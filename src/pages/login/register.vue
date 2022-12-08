<template>
	<view class="content">
		<!-- 顶部文字 -->
		<image class="login-top" mode="scaleToFill" src="../../static/login_top.png"></image>
		<view class="logo-group">
			<image mode="aspectFit" class="logo" src="../../static/icon_gold_coin.png"></image>
			<text class="register-text">登录/注册领红包</text>
		</view>
		<view class="wechat-login-group">
			<button class="send-btn" :disabled="!canLogin" @click="doQueryCode">微信一键注册登录</button>
			<iniAgreements class="agreement" style="" @setAgree="agree = $event"></iniAgreements>
		</view>
	</view>
</template>

<script>
	import mixin from '../../common/login-page.mixin.js';
	import iniAgreements from "@/components/uni-agreements.vue";

	import {
		doRegisterWechat
	} from "../../api/user";
	export default {
		mixins: [mixin],
		components: {
			iniAgreements
		},
		data() {
			return {
				openId: "",
				shareId: "",
				"agree": false,
				needLogin: true
			}
		},
		computed: {
			canLogin() {
				return this.agree;
			},

		},
		onReady() {
			let code = this.getQueryVariable('code');
			var shareCode = this.getQueryVariable('shareCode');
			if (shareCode) {
				getApp().saveShareCode(shareCode);
				getApp().globalData.shareCode = shareCode;
			} else {
				shareCode = getApp().getShareCode();
			}
			console.info("====shareCode:" + shareCode);
			console.info("====code:" + code)
			if (code != undefined) {
				this.doRegisterWechat(code, shareCode);
			}
		},
		methods: {

			doGetWechatOpenId() {
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, //请勿直接使用前端获取的unionid或openid直接用于登录，前端的数据都是不可靠的
					complete: (e) => {
						console.log(e);
					},
					success: async res => {
						console.log("=====>" + JSON.stringify(res));
						let openId = res.code;
						this.doLoginWechat(openId);

					},
					fail: async (err) => {
						console.log(err);
					}
				});
			},
			doLoginWechat(openId) {
				doLoginByWechat(openId, this.shareId)
					.then(result => {
						// nickname  ico  sex 
						console.info("result====>" + JSON.stringify(result));
						if (result != undefined && result.code != undefined && result.code == "R000") {
							let userInfo = result.data;
							if (userInfo != undefined && userInfo.nickname != undefined) {
								this.needLogin = false;
							} else {
								this.needLogin = true;
							}
							if (userInfo != undefined) {
								getApp().globalData.token = userInfo.token;
							}
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			getUserInfo() {
				uni.getUserProfile({
					desc: "用于设置账户昵称和头像",
					complete: (result) => {
						console.log("getUserProfile:", result);
						let userInfo = result.userInfo;
						let nickName = userInfo.nickName;
						let avatar = userInfo.avatarUrl;
						let sex = userInfo.gender;
						this.doUpdateWechat(nickName, avatar, sex);
					}
				})
			},
			doUpdateWechat(nickname, ico, sex) {
				doUpdateUserInfo(nickname, ico, sex)
					.then(result => {
						// nickname  ico  sex 
						console.info("result====>" + JSON.stringify(result));
						if (result != undefined && result.code == "R000") {
							uni.showToast({
								title: result.msg || '登录完成',
								icon: 'none'
							});
						}
					})
					.catch(error => {
						console.log(error);
					});
			},

			doQueryCode() {
				// 获取code
				// const redirect_uri='http://app.xxx.com/project'
				// let redirect_uri = window.location.href.replace(
				// 	/[\?&]((code|state|from|pass_ticket|isappinstalled)=[^&#]+)/g, '').replace(/&&/g, '');
				let redirect_uri = `${this.$baseUrl}#/pages/login/register`;
				let appid = 'wx5097ef3c53eeb967';
				let state = parseInt(Math.random() * 1000);
				console.info("redirect_uri:" + redirect_uri);
				const path =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
				console.info("path:" + path);
				window.location.replace(path);
			},

			doRegisterWechat(code, shareCode) {
				let that = this;
				doRegisterWechat(code, shareCode)
					.then(result => {

						console.info("result====>" + JSON.stringify(result));
						if (result != undefined && result.code == "R000" && result.data != undefined) {
							getApp().saveUserInfo(result.data);
							getApp().globalData.userInfo = result.data;
							getApp().globalData.token = result.data.token;
							this.toHome();
						} else if (result != undefined && result.code == "R205") {
							let error = result.msg;
							uni.showModal({
								title: '提示',
								content: error,
								confirmText: "去登录",
								confirmColor: "#fa192c",
								success: function(res) {
									that.toLogin();
								}
							});
						}
					})
					.catch(error => {
						console.log(error);
					});
			},


			getQueryVariable(variable) {
				var query = location.search;
				console.info("===============>query:" + query);
				var rooms = query.split('?');
				for (var i = 0; i < rooms.length; i++) {
					var pair = rooms[i].split('=');
					if (pair[0] == variable) {
						return (pair[1].split('&'))[0]
					}
				}
				//或者拼接&后面的值
				var vars = query.split('&')
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split('=')
					if (pair[0] == variable) {
						return pair[1]
					}
				}
			},

			/**
			 * 跳转到首页
			 */
			toHome() {
				console.info("登录成功，跳转到首页");
				uni.switchTab({
					url: '/pages/live/list'
				})
			},
			/**
			 * 跳转到首页
			 */
			toLogin() {
				console.info("获取code成功，跳转绑定账户");
				uni.redirectTo({
					url: '/pages/login/wechat'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		position: absolute;
		align-items: center;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.login-top {
		height: 65%;
		width: 100%;
		position: absolute;
	}


	.auth-box {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.auth-box .link {
		font-size: 26rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}

	.login-top {
		height: 55%;
		width: 100%;
	}

	.logo-group {
		position: absolute;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		top: 10%;
		flex-direction: column;
		display: flex;
	}

	.logo {

		height: 170rpx;
		width: 170rpx;
	}

	.register-text {
		margin-top: 48rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 20rpx;
	}

	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}

	.agreement {
		margin-top: 40rpx;
	}

	.send-btn {
		width: 66%;
		margin-top: 60rpx;
		border-radius: 50rpx;
		border-width: 1rpx;
		border-color: #04BE02;
		font-size: 32rpx;
		text-align: center;
		color: #ffffff;
		padding: 4rpx;
		background-color: #04BE02;
	}

	.phone-btn {
		width: 66%;
		margin-top: 30rpx;
		height: 100rpx;
		background-color: #ffffff;
		border-color: #ffffff;
		border-width: 0rpx;
		font-size: 32rpx;
		text-align: center;
		color: #757575;
		padding: 4rpx;
	}

	.send-btn[disabled] {
		border-width: 1px;
		border-color: #04BE02;
		color: #FFFFFF;
		opacity: 0.4;
		background-color: #04BE02;
	}

	.wechat-login-group {
		bottom: 160rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
		position: absolute;
	}
</style>
