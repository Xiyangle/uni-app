<template>
	<view>
		<!-- 专辑背景开始 -->
		<view class="alum-bg">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="album-info">
				<view class="album-name">
					{{album.name}}
				</view>
				<view class="album-btn">
					关注专辑
				</view>
			</view>
		</view>
		<!-- 专辑背景结束 -->
		<!-- 专辑作者 开始 -->
		<view class="album-author">
			<view class="album-author-info">
				<image :src="album.user.avatar" mode="widthFix"></image>
				<view class="album-author-name">{{album.user.name}}</view>
			</view>
			<view class="album-author-desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
		<!-- 专辑作者 结束 -->
		<!-- 列表 开始 -->
		<view class="album-list">
			<view class="album-item" v-for="item in wallpaper" :key="item.id">
				<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="widthFix"></image>
			</view>
		</view>
		<!-- 列表 结束 -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				params:{
					limit: 30,	//number	获取多少条数据
					order: 'new',	//string	关键字 “new”
					skip: 0,	//number	跳过多少条
					first: 1	//number	“1” 表示第一次请求 “0”表示不是第一次请求
				},
				id: -1,
				album:{},
				wallpaper:[],
				hasMore: true
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id
			this.getList()
		},
		// 页面触底 上拉加载下一页
		onReachBottom() {
			// console.log('我也是有底线的')
			if(this.hasMore){
				this.params.first = 0
				this.params.skip+=this.params.limit
				this.getList()
			}else{
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none'
				})
			}
		},
		methods:{
			getList(){
				this.$https({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				})
				.then(res=>{
					console.log(res)
					if(Object.keys(this.album).length===0){
						this.album=res.res.album
					}
					if(res.res.wallpaper.length===0){
						this.hasMore=false
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
						return;
					}
					// 解构赋值
					this.wallpaper=[...this.wallpaper,...res.res.wallpaper]
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.alum-bg{
		position: relative;
		image{
			
		}
		.album-info{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			color: #fff;
			padding: 0 15rpx;
			.album-name{
				font-size: 40rpx;
			}
			.album-btn{
				background-color: $color;
				width: 152rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
		}
	}
	.album-author{
		padding: 10rpx;
		.album-author-info{
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			image{
				width: 50rpx;
			}
			.album-author-name{
				color: #000;
				margin-left: 15rpx;
			}
		}
		.album-author-desc{
			
		}
	}
	.album-list{
		display: flex;
		flex-wrap: wrap;
		.album-item{
			width: 33.33%;
			border: 3px solid #fff;
			image{
				
			}
		}
	}
</style>
