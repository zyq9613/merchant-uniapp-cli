import App from './App.vue'
import store from './store'
import Api from "./api/api";
const host = 'http://gavin0511.gnway.cc/';
const baseUrl = 'http://h5.linghongbao.net/'
const appid = 'wx5db54a7ed6add1c7'
import router from './router'
import { RouterMount } from 'uni-simple-router'  //路径换成自己的
     

// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
import Mylink from '../node_modules/uni-simple-router/component/router-link.vue'
Vue.config.productionTip = false
Vue.prototype.$host = host;
Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$appId = appid;
App.mpType = 'app'
Vue.component('my-link',Mylink)
Vue.use(uView)
const app = new Vue({
	store,
	Api,
	...App
})
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// #endif

// // #ifdef VUE3
// import {
// 	createSSRApp
// } from 'vue'


// export function createApp() {
// 	const app = createSSRApp(App)
// 	app.use(store)
	
// 	return {
// 		app
// 	}
// }
// // #endif
