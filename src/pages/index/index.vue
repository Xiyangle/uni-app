<template>
	<view class="content">
		<view class="rpx">Hello World</view>
		<view class="vw">100vw=屏幕的宽度</view>
		<view class="sass">sass</view>
		<view>=========点击事件===========</view>
		<view class="btn" 
			data-index='777'
			@click="testClick(1,$event)">
			点击试试
		</view>
		<view>=========组件的传参===========</view>
		<view>子组件传递过来的路径：{{src}}</view>
		<img-border @srcChange='handleSrc' :src='src1'></img-border>
	</view>
</template>

<script>
	import imgBorder from '@/components/img-border'
	export default {
		components:{
			imgBorder
		},
		data() {
			return {
				src1: '/static/logo.png',
				src: ''
			}
		},
		onLoad() {
			console.log(this.baseurl)
			console.log(getApp().globalData.base)
		},
		methods: {
			testClick(index,event){
				console.log(index)
				console.log(event)
			},
			handleSrc(e){
				// console.log('父组件的自定义事件被触发了')
				// console.log(e)
				this.src = e
			}
		}
	}
</script>

<style lang="scss">
  .rpx {
    width: 750rpx;
    height: 100px;
    background-color: aqua;
    text-align: center;
    line-height: 100px;
  }
  .vw {
    width: 77vw;
    height: 100px;
    background-color: tan;
  }
  .content {
    .sass {
      background-color: red;
      color: $uni-color-primary;
    }
	.btn{
		background-color: $uni-color-warning;
		color: #FFFFFF;
		width: 50vw;
		text-align: center;
		border-radius: 50rpx;
		padding: 20rpx 0;
	}
  }
</style>
