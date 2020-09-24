<template>
	<!-- 分页功能 -->
	<scroll-view class="recommend-view" @scrolltolower="handleTolower" scroll-y="true" v-if="recommends.length>0">
		<!-- 推荐 -->
		<view class="recommend-wrap">
			<navigator 
					:url="`/pages/album/index?id=${item.target}`"
					class="recommend-item" 
					v-for="item in recommends" 
					:key=item.id>
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 月份 -->
		<view class="moneths-wrap">
			<view class="moneths-title">
				<view class="moneths-title-info">
					<view class="moneths-info">
						<text>{{monthes.DD}}/</text>
						{{monthes.MM}} 月
					</view>
					<view class="moneths-text">
						{{monthes.title}}
					</view>
				</view>
				<view class="moneths-title-more">更多 > </view>
			</view>
			<view class="moneths-content">
				<view class="moneths-item" 
						v-for="(item,index) in monthes.items" 
						:key='item.id' >
						<!-- @click="toDesc(item.thumb)"> -->
					<!-- 这里用了组件数据传递 -->
					<go-detail :list="monthes.items" :index="index">
						<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 热门 -->
		<view class="hots-wrap">
			<view class="hots-title">
				<text>热门</text>
			</view>
			<view class="hots-content">
				<view class="hots-item" v-for="(item,index) in hots" 
						:key='item.id'>
					<go-detail :list="hots" :index="index">
						<image :src="item.thumb" mode="widthFix"></image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment' // 时间格式化库
	import goDetail from '../../components/goDetail.vue'
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				// 推荐列表
				recommends: [],
				// 月份
				monthes: {},
				// 热门数据
				hots: [],
				// 接口请求参数
				patams: {
					limit: 30,
					order: 'hot',
					skip: 0
				},
				hasMore: true
			}
		},
		mounted() {
			// 修改页面的标题
			uni.setNavigationBarTitle({
				title:'首页'
			})
			this.getList()
		},
		methods:{
			// 查看图片详情
			// toDesc(index){
			// 	let imgsArray = [];
			// 	imgsArray.push(index)
			// 	// 预览图片
			// 	uni.previewImage({
			// 		loop: true,
			// 		urls: imgsArray,
			// 		longPressActions: {
			// 			itemList: ['发送给朋友', '保存图片', '收藏'],
			// 			success: function(data) {
			// 				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			// 			},
			// 			fail: function(err) {
			// 				console.log(err.errMsg);
			// 			}
			// 		}
			// 	});
			// },
			// 获取接口数据
			getList(){
				this.$https({
					// url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
					url: this.baseurl+'/image/v3/homepage/vertical',
					data: this.patams
				})
				.then(res=>{
					console.log(res)
					// 判断还有没有下一页数据
					if(res.res.vertical.length===0){
						this.hasMore = false
						return;
					}
					// 第一次请求
					if(this.recommends.length===0){
						// 推荐
						this.recommends = res.res.homepage[1].items
						// 月份
						this.monthes = res.res.homepage[2]
						// 转换时间戳 moment.js
						this.monthes.MM=moment(this.monthes.stime).format('MM')
						this.monthes.DD=moment(this.monthes.stime).format('DD')
					}
					// 获取热门数据的列表
					// 数组拼接 es6
					this.hots = [...this.hots,...res.res.vertical]
				})
			},
			// 滚动条触底事件
			handleTolower(){
				console.log('滚动条触底事件')
				if(this.hasMore){
					this.patams.skip += this.patams.limit
					this.getList()
				}else{
					uni.showToast({
						title: '没有数据了',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 处理分页相关样式
	.recommend-view{
		// height：屏幕的高度 - 头部标题的高度
		// height: calc(100vh-36px);
		height: 100vh;
	}
	.recommend-wrap{
		display: flex;
		flex-wrap: wrap;
		.recommend-item{
			width: 50%;
			border: 3rpx solid #FFFFFF;
		}
	}
	.moneths-wrap{
		.moneths-title{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
		}
		.moneths-title-info{
			color: $uni-color-primary;
			font-size: 30rpx;
			display: flex;
			.moneths-info{
				text{
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			.moneths-text{
				font-size: 34rpx;
				font-weight: 600;
				color: #666;
				margin-left: 30rpx;
			}
		}
		.moneths-title-more{
			font-size: 24rpx;
			color: $uni-color-primary;
		}
		.moneths-content{
			display: flex;
			flex-wrap: wrap;
			.moneths-item{
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}
	}
	.hots-wrap{
		.hots-title{
			padding: 20rpx;
			text{
				border-left: 20rpx solid $color;
				font-weight: 600;
				font-size: 30rpx;
				padding-left: 20rpx;
			}
		}
		.hots-content{
			display: flex;
			flex-wrap: wrap;
			.hots-item{
				border: 5rpx solid #fff;
				width: 33.33%;
				image{
					
				}
			}
		}
	}
</style>
