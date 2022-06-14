import methods from 'utils/method.js'
import {jump} from 'utils/method.js'
import API from '@/api'
//ok
export default {
	install(Vue){
		//给Vue原型上添加一个方法（vm和vc就都能用了）
		// 任意组件可以使用API相关的接口
		Vue.prototype.$API = API
		Vue.prototype.$jump = jump
		Vue.prototype.$methods = methods	
	}
}