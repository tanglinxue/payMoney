import request from '../request.js'
export default {
	// 微信支付
	async wetpay(data = {}) {
		let res = await request({
			url: '/api/orders/wetpay',
			method: 'POST',
			data
		})
		return res
	},
	// 支付宝支付
	async alipay(data = {}) {
		let res = await request({
			url: '/api/orders/alipay',
			method: 'POST',
			data
		})
		return res
	},
	async getList(data = {}) {
		let res = await request({
			url: '/api/orders/order_list',
			method: 'POST',
			data
		})
		return res
	},
}
