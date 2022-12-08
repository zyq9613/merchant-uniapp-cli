	let state = {
		
		liveData:{}
	},
	getters = {
		live(state) {
			return state.liveData;
		},
	},
	mutations = {
		setLiveRoom(state,payload){
			state.liveData = payload.liveData
		}
	}
	

	export default {
		getters,
		state,
		mutations
	}