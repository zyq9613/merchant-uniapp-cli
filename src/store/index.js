import user from '@/store/modules/user.js'
import tabbar from '@/store/modules/tabbar.js'
import live from '@/store/modules/live.js'


import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		user,
		tabbar,
		live
	},
	getters,
	strict: true
})
export default store