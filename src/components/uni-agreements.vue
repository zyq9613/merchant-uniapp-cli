<template>
	<checkbox-group @change="setAgree" class="checkbox-group">
		<!-- <checkbox :checked="isAgree" style="transform: scale(0.6);" /> -->
		<text class="agreement-title">我已阅读并同意</text>
		<text class="agreement" @click="navigateTo('http://www.baidu.com','用户协议')">“用户协议”</text>
		<text class="agreement-thint">和</text>
		<text class="agreement" @click="navigateTo('http://www.baidu.com','隐私协议')">“隐私政策”</text>
	</checkbox-group>
</template>

<script>
	export default {
		name: "uni-agreements",
		computed: {

		},
		methods: {
			navigateTo(
				url,
				title
			) { 
				uni.navigateTo({
					url: '/pages/common/webview/webview?url=' + url + '&title=' + title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		created() {
		},
		data() {
			return {
				isAgree: false
			};
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	/* #endif */


	.checkbox-group {
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
		flex-direction: row;
	}



	.agreement-title {
		color: #777777;
	}

	.agreement-thint {
		color: #777777;
	}

	.agreement {
		color: #219BF1;
	}
</style>
