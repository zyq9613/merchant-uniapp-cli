<template>
	<view class="content">
		<u-loading-page bgColor="rgba(0,0,0,0.4)" color="#fff" class="load-page" loading-text="登录中,请稍候..." :loading="isShowLoadpage"></u-loading-page>
		<!-- 顶部文字 -->
		<view class="title-group">
			<image class="title-mark" mode="aspectFit" src="../../static/icon_register_left.png"></image>
			<text class="title">为确保资金安全，只能使用本人的手机号</text>
			<image class="title-mark" mode="aspectFit" src="../../static/icon_register_right.png"></image>
		</view>
		<!-- <view class="tip-group">
			<image class="tip-image" mode="aspectFit" src="../../static/icon_tip.png"></image>
			<text class="tip-text">请输入手机号</text>
		</view> -->

		<u--form
		:model="userInfo"
		:labelWidth="80"
		:rules="rules"
		ref="userInfo"
		>
			<u-form-item
				label="名称"
				prop="name"
			>
				<u--input
				    placeholder="请输入绑定名称"
					border="none"
				    v-model="userInfo.name"
				  ></u--input>
			</u-form-item>
			<u-form-item
				label="手机号"
				prop="phoneNumber"
			>
				<u--input
				    placeholder="请输入绑定手机号"
					border="none"
					type="number"
				    v-model="userInfo.phoneNumber"
				  ></u--input>
			</u-form-item>
			
			<u-form-item
				label="密码"
				prop="password"
			>
				<u--input
				    placeholder="请输入密码"
					border="none"
					type="password"
				    v-model="userInfo.password"
				  ></u--input>
			</u-form-item>
			<u-form-item
				label="确认密码"
				prop="confirmPassword"
			>
				<u--input
				    placeholder="请再次输入密码"
					border="none"
					type="password"
				    v-model="userInfo.confirmPassword"
				  ></u--input>
			</u-form-item>
			
		</u--form>
		

		<button class="send-btn" :disabled="btnState" @click="toBinding">绑定</button>
	</view>
</template>

<script>
	import { setToken } from '@/utils/auth'
	import {
		doBindingWechat
	} from "../../api/user";
	export default {

		data() {
			return {
				isShowLoadpage:false,
				userInfo:{
					name:'',
					phoneNumber:'',
					password:'',
					confirmPassword:''
				},
				code: '',
				shareCode: '',
				btnState:false,
				rules:{
					name:{
						type:'string',
						required:true,
						message: '请填写名称',
						trigger: ['blur', 'change']
					},
					phoneNumber:[
						{
							type:'number',
							required:true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},
						{
							validator:(rule,value,callback) => {
								return uni.$u.test.mobile(value);
							},
							trigger: ['blur'],
							message: '请填写正确的手机号',
						}
					],
					password:[
						{
							type:'string',
							required:true,
							message: '请输入密码',
							trigger: ['blur','change']
						},
						{
							min: 6,
							max: 12,
							trigger: ['blur','change'],
							message: '长度在6-12个字符之间',
						}
						
					],
					confirmPassword:[
						{
							type:'string',
							required:true,
							message: '请再次输入密码',
							trigger: ['blur', 'change']
						},
						{
							validator:(rule,value,callback) => {
								return value === this.userInfo.password
							},
							trigger: ['blur','change'],
							message: '确认密码和密码不符，请确认',
						}
					]
				}
			}
		},
		computed: {
			// canBinding() {
			// 	let allowLogin = this.isPhone && this.isUserName;
			// 	return allowLogin;
			// },
			// isUserName() {
			// 	return this.userName != undefined && this.userName != '';
			// },
			// isPhone() {
			// 	return /^1\d{10}$/.test(this.phone);
			// },
		},
		onLoad(options) {
			console.log(options,getApp().globalData)
			this.code = options.code?options.code:this.getQueryVariable('code');
			this.shareCode = options.shareCode?options.shareCode:getApp().globalData.shareCode;
			console.info("===========>code:" + this.code);
			console.info("===========>shareCode:" + this.shareCode);
		},

		methods: {
			/**
			 * 密码登录
			 */
			toBinding() {
				this.$refs.userInfo.validate().then(res => {
					this.isShowLoadpage = true;
					doBindingWechat(this.code, this.userInfo.phoneNumber, this.userInfo.name, this.shareCode,this.userInfo.password)
						.then(result => {
							console.info("result====>" + JSON.stringify(result));
							if (result != undefined && result.code == "R000" && result.data != undefined) {
								getApp().saveUserInfo(result.data);
								getApp().globalData.userInfo = result.data;
								getApp().globalData.token = result.data.token;
								setToken(result.data.token);
								this.isShowLoadpage = false;
								this.toHome();
							} else {
								let error = result.msg;
								this.isShowLoadpage = false;
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: error,
									success: function(res) {
					
									}
								});
							}
							
						})
						.catch(error => {
							console.log(error);
						});
				}).catch(errors => {
					uni.$u.toast('请按照提示完善信息')
				})
				
				
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

		}
	}
</script>

<style lang="scss" scoped>
	.load-page{
		z-index: 10000;
	}
	.u-form{
		width: 90%;
		margin: 0 auto;
	}
	.content {
		width: 100%;
		align-items: center;
		height: 100%;
		background-color: #ffffff;
		flex-direction: column;
		display: flex;
	}

	.title-group {
		border-top-color: #979797;
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
		align-items: center;
		border-bottom-color: #F6F6F6;
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
		width: 112rpx;
		// text-align: right;
		height: 20px;
		font-size: 14px;
		color: #323232;
		line-height: 20px;
	}

	.input-box {
		margin-left: 30rpx;
		height: 26rpx;
		font-size: 13px;
		color: #323232;
		line-height: 36px;
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
