import { getToken } from '@/utils/auth'
import store from '@/store'
var headers = {};
// const baseurl = 'http://api.linghongbao.net';
const baseurl = 'http://gavin0511.gnway.cc:8000'; //  测试
// const baseurl = 'http://134.175.109.240:8081'
export const Api = {
	realFetch(url, data = null, method = 'post') {
		if (data === null) {
			data = {};
		}else{
			Object.keys(data).forEach((item) => {
				const key = data[item];
				if (key === "" || key === null || key === undefined) {
				  delete data[item];
				}
			});
		}
		let isRetry = false;
		let requestUrl;
		headers = {
			'content-type': "application/x-www-form-urlencoded",
			'Authorization': getToken()
		};
		if (url.indexOf('http') == 0 || url.indexOf('https') == 0) {
			requestUrl = url;
		} else {
			requestUrl = baseurl + url;
		}
		return new Promise((resolve, reject) => {
			let times = 3;
			function success(data) {
				if(data.data && (data.data.code == 'R200' || data.data.code == 'R201')){
					console.log(data)
					debugger
					uni.clearStorageSync();
					// this.$Router.push({name:'login'})
					uni.reLaunch({
						url: '/pages/login/wechat'
					});
				}else if(data.data && data.data.code == 'R100'){
					uni.showToast({
						title: data.data.msg,
						duration: 2000
					});
					resolve(data);
				}else{
					resolve(data);
				}
			}
			function failed(error) {
				if (times === 0 || !isRetry) {
					reject(error);
				} else {
					setTimeout(function() {
						times -= 1;
						console.info(url + " 重试第" + times + "次");
						Api.request(requestUrl, headers, method, data, success, failed);
					}, 500);
				}
			}
			Api.request(requestUrl, headers, method, data, success, failed);
		});
	},

	request(url, header, method, data, resolve, reject) {
		console.info("request data is " + JSON.stringify(data));
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			data: data,
			header: headers,
			method: method,
			success: (res) => {
				console.log((res));
				resolve(res);
			},
			fail: (err) => {
				console.error(err)
				reject(err);
			}
		});
	},

	post(url, data = null) {
		return this.realFetch(url, data, 'post');
	},

	get(url, data = null) {
		return this.realFetch(url, data, 'get');
	},

	/**
	 * 发送验证码
	 * @param {String} mid  计划ID
	 */
	 illegalVocabulary(mid) {
		return this.get('/private/planconfig/keywords', {
			mid
		});
	},

	
	
	/**
	 * 发送验证码
	 * @param {String} phone 
	 */
	doSendsmsCode(phone) {
		return this.post('/v1/quick_app/config/global', {
			phone: phone
		});
	},
	/**
	 * 通过手机号验证码授权登录
	 * @param {String} phone 
	 * @param {String} code 
	 */
	doLoginByPhone(phone, code, shareCode) {
		return this.post('/public/mobile/login', {
			iphone: phone,
			vCode: code,
			shareCode: shareCode
		});
	},
	
	handleWechatPay(money) {
		return this.post('/private/merchant/recharge',{
			money
		});
	},
	/**
	 * 通过手机号密码登录
	 * @param {String} phone 
	 * @param {String} password 
	 */
	doLoginByPhonePwd(phone, password, shareCode) {
		return this.post('/public/mobile_psw/login', {
			phone: phone,
			psw: password,
			shareCode: shareCode
		});
	},
	
	/**
	 * 用户审核
	 * @param {String} uid 
	 */
	handleReviewed(uid) {
		return this.post('/private/merchant/examine', {
			uid
		});
	},
	
	/**
	 * 用户拉黑
	 * @param {String} uid 
	 */
	handleBlocked(uid) {
		return this.post('/private/merchant/addblock', {
			uid
		});
	},
	
	/**
	 * 通过微信授权登录
	 * @param {String} openId 
	 * @param {String} shareId
	 */
	doLoginByWechat(openId, shareId) {
		return this.post('/public/wx/login', {
			openId: openId,
			shareId: shareId
		});
	},
	/**
	 * 更新用户信息
	 * @param {String} nickname
	 * @param {String} ico
	 * @param {Integer} sex 
	 */
	doUpdateUserInfo(nickname, ico, sex) {
		return this.post('/private/acc/update/wxinfo', {
			nickname: nickname,
			ico: ico,
			sex: sex
		});
	},

	/**
	 * 使用微信code登录
	 * @param {String} code
	 */
	doWechatLoginByCode(code,shareCode) {
		if(shareCode == 'undefined'){
			return this.post('/public/wx/login', {
				code: code,
			});
		}
		return this.post('/public/wx/login', {
			code: code,
			shareCode
		});
	},
	/**
	 * 获取播放列表
	 * @param {String} type 
	 * @param {Integer} pageNo 
	 * @param {Integer} pageSize 
	 */
	doQueryLiveList(data) {
		return this.post('/private/plan/list', data);
	},

	/**
	 * 获取im签名
	 */
	doQueryImSign() {
		return this.post('/private/im/sign');
	},
	/**
	 * 退出登录
	 */
	doLoginOut() {
		return this.post('/private/acc/loginout');
	},

	/**
	 * 公众号分享签名
	 */
	doQueryWechatSignature(url) {
		return this.post('/public/wx/getJsapiTicket', {
			url: url
		});
	},

	/**
	 * 绑定商户
	 */
	doBindingWechat(code, phone, username, shareCode,password) {
		return this.post('/public/wx/m_share/' + shareCode, {
			code: code,
			phone: phone,
			name: username,
			password:password
		});
	},
	/**
	 * 绑定分享用户
	 */
	doRegisterWechat(code, shareCode) {
		return this.post('/public/wx/u_share/' + shareCode, {
			code: code,
			shareCode: shareCode
		});
	},
	/**
	 * 修改昵称
	 */
	doMidifyNick(nick) {
		return this.post('/private/acc/modifyName', {
			name: nick
		});
	},
	/**
	 * 修改手机号
	 */
	doMidifyPhone(phone) {
		return this.post('/private/acc/modifyPhone', {
			phone: phone
		});
	},
	/**
	 * 修改手机号
	 */
	doMidifyGender(sex) {
		return this.post('/private/acc/modifySex', {
			sex: sex
		});
	},

	/**
	 * 发送短信验证码
	 */
	doSendSmsCode(phone) {
		return this.post('/public/mobile/sendSms', {
			iphone: phone
		});
	},

	/**
	 * 查询用户账户信息
	 */
	doQueryAccount() {
		return this.post('/private/acc/home');
	},
	
	/**
	 * 查询用户账户信息
	 */
	doJoinLive(planId) {
		return this.post('/private/redenvelop/join',{
			planId:planId
		});
	},
	
	/**
	 * 上报数据
	 */
	uploadData(planId) {
		return this.post('/private/planstat/report',{
			planId:planId
		});
	},
	
	/**
	 * 直播间领取红包
	 */
	redenvelopReceive(cost,planId,rewardId) {
		return this.post('/private/redenvelop/receive',{
			planId:planId,
			cost:cost,
			rewardId:rewardId
		});
	},

	/**
	 * 获取分类列表
	 */
	 getClassList(pid,mid) {
		return this.post('/private/goodscategory/list',{
			pid,
			mid
		});
	},
	

	
	/**
	 * 查询用户账户信息
	 */
	doJoinLive(planId) {
		return this.post('/private/redenvelop/join',{
			planId:planId
		});
	},
	
	/**
	 * 查询用户账户信息
	 */
	doRecordList(type,rewardType) {
		return this.get('/private/planrecord/list',{
			type,
			rewardType
		});
	},
	
	/**
	 * 查询计划列表
	 */
	doGetPlanlist() {
		return this.get('/private/plan/list');
	},

	/**
	 * 查询上级代理
	 */
	getSuperiorAgent(shareCode) {
		return this.get('/private/member/gettie',{
			shareCode
		});
	},

	getUserInfo() {
		return this.get('/private/acc/getLoginInfo');
	},
	
	/**
	 * 查询会员列表
	 */
	doGetUserlist(states,pageNo,pageSize) {
		return this.post('/private/merchant/list',{
			states,
			pageNo,
			pageSize
		});
	}
}
const hookTo = global.__proto__ || global
hookTo.Api = Api
