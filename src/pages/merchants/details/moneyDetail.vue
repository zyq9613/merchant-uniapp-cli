<template>
	<view class="moneyCont">
		<u-loading-icon :show="showLoading"></u-loading-icon>
		<view class="amountMoney">{{detailInfo.amountMoney}}</view>
		<view class="expenditureType">{{detailInfo.expenditureType}}</view>
		<view class="time">{{detailInfo.time}}</view>
		<u-line></u-line>
		<view class="item first">
			<view class="itmeName">当前状态：</view>
			<view class="itemText">{{detailInfo.state}}</view>
		</view>
		<view class="item">
			<view class="itmeName">支付时间：</view>
			<view class="itemText">{{detailInfo.creationTime}}</view>
		</view>
		<view class="item">
			<view class="itmeName">支付方式：</view>
			<view class="itemText">{{detailInfo.mode}}</view>
		</view>
		<view class="item">
			<view class="itmeName">交易单号：</view>
			<view class="itemText">{{detailInfo.oddNumbers}}</view>
		</view>
		<view class="item">
			<view class="itmeName">商户单号：</view>
			<view class="itemText">{{detailInfo.merchantNo}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'moneyDetail',
		data(){
			return {
				showLoading: false,
				detailInfo: {
					amountMoney: '-5000.00',
					expenditureType:'直播间红包',
					time:'9月25日 18:30',
					state: '支付成功',
					creationTime:'2022年9月25日 18:20:20',
					mode:'银行卡转账',
					oddNumbers:'102234354332425345343',
					merchantNo:'102234354332425345343'
				}
			}
		},
		onLoad(option) {
			console.log(option)
			this.getInfo();
		},
		methods:{
			getInfo(){
				
			},
		}
	}
</script>

<style  lang="scss" scoped>
	.moneyCont{
		padding: 0 26rpx;
		.amountMoney{
			font-size: 36rpx; font-weight: 500;color: #000000;line-height: 60rpx; text-align: center; padding-top: 44rpx;
		}
		.expenditureType{
			text-align: center;
			font-size: 26rpx;
			font-weight: 400;
			color: #000000;
			line-height: 60rpx;
		}
		.time{
			font-size: 26rpx; text-align: center;
			font-weight: 400;
			color: rgba(50, 50, 50, .4);line-height: 60rpx; padding-bottom: 46rpx;
		}
		.item{
			display: flex; flex-direction: row; margin: 24rpx 0; font-size: 26rpx;
			&.first{
				margin: 56rpx 0 16rpx 0;
			}
			.itmeName{
				width: 180rpx; font-weight: 400; color: rgba(50, 50, 50, .4);
			}
			.itemText{
				flex: 1; width: 130rpx; font-weight: 400; color: #323232;
			}
		}
	}
</style>