<template>
	<scroll-view class="album-scroll-view" scroll-y="true" @scrolltolower="handleTolower">
		<!-- 轮播图 -->
		<view class="album-swiper">
			<swiper autoplay="true" indicator-dots="true" circular="true">
				<swiper-item v-for="item in bannerList" :key='item.id'>
					<image :src="item.thumb" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="album-list">
			<navigator class="album-item" 
						v-for="item in album" 
						:key='item.id'
						:url="`/pages/album/index?id=${item.id}`">
						<!-- `xxx?id=${item.id}`用了es6语法 -->
				<view class="album-img">
					<image mode="aspectFill" :src="item.cover"></image>
				</view>
				<view class="album-info">
					<view class="album-name">{{item.name}}</view>
					<view class="album-desc">{{item.desc}}</view>
					<view class="album-btn">
						<view class="album-attention">+关注</view>
					</view>
				</view>
			</navigator>
		</view>
		
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				// 接口请求参数
				params:{
					limit:	30,//number	获取多少条数据
					order:	'new',//string	关键字 “new”
					skip:	0,//number	跳过多少条
				},
				// 轮播图数组
				bannerList:[],
				// 列表数组
				album: [],
				// 是否还有分页数据
				hasMore: true
			}
		},
		mounted() {
			// 修改页面的标题
			uni.setNavigationBarTitle({
				title:'专辑'
			})
			this.getList()
		},
		methods: {
			// 获取接口数据
			getList(){
				this.$https({
					url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data: this.params
				})
				.then(res=>{
					if(this.bannerList.length===0){
						this.bannerList = res.res.banner
					}
					// 没有数据了
					if(res.res.album.length===0){
						this.hasMore=false
						return;
					}
					// 解构赋值
					this.album = [...this.album,...res.res.album]
				})
			},
			// 上拉加载执行分页
			handleTolower(){
				console.log('专辑上拉加载更多！！！')
				if(this.hasMore){
					this.params.skip+=this.params.limit
					this.getList()
				}else{
					uni.showToast({
						title: '没有数据了！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album-scroll-view{
		height: 100vh;
	}
	.album-swiper{
		swiper{
			height: calc(750rpx / 2.3);
		}
		image{
			height: 100%;
		}
	}
	.album-list{
		padding: 10rpx;
		.album-item{
			padding: 10rpx 0;
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.album-img{
				flex: 1;
				padding: 10rpx;
				image{
					height: 200rpx;
					width: 200rpx;
				}
			}
			.album-info{
				flex: 2;
				padding: 0 10rpx;
				overflow: hidden;
				.album-name{
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}
				.album-desc{
					padding: 10rpx 0;
					font-size: 26rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.album-btn{
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;
					.album-attention{
						color: $color;
						border: 1rpx solid $color;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
