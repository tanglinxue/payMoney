<template>
	<view class="main column-center">
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item v-for="(item, index) in list" :key="index"><img :src="item.img" class="img" /></swiper-item>
			</swiper>
			<view class="dots" v-if="list.length > 1">
				<block v-for="(item, index) in list" :key="index"><view class="dot" :class="index == swiperCurrent ? 'active' : ''"></view></block>
			</view>
		</view>
		<view class="btn-box mgb20"><view class="main-btn red-shadow">开始报价</view></view>
		<view class="boxOuter-box">
			<view class="boxOuter">
				<view class="title row-between"><text class='txt1'>最新报价:</text><text @click='jump(1)'>更多...</text></view>
				<view class="list">
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="title row-between"><text class='txt1'>报价模板:</text><text @click='jump(2)'>更多...</text></view>
				<view class="list">
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				}
			],
			swiperCurrent: 0
		};
	},
	methods:{
		jump(type) {
			if (type == 1) {
				this.$jump(`/pages/my/historyRecord`);
			} else if (type == 2) {
				this.$jump(`/pages/index/templateRecord`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	.banner {
		width: 100%;
		height: 400rpx;
		position: relative;
		.swiper {
			width: 100%;
			height: 100%;

			swiper-item {
				width: 100%;
				height: 100%;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.dots {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 30rpx;
			display: flex;
			justify-content: center;
			.dot {
				margin: 0 4rpx;
				width: 40rpx;
				height: 4rpx;
				background: rgba(255, 255, 255, 0.5);
				transition: all 0.6s;
				&.active {
					background: white;
				}
			}
		}
	}
	.btn-box {
		width: 100%;
		background: $white;
		padding: 30rpx;
	}
	.boxOuter-box {
		width: 100%;
		padding: 0 30rpx;
		.title {
			font-size:26rpx;
			margin-bottom: 20rpx;
			.txt1{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.list {
			padding: 0 20rpx;
			.item {
				padding: 10rpx 0;
				font-size: 26rpx;
			}
		}
	}
}
</style>
