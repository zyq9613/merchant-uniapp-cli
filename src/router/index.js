// import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
import store from '@/store'
import { getToken } from '@/utils/auth'
Vue.use(Router)
//初始化
const router = new Router({
	// encodeURI:false,
	h5:{
		paramsToQuery:true
	},
    routes: [
		...ROUTES
		]//路由表
});

//全局路由前置守卫
router.beforeEach(async(to, from, next) => {
	console.log(to)
	if(getToken()){
		if(store.getters.userInfo && Object.entries(store.getters.userInfo).length > 0){
			if(to.name == 'login' || to.name == 'business'){
				if(store.getters.userInfo.roleType){
					next({name:'list'});
				}else{
					next({name:'ucenter'});
				}
			}else{
				next();
			}
		}else{
			try {
				await store.dispatch('user/userInfo');
				if(to.name == 'half' || to.name == 'full'){
					next({name:to.name,params:to.query})
				}else{
					next({...to,replace: true})
				}
				
			} catch (error) {
				// remove token and go to login page to re-login
				await store.dispatch('user/resetToken')
				next({
					path:'/pages/login/wechat',
					redirect: { name: to.name }
				})
			}
		}
	}else{
		if(to.name == 'login' || to.name == 'business' || to.name == 'binding'){
			next()
		}else{
			uni.setStorageSync('nextRoute',to)
			next('/pages/login/wechat')
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;