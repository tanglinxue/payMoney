import request from '../request.js'
export default {
	//获取技师信息
	async tech_details(data={}) {
		let res = await request({
			url: '/api/Techindex/tech_details', 
			method: 'POST',
			data
		})
		return res
	},
	//获取技师业绩
	async getResults(data={}) {
		let res = await request({
			url: '/api/Techindex/results', 
			method: 'POST',
			data
		})
		return res
	},
	//首页获取平台公告
	async getNotice(data={}) {
		let res = await request({
			url: '/api/Techindex/notice', 
			method: 'POST',
			data
		})
		return res
	},
	//获取手机号验证码
	async getSms(data={}){
		let res = await request({
			url: '/api/Techlogin/send', 
			method: 'POST',
			data
		})
		return res
	},
	// 登录短信验证
	async login(data={}){
		let res = await request({
			url: '/api/Techlogin/check1', 
			method: 'POST',
			data
		})
		return res
	},
	// 获取新闻详细内容
	async tech_new(data={}){
		let res = await request({
			url: '/api/Technews/tech_new', 
			method: 'POST',
			data
		})
		return res
	},
	//获取技师业绩汇总和每日数据
	async score_result(data={}){
		let res = await request({
			url: '/api/Techresults/tech_results', 
			method: 'POST',
			data
		})
		return res
	},
	//获取技师等级表
	async get_levels(data={}){
		let res = await request({
			url: '/api/Techresults/tech_levelset', 
			method: 'POST',
			data
		})
		return res
	},
	// 技师选择时间
	async tech_time(data={}){
		let res = await request({
			url: '/api/Techindex/tech_time', 
			method: 'POST',
			data
		})
		return res
	},
	// 修改时间
	async updata_time(data={}){
		let res = await request({
			url: '/api/Techindex/updata_time', 
			method: 'POST',
			data
		})
		return res
	},
	//获取位置
	async up_address(data={}){
		let res = await request({
			url: '/api/Techindex/up_address', 
			method: 'POST',
			data
		})
		return res
	},
	// 设置开关
	async auto_address(data={}){
		let res = await request({
			url: '/api/Techindex/auto_address', 
			method: 'POST',
			data
		})
		return res
	},
}  