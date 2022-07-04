<template>
	<view class="main column-center">
		<image src="@/static/images/banner.png" class="banner mgb20" mode="widthFix"></image>
		<!-- <view class='row-between mgb20'>
			<text>type输入2</text>
			<input type='number' v-model="type">
		</view>
		<view class='row-between mgb20'>
			<text>订单号输入</text>
			<input type='text' v-model="order_no">
		</view>
		<view class='row-between mgb20'>
			<text>token输入</text>
			<input type='text' v-model="token">
		</view>
		<button @click="Pay">支付</button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: '',
			type: '',
			order_no: '',
		};
	},
	onLoad(options) {
		console.log(options)
		if(options.token){
			const {token,type,order_no} = options;
			this.type = type;
			this.order_no = order_no
			this.$store.dispatch("user/updateToken", token);
			this.Pay();
		}
		
	},
	methods: {
		async getCode() {
			this.code = await this.$methods.getCode();
			console.log('code=>' + this.code);
		},
		async Pay() {
			await this.getCode();
			let { code, type, order_no} = this;
			//#ifdef MP-WEIXIN
			const API = this.$API.home.wetpay
			//#endif
			//#ifdef MP-ALIPAY
			const API = this.$API.home.alipay
			//#endif
			let data = await API({ code, type, order_no });
			//#ifdef MP-WEIXIN
			const { timeStamp, nonceStr, paySign, signType, package: pack } = JSON.parse(data);	
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: timeStamp,
				nonceStr: nonceStr,
				package: pack,
				signType: signType,
				paySign: paySign,
				success: res => {
					console.log('成功');
				},
				fail: err => {
					console.log('失败');
				}
			});
			//#endif
			//#ifdef MP-ALIPAY	
			uni.requestPayment({
				provider: 'alipay',
				orderInfo:data,
				success: res => {
					console.log('成功');
				},
				fail: err => {
					console.log(err)
					console.log('失败');
				}
			});
			//#endif
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	.banner {
		width: 100%;
	}
	input{
		border:1px solid #ededed;
		margin-left: 10rpx;
		flex:1
	}
	.row-between{
		width:750rpx
	}
}
</style>
