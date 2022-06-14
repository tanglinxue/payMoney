import storage from '@/utils/storage';
//ok
const user = {
	namespaced: true,
	state: {
		useInfo: {
		
		},
		token: storage.getItem('token'),
	},
	mutations: {
		updateUseInfo(state, useInfo) {
			state.useInfo = useInfo
		},
		updateToken(state, token) {
			state.token = token
		},
	},
	actions: {
		updateUseInfo({commit}, useInfo) {
			commit('updateUseInfo', useInfo)
		},
		updateToken({commit}, token) {
			commit('updateToken', token)
			storage.setItem('token',token)
		}
	}
}
export default user
