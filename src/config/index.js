const env = process && process.env && process.env.NODE_ENV;
console.log(env)
const baseApi = 'https://mini.lexiangdaojia.cn'
const EnvConfig = {
	development: {
		baseApi
	},
	production: {
		baseApi
	}
}
export default {
	env,
	...EnvConfig[env]
}
