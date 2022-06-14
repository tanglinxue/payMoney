import config from '@/config'
import store from '@/store'
import methods from '@/utils/method.js'
export default function service(options) {
	const token = store.state.user.token
	console.log(token)
	if(!token){
		const res =  methods.toLogin()
		if(!res) return
	}
	// options.data.token = 'XfNcOofWrvnilA'
	
	 options.url =config.baseApi + options.url
	//options.url = (options.weixin ? config.weixinLogin : config.baseApi) + options.url
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url,
			//请求url中如果没有method，默认是get
			method: options.method || 'GET',
			//请求url中如果没有data，默认为空
			data: options.data || {},
			header: {
				token,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			dataType: 'json',
			success: res => {
				// setTimeout(()=>{
				// 	uni.hideLoading()
				// },2000)
				if (res.statusCode === 200 && res.data.code === 1) {
					// 请求成功
					const data = res.data.data
					resolve(data)

				} else {
					if (res.data.code === 4011) {
						//登录失败
						//uni.showToast({title:res.data.msg,icon:'none'})
						uni.hideLoading()
						methods.toLogin()

					} else if (res.data.code === 2) {
						//其他报错
						console.log(res.data.data)
						uni.showToast({
							title: res.data.data || '网络错误',
							icon: 'none',
							duration: 4000
						})
						uni.hideLoading()
						reject(res.data.data)
					} else {
						//其他报错
						console.log(res.data.data)
						uni.showToast({
							title: res.data.data || '网络错误',
							icon: 'none',
							duration: 2000
						})
						uni.hideLoading()
						reject(res.data.data)
					}

				}
			},
			fail: err => {
				uni.hideLoading()
				return uni.showToast({
					title: res.data.data || '网络错误',
					icon: 'none',
					duration: 2000
				})
				reject(err)
			},
			complete: (res) => {
				console.log("请求的地址为：" + options.url);
				console.log("请求的body参数为：" +  JSON.stringify(options.data));
				console.log("返回结果为：" + JSON.stringify(res));
			},
		})
	})
}


export function Upload(options) {
	options.url =config.baseApi + options.url
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: options.url,
			filePath: options.data.imgfile,
			fileType: 'image',
			name: "imgfile",
			success: res => {
				// setTimeout(()=>{
				// 	uni.hideLoading()
				// },2000)
				let data = JSON.parse(res.data);
				if (res.statusCode === 200 && data.code === 1) {
					// 请求成功
					resolve(data.data)

				} else {
					if (data.code === 4011) {
						//登录失败
						//uni.showToast({title:res.data.msg,icon:'none'})
						uni.hideLoading()
						methods.toLogin()

					} else if (data.code === 2) {
						//其他报错
				
						uni.showToast({
							title: data.data || '网络错误',
							icon: 'none',
							duration: 4000
						})
						uni.hideLoading()
						reject(res.data.data)
					} else {
						//其他报错
	
						uni.showToast({
							title: data.data || '网络错误',
							icon: 'none',
							duration: 2000
						})
						uni.hideLoading()
						reject(data.data)
					}

				}
			},
			fail: err => {
				uni.hideLoading()
				return uni.showToast({
					title: data.data || '网络错误',
					icon: 'none',
					duration: 2000
				})
				reject(err)
			},
			complete: (res) => {
				console.log("请求的地址为：" + options.url);
				console.log("请求的body参数为：" +  JSON.stringify(options.data));
				console.log("返回结果为：" + JSON.stringify(res));
			},
		})
	})
}
