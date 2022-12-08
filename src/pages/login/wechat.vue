<template>
    <view class="content">
		<!-- <u-loading-page color="#000" class="load-page" loading-text="登录中,请稍候..." :loading="isShowLoadpage"></u-loading-page> -->
        <loginLoading v-if="isShowLoadpage"></loginLoading>
		<!-- 顶部文字 -->
        <!-- <image class="login-top" mode="scaleToFill" src="../../static/login_top.png"></image> -->
        <view class="logo-group">
            <image mode="aspectFit" class="logo" src="../../static/logo-01.png"></image>
            <!-- <text class="register-text">登录/注册领红包</text> -->
        </view>
        <view class="wechat-login-group">
            <button class="send-btn" @click="doQueryCode">微信一键登录</button>
            <!-- <text class="phone-btn" :disabled="!canLogin" @click="toPhoneLogin">手机登录</text> -->
            
        </view>
        <iniAgreements class="agreement" style="" @setAgree="agree = $event"></iniAgreements>
    </view>
</template>

<script>
import mixin from '../../common/login-page.mixin.js';
import iniAgreements from "@/components/uni-agreements.vue";
import loginLoading from "./components/login-loading.nvue";
import { setToken } from '@/utils/auth'
import {
    doLoginByWechat,
    doUpdateUserInfo,
    doWechatLoginByCode
} from "../../api/user";
export default {
    mixins: [mixin],
    components: {
        iniAgreements,
		loginLoading
    },
    data () {
        return {
            openId: "",
            shareId: "",
            "agree": false,
            needLogin: true,
			isShowLoadpage:false,
            shareCode:''
        }
    },
    computed: {
        canLogin () {
            return this.agree;
        },

    },
    created(){
       
    },
    onShow () {
        let code = this.getQueryVariable('code');
		let shareCode = this.getQueryVariable('state');
        this.shareCode = this.getQueryVariable('state') || this.getQueryVariable('shareCode');
        console.log(shareCode)
        console.log('我准备好了========= ')
		console.log(shareCode == undefined)
        if (code != undefined){
            this.doWechatLoginCode(code,shareCode);
        }
    },
    methods: {
        doQueryCode () {
            // 获取code
            // const redirect_uri='http://app.xxx.com/project'
            // let redirect_uri = window.location.href.replace(
            // 	/[\?&]((code|state|from|pass_ticket|isappinstalled)=[^&#]+)/g, '').replace(/&&/g, '');
			let shareCode = this.getQueryVariable('shareCode');
            let redirect_uri = this.$baseUrl;
            // let appid = 'wx5097ef3c53eeb967';
            let appid = this.$appId;   //正式环境
            let state = parseInt(Math.random() * 1000);
            console.info("redirect_uri:" + redirect_uri);
            const path =
                `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=${shareCode}#wechat_redirect`;
            console.info("path:" + path); http://


            window.location.replace(path);
        },
        doWechatLoginCode (code,shareCode) {
			this.isShowLoadpage = true;
            doWechatLoginByCode(code,shareCode)
                .then(result => {
                    console.info("result====>" + JSON.stringify(result));
                    debugger
                    if (result != undefined && result.code == "R000" && result.data != undefined){
                        getApp().saveUserInfo(result.data);
						getApp().saveShareCode(result.data.shareCode);
                        getApp().globalData.userInfo = result.data;
                        getApp().globalData.token = result.data.token;
                        setToken(result.data.token)
						this.isShowLoadpage = false;
                        this.toHome(result.data.ustate,result.data.roleType);
                    } else if (result != undefined && result.code == "R205"){
                        let error = result.msg;
                        uni.showModal({
                            title: '提示',
                            content: error,
                            confirmText: "去登录",
                            confirmColor: "#fa192c",
                            success: function (res) {
                                that.toLogin();
                            }
                        });
                    }else{
                        uni.showToast({
                            icon:'error',
                            title:result.msg,
                            duration:2000,
                            complete:() => {
                                this.isShowLoadpage = false;
                                setTimeout(() => {
                                    window.location.replace(this.$baseUrl)
                                },3000) 
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getQueryVariable (variable) {
            var query = location.search;
            var rooms = query.split('?');
            for (var i = 0; i < rooms.length; i++){
                var pair = rooms[i].split('=');
                if (pair[0] == variable)
                {
                    return (pair[1].split('&'))[0]
                }
            }
            //或者拼接&后面的值
            var vars = query.split('&')
            for (var i = 0; i < vars.length; i++){
                var pair = vars[i].split('=')
                if (pair[0] == variable)
                {
                    return pair[1]
                }
            }
        },

        /**
         * 跳转到首页
         */
        toHome (ustate,roleType) {
            if(!ustate || ustate == 0){
                const ROUTER = uni.getStorageSync('nextRoute') || null;
                if(ROUTER){
                    this.$Router.push({ name: ROUTER.name, params: ROUTER.query})
                }else{
                    if(roleType && roleType >= 11){
                        this.$Router.replaceAll({path:'/pages/live/list'});
                    }else{
                        this.$Router.replaceAll({path:'/pages/ucenter/ucenter'});
                    }
                    
                }
            }else{
                this.$Router.replaceAll({path:'/pages/tips/index'});
            }
        },
        toPhoneLogin () {
            uni.navigateTo({
                url: '/pages/login/phone'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
	.load-page{
		z-index: 10000;
	}
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
    margin-top: 150rpx;
    top: 10%;
    flex-direction: column;
    display: flex;
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
    opacity: 0.4;
    color: #FFFFFF;
    background-color: #04BE02;
}

.wechat-login-group {
    bottom: 450rpx;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 100rpx;
}
</style>
