const APPID = "wx5097ef3c53eeb967";
const REDIRECT_URI = "http://h5.linghongbao.net";

// 获取code
doQueryCode () {
	let state = parseInt(Math.random() * 1000);
	console.info("redirect_uri:" + redirect_uri);
	const path = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
	window.location.replace(path);
},