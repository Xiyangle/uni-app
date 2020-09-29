<template>
	<view>
		<view @touchstart='handletouchstart' @touchend='handletouchend'></view>
		<image @click="test" src="https://raw.githubusercontent.com/Orz-3/task/master/10010.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 按下的时间
				startTime: 0,
				// 按下的坐标
				startX: 0,
				startY: 0
			};
		},
		onLoad() {
			
		},
		methods:{
			test(){
				uni.showToast({
					title: '中国联通',
					icon: 'none'
				})
			},
			handletouchstart(event){
				// console.log('手指按下屏幕')
				// console.log(event.changedTouches[0].clientX)
				// console.log(event.changedTouches[0].clientY)
				this.startTime = Date.now()
				this.startX = event.changedTouches[0].clientX
				this.startY = event.changedTouches[0].clientY
			},
			handletouchend(event){
				// console.log('手指离开屏幕')
				// console.log(event.changedTouches[0].clientX)
				// console.log(event.changedTouches[0].clientY)
				const endTime = Date.now()
				const endX = event.changedTouches[0].clientX
				const endY = event.changedTouches[0].clientY
				// 判断按下的时长
				if(endTime-this.startTime>2000){
					console.log('按下时长超过2秒')
					return
				}
				
				// 滑动的方向
				let direction=''
				
				// 判断用户滑动的距离 是否合法
				// 合法：判断滑动的方向 （注意的是距离要加上绝对值）
				if(Math.abs(endX-this.startX)>10){
					// 滑动的方向
					direction=endX-this.startX>0?'right':'left'
				}else{
					return
				}
				// 用户做了合法的操作
				console.log(direction)
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		background-color: aqua;
		height: 500rpx;
		width: 100%;
		image{
			height: 100rpx;
			width: 100rpx;
		}
	}
</style>
