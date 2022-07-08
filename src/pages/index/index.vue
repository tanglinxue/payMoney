<template>
	<view class="main column-center">
		<!-- #ifdef MP-WEIXIN -->
		<image src="@/static/images/banner.png" class="banner mgb20" mode="widthFix"></image>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<!-- 	<view class='payPopup'>
			<view class='title'>付款金额</view>
			<view class='enterMoney row-start'>
				<text>￥</text>
				<input type="number" placeholder="请输入付款金额"/>
			</view>
			<view class='pay-btn row-center' @click='fail=true'>立即支付</view>
		</view> -->
		<view class="main column-center">
			<image src="@/static/images/banner.png" class="banner mgb20" mode="widthFix"></image>
			<!-- <button @click="copy">复制code</button> -->
			<view class="row-between mgb20">
				<text>type输入</text>
				<input type="number" v-model="type" />
			</view>
			<view class="row-between mgb20">
				<text>订单号输入</text>
				<input type="text" v-model="order_no" />
			</view>
			<view class="row-between mgb20">
				<text>token输入</text>
				<input type="text" v-model="token" />
			</view>
			<button @click="Pay2">支付</button>
		</view>
		<!-- #endif -->
		<view class="fail column-center" v-if="fail">
			<image src="@/static/images/img1.png" class="right-img" mode="widthFix"></image>
			<view class="popup column-center">
				<image src="@/static/images/popup1.png" mode="widthFix" class="popup1Img"></image>
				<view class="text1">支付失败</view>
				<view class="text2">返回APP重新下单</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="launchApp" app-parameter="wechat" binderror="launchAppError" class="btn row-center">确定</button>
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
			token:'',
			fail: false
		};
	},
	onLoad(options) {
		console.log(options);

		if (options.scheme) {
			const scheme = decodeURIComponent(options.scheme);
			console.log(this.$methods.getObj(scheme));
			const { token, type, order_no } = this.$methods.getObj(scheme);
			this.type = type;
			this.order_no = order_no;
			this.$store.dispatch('user/updateToken', token);
			this.Pay();
		}
	},
	methods: {
		async getCode() {
			this.code = await this.$methods.getCode();
			console.log('code=>' + this.code);
		},
		async Pay2() {
			await this.getCode();
			let { code, type, order_no, token } = this;
			if (!token) {
				return this.$methods.showToast('请输入token');
			}
			if (!type) {
				return this.$methods.showToast('请输入type');
			}
			if (!order_no) {
				return this.$methods.showToast('请输入订单号');
			}
			//#ifdef MP-WEIXIN
			const API = this.$API.home.wetpay;
			//#endif
			//#ifdef MP-ALIPAY
			const API = this.$API.home.alipay;
			//#endif
			let data = await API({ code, type, order_no, token });
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
				orderInfo: data,
				success: res => {
					console.log('成功');
				},
				fail: err => {
					console.log(err);
					console.log('失败');
				}
			});
			//#endif
		},
		async Pay() {
			await this.getCode();
			let { code, type, order_no } = this;
			//#ifdef MP-WEIXIN
			const API = this.$API.home.wetpay;
			//#endif
			//#ifdef MP-ALIPAY
			const API = this.$API.home.alipay;
			//#endif
			let data = await API({
				code,
				type,
				order_no
			});
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
					this.fail = true;
				}
			});
			//#endif
			//#ifdef MP-ALIPAY
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: data,
				success: res => {
					console.log('成功');
				},
				fail: err => {
					console.log(err);
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
	.payPopup {
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0px 0px 8rpx 0px rgba(218, 218, 218, 0.5);
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 60rpx 30rpx 90rpx;
		.title {
			font-size: 30rpx;
			color: #111;
			margin-bottom: 40rpx;
		}
		.enterMoney {
			padding-bottom: 16rpx;
			border-bottom: 1px solid #f2f2f2;
			margin-bottom: 90rpx;
			height: 50rpx;
			text {
				font-size: 32rpx;
				font-weight: bold;
				color: #111111;
			}
		}
		.pay-btn {
			width: 640rpx;
			height: 96rpx;
			background: #2a93f8;
			border-radius: 50rpx;
			font-size: 36rpx;
			color: #fff;
			font-weight: bold;
			letter-spacing: 1px;
		}
	}
}

.fail {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.5);

	.right-img {
		width: 254rpx;
		height: 86rpx;
		position: absolute;
		top: 18rpx;
		right: 34rpx;
	}

	.popup {
		width: 630rpx;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 80rpx 0;

		.popup1Img {
			width: 328rpx;
			height: 208rpx;
			margin-bottom: 50rpx;
		}

		.text1 {
			font-weight: bold;
			color: #333;
			font-size: 40rpx;
			margin-bottom: 15rpx;
		}

		.text2 {
			color: #959595;
			font-size: 30rpx;
		}

		.btn {
			font-size: 30rpx;
			color: #ffffff;
			width: 388rpx;
			height: 84rpx;
			background: url(@/static/images/btn-bg.png);
			background-size: 100% 100%;
			letter-spacing: 1px;
			margin-top: 60rpx;

			&::after {
				border: none;
			}
		}
	}
}
</style>
