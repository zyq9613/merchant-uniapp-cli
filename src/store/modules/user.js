import { getUserInfo } from '@/api/user';
import { removeToken } from '@/utils/auth'
// 上次启动时的用户信息
	let userInfoHistory = uni.getStorageSync('userInfo') || {};
	const getDefaultState = () => {
		return{
			//是否已经登录
			hasLogin: Boolean(Object.keys(userInfoHistory).length),
			//用户信息
			info: userInfoHistory,
			userInfo:{
				
			},
			token:''
		}	
	};
	let state = getDefaultState();
	const mutations = {
		RESET_STATE(state){
			Object.assign(state,getDefaultState())
		},
		SET_USERINFO(state,userInfo){
			state.userInfo = userInfo
		},
		SET_TOKEN(state,token){
			state.token = token
		}
	};
	const actions = {
		// 会员登录
		login({commit}){

		},
		userInfo({ commit }){
			return new Promise((resolve, reject) => {
				getUserInfo().then(res => {
					console.log(res)
					commit('SET_TOKEN',res.data.token)
					commit('SET_USERINFO',res.data)
					resolve(res.data)
				}).catch(error => {
					console.log(error)
					debugger
					reject(error)
				})
			})
		},
		resetToken({commit}){
			return new Promise((resolve) => {
				removeToken();
				commit('RESET_STATE');
				resolve()
			})
		}
	}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
