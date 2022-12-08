<template>
	<view class="content">
		<!-- 顶部文字 -->
		<!-- <image class="login-top" mode="scaleToFill" src="../../static/login_top.png"></image> -->
		<view class="logo-group">
			<!-- <image mode="aspectFit" class="logo" src="../../static/icon_gold_coin.png"></image> -->
			<!-- <text class="register-text">注册领红包</text> -->
			 <image mode="aspectFit" class="logo" src="../../static/logo-01.png"></image>
		</view>
		<view class="wechat-login-group">
			<button class="send-btn" @click="doQueryCode">微信一键授权注册</button>
			
		</view>
		<iniAgreements class="agreement" style="" @setAgree="agree = $event"></iniAgreements>
	</view>
</template>

<script>
	import mixin from '../../common/login-page.mixin.js';
	import iniAgreements from "@/components/uni-agreements.vue";
	import { setToken } from '@/utils/auth'
	import {
		doLoginByWechat,
		doUpdateUserInfo,
		doWechatLoginByCode
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
		onLoad() {
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
				this.toBinding(code, shareCode);
			}
		},
		methods: {
			/**
			 * 密码登录
			 */
			
			doQueryCode() {
				// 获取code
				// const redirect_uri='http://app.xxx.com/project'
				// let redirect_uri = window.location.href.replace(
				// 	/[\?&]((code|state|from|pass_ticket|isappinstalled)=[^&#]+)/g, '').replace(/&&/g, '');
				let redirect_uri = `${this.$baseUrl}#/pages/login/business`;
				// let appid = 'wx5097ef3c53eeb967';
				// let appid = 'wxa151e62f16fe60d1';   // 真实环境
				let appid = this.$appId;   // 真实环境
				let state = parseInt(Math.random() * 1000);
				console.info("redirect_uri:" + redirect_uri);
				const path =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
				console.info("path:" + path);
				window.location.replace(path);
			},

			doWechatLoginCode(code) {
				doWechatLoginByCode(code)
					.then(result => {
						// nickname  ico  sex 
						console.info("result====>" + JSON.stringify(result));
						if (result != undefined && result.code == "R000" && result.data != undefined) {
							getApp().saveUserInfo(result.data);
							getApp().globalData.userInfo = result.data;
							getApp().globalData.token = result.data.token;
							setToken(result.data.token)
							this.toHome();
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
				console.log("===============>rooms:" + rooms);
				for (var i = 0; i < rooms.length; i++) {
					console.info("test:" + rooms[i])
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
			toBinding(code, shareCode) {
				console.info("获取code成功，跳转绑定账户");
				
				uni.redirectTo({
					url: '/pages/login/binding?code=' + code + '&shareCode=' + shareCode
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
		justify-content: center;
		align-items: center;
		height: 300rpx;
		top: 10%;
		flex-direction: column;
		display: flex;
		margin-top: 150rpx;
	}

	.logo {

		height: 240rpx;
		width: 240rpx;
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
		position: absolute;
		bottom: 120rpx;
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
		bottom: 354rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 100rpx;
		
	}
</style>
