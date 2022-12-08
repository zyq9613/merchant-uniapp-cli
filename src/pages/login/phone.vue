<template>
	<view class="content">
		<!-- 顶部文字 -->
		<view class="title-group">
			<image class="title-mark" mode="aspectFit" src="../../static/icon_register_left.png"></image>
			<text class="title">为确保资金安全，只能使用本人的手机号</text>
			<image class="title-mark" mode="aspectFit" src="../../static/icon_register_right.png"></image>
		</view>
		<view class="tip-group">
			<image class="tip-image" mode="aspectFit" src="../../static/icon_tip.png"></image>
			<text class="tip-text">请输入手机号</text>
		</view>



		<view class="input-group">
			<text class="input-title">手机号</text>
			<input class="input-box" :inputBorder="false" v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="input-group">
			<text class="input-title">验证码</text>
			<input class="input-box" :inputBorder="false" v-model="smsCode" placeholder="请输入验证码" maxlength="4" />
			<text class="input-divider">&nbsp;&nbsp;|&nbsp;</text>
			<text class="get-sms-code vcode" style="margin-left: 30rpx;" v-if="!isPhone">{{smsText}}</text>
			<text class="get-sms-code vcode-active" style="margin-left: 30rpx;" @click="toQuerySmsCode"
				v-else>{{smsText}}</text>
		</view>
		<button class="send-btn" :disabled="btnState" @click="toLogin">登录</button>
	</view>
</template>

<script>
	import {
		doSendSmsCode,
		doLoginByPhone
	} from "../../api/user";
	export default {

		data() {
			return {
				phone: "",
				smsCode: '',
				shareCode: '',
				restSeconds: 60,
				smsText: '获取验证码',
				intervalId: null,
				shouldStart: true,
				btnState: false

			}
		},
		computed: {
			canLogin() {
				let allowLogin = this.isPhone && this.isSms;
				return allowLogin;
			},
			isSms() {
				return this.smsCode != undefined && this.smsCode != '' && this.smsCode.length == 4;
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
		},
		onLoad(options) {

			let scode = options.shareCode;
			if (scode == undefined || scode == '') {
				this.shareCode = undefined;
			} else {
				this.shareCode = scode;
			}
			this.phone = getApp().getStorageData('REDEN_CACHEKEYS_PHONE');
			console.info("===========>code:" + this.code);
			console.info("===========>shareCode:" + this.shareCode);
		},

		methods: {
			/**
			 * 密码登录
			 */
			toLogin() {
				if (!this.isSms && !this.isPhone) {
					return uni.showToast({
						title: "请输入用户名称或者手机号",
						icon: 'none'
					});
				}
				this.btnState = true;
				doLoginByPhone(this.phone, this.smsCode, this.shareCode)
					.then(result => {
						if (result != undefined && result.code == "R000" && result.data != undefined) {
							getApp().saveUserInfo(result.data);
							getApp().globalData.userInfo = result.data;
							getApp().globalData.token = result.data.token;
							getApp().saveStorageData('REDEN_CACHEKEYS_PHONE', this.phone);
							this.toHome();
						} else {
							let error = result.msg;
							uni.showModal({
								title: '提示',
								content: error,
								success: function(res) {

								}
							});
						}
						this.btnState = false;
					})
					.catch(error => {
						console.log(error);
					});
			},

			toQuerySmsCode() {
				if (!this.shouldStart) {
					return;
				}
				doSendSmsCode(this.phone)
					.then(result => {
						console.info("result====>" + JSON.stringify(result));
						if (result != undefined && result.code == "R000" && result.data != undefined) {
							this.startInterval();
						} else {
							let error = result.msg;
							uni.showModal({
								title: '提示',
								content: error,
								success: function(res) {

								}
							});
						}
					})
					.catch(error => {
						console.log(error);
					});



			},
			startInterval() {
				let that = this;
				this.intervalId = setInterval(() => {
					if (this.restSeconds <= 0) {
						that.stopInterval();
					} else {
						this.shouldStart = false;
						this.smsText = `      ${this.restSeconds}s      `;
						--this.restSeconds;
					}
				}, 1000)
			},
			stopInterval() {
				clearInterval(this.intervalId);
				this.shouldStart = true;
				this.smsText = '获取验证码';
			},
			/**
			 * 跳转到首页
			 */
			toHome() {
				console.info("登录成功，跳转到首页");
				this.stopInterval();
				uni.switchTab({
					url: '/pages/live/list'
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		align-items: center;
		height: 100%;
		background-color: #ffffff;
		flex-direction: column;
		display: flex;
	}

	.title-group {
		border-top-color: #eeeeee;
		border-top-width: 1rpx;
		border-top-style: solid;
		width: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		display: flex;
		flex: 1;
	}

	.title-mark {
		width: 60rpx;
		height: 120rpx;

	}

	.title {
		font-size: 26rpx;
		color: #AFAFAF;
		margin-left: 20rpx;
		margin-right: 20rpx;
		line-height: 30rpx;
		text-align: center;

	}

	.input-group {
		width: 90%;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		flex-direction: row;
		border-bottom-style: solid;
		display: flex;
		border-bottom-color: #d0d3d7;
		border-bottom-width: 1rpx;
	}

	.tip-group {

		height: 82rpx;
		flex-direction: row;
		display: flex;
		background: #F8F8F8;
		width: 100%;
		align-items: center;
	}

	.tip-image {
		margin-left: 30rpx;
		width: 32rpx;
		height: 32rpx;
	}

	.tip-text {
		margin-left: 10rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #AFAFAF;

	}

	.input-title {
		height: 20px;
		font-size: 14px;
		color: #323232;
		line-height: 20px;
	}

	.get-sms-code {
		height: 20px;
		font-size: 26rpx;
		width: 150rpx;
		text-align: center;
		line-height: 20px;
	}

	.vcode {
		color: #a7a7a7;
	}

	.vcode-active {
		color: #555555;
	}

	.input-box {
		width: 50%;
		margin-left: 30rpx;
		height: 26rpx;
		font-size: 13px;
		color: #323232;
		line-height: 36px;
	}

	.input-divider {
		height: 20rpx;
		color: #cbcbcb;
	}

	.send-btn {
		width: 80%;
		margin-top: 60rpx;
		border-radius: 20rpx;
		border-width: 1rpx;
		border-color: #04BE02;
		font-size: 32rpx;
		text-align: center;
		color: #ffffff;
		padding: 4rpx;
		background-color: #FD5449;
	}

	.send-btn[disabled] {
		border-width: 1px;
		border-color: #FD5449;
		color: #FFFFFF;
		opacity: 0.4;
		background-color: #FD5449;
	}
</style>
