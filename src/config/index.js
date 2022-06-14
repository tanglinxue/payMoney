const env = process && process.env && process.env.NODE_ENV;
console.log(env)
const EnvConfig = {
	development: {
		// baseApi:'/api'
		// baseApi: 'http://manager.diandiantn.com'
baseApi: 'http://manager.diandiantn.com',
		weixinLogin: 'https://h5.diandiantn.com'
	},
	production: {
		baseApi: 'http://manager.diandiantn.com'
	}
}
export default {
	env,
	...EnvConfig[env]
}
