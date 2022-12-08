<template>
  <view class="tips">
    <view>
      <u-icon size="70" color="#4ACF9B" name="checkmark-circle-fill"></u-icon>
      <text>恭喜您注册成功<br />请联系上级代理【{{userInfo.pname}}(ID:{{userInfo.pid}})】进行审核</text>
    </view>
    
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "tips",
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
				'userInfo'
			])
  },
  methods: {
    
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    // history.pushState(null, null, document.URL);
    window.addEventListener("popstate",function(e) {  
      location.replace(document.URL)
    }, false);
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style lang="scss" scoped>
  .tips{
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    view{
      margin-top: -200rpx;
      align-items: center;
      display: flex;
      flex-direction: column;
      text{
        margin-top: 20rpx;
        color: #333;
        font-size: 32rpx;
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
</style>