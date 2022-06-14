import request from '../request.js'
export default {
	//我的页面
	async mypage(data={}) {
		let res = await request({
			url: '/api/user/mypage', 
			method: 'POST',
			data
		})
		return res
	},
	//读取技师未付金额
	async tech_pay(data={}){
		let res = await request({
			url: '/api/Mytech/tech_pay', 
			method: 'POST',
			data
		})
		return res
	},
	//技师打款记录
	async tech_paylog(data={}){
		let res = await request({
			url: '/api/Mytech/tech_paylog', 
			method: 'POST',
			data
		})
		return res
	},
	//技师信息接口
	async tech_detail(data={}){
		let res = await request({
			url: '/api/Mytech/tech_details', 
			method: 'POST',
			data
		})
		return res
	},
	// 余额变动记录
	async tech_balance(data={}){
		let res = await request({
			url: '/api/Techbalance/tech_balance', 
			method: 'POST',
			data
		})
		return res
	},
	//获取技师收益明细和汇总
	async tech_income(data={}){
		let res = await request({
			url: '/api/Techincome/tech_income', 
			method: 'POST',
			data
		})
		return res
	},
	// 银行卡查询
	async tech_pay_way(data={}){
		let res = await request({
			url: '/api/Mytech/tech_pay_way', 
			method: 'POST',
			data
		})
		return res
	},
	// 银行卡列表
	async get_bank_list(data={}){
		let res = await request({
			url: '/api/Mytech/bank_list', 
			method: 'POST',
			data
		})
		return res
	},
	// 设置银行卡
	async set_bank(data={}){
		let res = await request({
			url: '/api/Mytech/up_bank', 
			method: 'POST',
			data
		})
		return res
	},
	// 退出登录
	async logout(data={}){
		let res = await request({
			url: '/api/Techlogin/logout', 
			method: 'POST',
			data
		})
		return res
	},
  // 即使授权
  async weixinLogin(data={}){
  		let res = await request({
			weixin:true,
  			url: '/api/Mytech/tech_login', 
			//url: '/api/technicians/tech_login', 
  			method: 'POST',
  			data
  		})
  		return res
  	}
}


