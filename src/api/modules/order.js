import request from '../request.js'
import {Upload} from '../request.js'
export default {
	// 获取订单列表
	async getList(data={}){
		let res = await request({
			url: '/api/Techorder/tech_order',
			method: 'POST',
			data
		})
		return res
	},
	// 订单详情页
	async getDetail(data={}){
		let res = await request({
			url: '/api/Techorderdetails/tech_order_details',
			method: 'POST',
			data
		})
		return res
	},
	//客户评价技师
	async submit_reply(data={}){
		let res = await request({
			url: '/api/Techreply/submit_reply', 
			method: 'POST',
			data
		})
		return res
	},
	
	//获取评价用户信息及评价标签
	async tech_reply(data={}){
		let res = await request({
			url: '/api/Techreply/tech_reply', 
			method: 'POST',
			data
		})
		return res
	},
	// 查看订单
	async reply_val(data={}){
		let res = await request({
			url: '/api/Techreply/reply_val', 
			method: 'POST',
			data
		})
		return res
	},
	// 订单操作
	async order_operation(data={}){
		let res = await request({
			url: '/api/Techorderdetails/order_operation', 
			method: 'POST',
			data
		})
		return res
	},
	// 修改备注
	async address_note(data={}){
		let res = await request({
			url: '/api/Techorderdetails/address_note', 
			method: 'POST',
			data
		})
		return res
	},
	// 上传图片
	async imgfile(data={}){
		let res = await Upload({
			url: '/api/Techorderdetails/imgfile', 
			method: 'POST',
			data,
			type:'multipart/form-data'
		})
		return res
	}
}  