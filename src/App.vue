<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			base: 'www.qq.com'
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './styles/iconfont.wxss';
	view,
	text,
	navigator,
	input,
	image,
	swiper,
	swiper-item,
	scroll-view,
	page {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Ma Shan Zheng', cursive;
	}
	page{
		color: $uni-text-color;
		font-size: 28rpx;
	}
	image{
		display: block;
		width: 100%;
	}
	
</style>
