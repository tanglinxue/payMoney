<template>
	<view class="main column-center">
		<!-- #ifdef MP-WEIXIN -->
		<image src="@/static/images/banner.png" class="banner mgb20" mode="widthFix"></image>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<image src="@/static/images/banner2.png" class="banner2 mgb20" mode="widthFix"></image>
		<!-- #endif -->
		<view class='fail column-center' v-if='fail'>
			<image src="@/static/images/img1.png" class='right-img'  mode="widthFix"></image>
			<view class='popup column-center'>
				<image src="@/static/images/popup1.png"  mode="widthFix" class='popup1Img'></image>
				<view class='text1'>支付失败</view>
				<view class='text2'>返回APP重新下单</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class='btn row-center'>确定</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: '',
			type: '',
			order_no: '',
			fail:false
		};
	},
	onLoad(options) {
		console.log(options)
		if(options.scheme){
			const scheme = decodeURIComponent(scheme)
			const {token,type,order_no} = scheme;
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
	.banner2{
		width:726rpx;
		height:496rpx;
		margin-top:12rpx;
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
.fail{
	position: fixed;
	width:100%;
	height:100%;
	left:0;
	top:0;
	background:rgba(0, 0, 0, 0.5);
	.right-img{
		width: 254rpx;
		height:86rpx;
		position: absolute;
		top:18rpx;
		right:34rpx
	}
	.popup{	
		width: 630rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding:80rpx 0;
		
		.popup1Img{
			width:328rpx;
			height:208rpx;
			margin-bottom: 50rpx;
		}
		.text1{
			font-weight: bold;
			color:#333;
			font-size:40rpx;
			margin-bottom: 15rpx;
		}
		.text2{
			color: #959595;
			font-size:30rpx;
		}
		.btn{
			font-size:30rpx;
			color: #FFFFFF;
			width:388rpx;
			height:84rpx;
			background: url(@/static/images/btn-bg.png);
			background-size: 100% 100%;
			letter-spacing: 1px;
			margin-top: 60rpx;
		}
	}
}
</style>
