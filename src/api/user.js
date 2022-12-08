export function doSendSms(mobile) {
	return Api.doSendSms(mobile)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doLoginOut() {
	return Api.doLoginOut()
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function handleWechatPay(money) {
	return Api.handleWechatPay(money)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doLoginByPhone(mobile, code, shareCode) {
	return Api.doLoginByPhone(mobile, code, shareCode)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function getSuperiorAgent(shareCode) {
	return Api.getSuperiorAgent(shareCode)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doLoginByWechat(openId, shareId) {
	return Api.doLoginByWechat(openId, shareId)
		.then((response) => {
			console.info(response)
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doUpdateUserInfo(nickname, ico, sex) {
	return Api.doUpdateUserInfo(nickname, ico, sex)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doWechatLoginByCode(code,shareCode) {
	
	return Api.doWechatLoginByCode(code,shareCode)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doQueryImSign() {
	return Api.doQueryImSign()
		.then((response) => {
            // debugger
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
// 用户审核
export function handleReviewed(uid) {
	return Api.handleReviewed(uid)
	.then((response) => {
		return Promise.resolve(response.data);
	}).catch((err) => {
		return Promise.reject(err);
	});
}

// 用户拉黑
export function handleBlocked(uid) {
	return Api.handleBlocked(uid)
	.then((response) => {
		return Promise.resolve(response.data);
	}).catch((err) => {
		return Promise.reject(err);
	});
}


export function doQueryWechatSignature(url) {
	return Api.doQueryWechatSignature(url)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function getUserInfo() {
	return Api.getUserInfo()
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}



export function doBindingWechat(code, phone, username, shareCode, password) {
	return Api.doBindingWechat(code, phone, username, shareCode, password)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doRegisterWechat(code, shareCode) {
	return Api.doRegisterWechat(code, shareCode)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doLoginByPhonePwd(phone, password, shareCode) {
	return Api.doLoginByPhonePwd(phone, password, shareCode)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doMidifyNick(username) {
	return Api.doMidifyNick(username)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}


export function doMidifyPhone(phone) {
	return Api.doMidifyPhone(phone)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}


export function doMidifyGender(gender) {
	return Api.doMidifyGender(gender)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}


export function doQueryAccount() {
	return Api.doQueryAccount()
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doSendSmsCode(phone) {
	return Api.doSendSmsCode(phone)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function redenvelopReceive(cost,planId) {
	return Api.redenvelopReceive(cost,planId)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doGetUserlist(states,pageNo,pageSize) {
	return Api.doGetUserlist(states,pageNo,pageSize)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}