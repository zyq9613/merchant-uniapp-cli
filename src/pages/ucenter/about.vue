<template>
	<view class="content">
		<image class="icon-logo" src="../../static/icon_about.png"></image>

		<text class="app-name">短视频</text>
		<text class="app-version">v.1.0.1</text>
		<text class="app-detail">
			短视频直播建立于微信企业直播平台，坐拥微信流量优势与社交优势，致力于企业微信公众号，微信端分享直播，高效提高营销转化。以解决企业营销痛点出发，内置多种营销方式，数据分析，高清直播的短视频。</text>

	</view>
</template>

<script>
	export default {

		data() {
			return {

			}
		},
		computed: {


		},
		onLoad(options) {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		align-items: center;
		height: 100%;
		background-color: #ffffff;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		display: flex;
	}

	.icon-logo {
		width: 120rpx;
		height: 120rpx;
		margin-top: 100rpx;
	}

	.app-name {
		font-size: 32rpx;
		margin-top: 12rpx;
		font-weight: bold;
		color: #FC524B;
		line-height: 44px;
	}

	.app-version {
		font-size: 30rpx;
		font-weight: 400;
		color: #323232;
		line-height: 40rpx;
	}

	.app-detail {
		margin-top: 40rpx;
		width: 90%;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #323232;
		line-height: 58rpx;
	}
</style>
