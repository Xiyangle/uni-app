<template>
	<view>
		<!-- 用户信息 开始 -->
		<view class="user-info">
			<view class="user-icon" v-if="imgDetail.user">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user-desc">
				<view class="user-name" v-if="imgDetail.user">{{imgDetail.user.name}}</view>
				<view class="user-time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 用户信息 结束 -->
		<!-- 高清大图 开始 -->
		<view class="high-img">
			<image :src="imgDetail.newThumb" mode="widthFix"></image>
		</view>
		<!-- 高清大图 结束 -->
		<!-- 点赞 开始 -->
		<view class="user-rank">
			<view class="rank">
				<text class="iconfont icondianzan">{{imgDetail.rank}}</text>
			</view>
			<view class="user-collect">
				<text class="iconfont iconshoucang">收藏</text>
			</view>
		</view>
		<!-- 点赞 结束 -->
		<!-- 专辑 开始 -->
		<view class="album-wrap">
			<!-- 标题 -->
			<view class="album-title">相关</view>
			<!-- 内容 -->
			<view class="album-list">
				<view class="album-item"
						v-for="item in album"
						:key='item.id'>
					<view class="album-cover">
						<image :src="item.cover" mode="widthFix"></image>
					</view>
					<!-- 右边 -->
					<view class="album-info">
						<view class="album-info-text">
							专辑
						</view>
						<view class="album-name">
							{{item.name}}
						</view>
						<text class="iconfont iconiconfontjiantou4"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 专辑 结束 -->
		<!-- 最热评论comment hot -->
		<view class="comment hot">
			<view class="comment-title">
				<text class="iconfont iconhot1"></text>
				<text class="content-text">最热评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item"
						v-for="item in hot"
						:key='item.id'>
					<!-- 用户信息 -->
					<view class="comment-user">
						<view class="user-icon">
							<image :src="item.user.avatar" mode=""></image>
						</view>
						<view class="user-name">
							<view class="user-nickname">{{item.user.name}}</view>
							<view class="user-time">{{item.atime}}</view>
						</view>
						<!-- 用户徽章 -->
						<view class="user-badge">
							
						</view>
					</view>
					<!-- 评论数据 -->
					<view class="comment-desc">
						<image
						v-for="item2 in item.user.title"
						:key='item2.icon'
						:src="item2.icon"></image>
					</view>
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	import moment from 'moment'
	// 设置moment语言为中文
	moment.locale('zh-cn')
	
	export default {
		data() {
			return {
				// 图片信息对象 包含着用户头像
				imgDetail:{},
				// 专辑数据 数组
				album: [],
				// 最热评论
				hot: [],
				// 最新评论
				comment: []
			}
		},
		onLoad() {
			// console.log(getApp().globalData)
			// 解构赋值
			const {imgList,imgIndex}=getApp().globalData
			this.imgDetail=imgList[imgIndex]
			this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)
			// xxx年前的数据
			this.imgDetail.cnTime=moment(this.imgDetail.atime*1000).fromNow()
			// 获取图片详情的id
			// this.imgDetail.id
			this.getComments(this.imgDetail.id)
		},
		methods: {
			getComments(id){
				this.$https({
					url: this.baseurl+`/image/v2/wallpaper/wallpaper/${id}/comment`
				})
				.then(res=>{
					console.log('图片评论数据',res)
					this.album=res.res.album
					this.hot=res.res.hot
					this.comment=res.res.comment
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info{
		display: flex;
		align-items: center;
		padding: 20rpx;
		.user-icon{
			padding: 0 20rpx;
			image{
				width: 88rpx;
				border-radius: 50%;
			}
		}
		.user-desc{
			.user-name{
				color: #000;
				font-weight: bold;
			}
			.user-time{
				color: #ccc;
				font-size: 24rpx;
				padding: 10rpx 0;
			}
		}
	}
	.user-rank{
		display: flex;
		align-items: center;
		height: 80rpx;
		border-bottom: 5rpx solid #eee;
		.rank{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			.icondianzan{
				
			}
		}
		.user-collect{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconshoucang{
				
			}
		}
	}
	// 专辑
	.album-wrap{
		padding: 20rpx;
		.album-title{
			padding: 10rpx 0;
		}
		.album-list{
			.album-item{
				display: flex;
				padding: 10rpx 0;
				border-bottom: 10rpx solid #eee;
				.album-cover{
					flex: 1;
					image{
						width: 180rpx;
						height: 180rpx;
					}
				}
				.album-info{
					flex: 3;
					padding-left: 20rpx;
					position: relative;
					.album-info-text{
						width: 100rpx;
						height: 50rpx;
						background-color: $color;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.album-name{
						color: #888;
						padding: 10rpx 0;
					}
					.iconfont{
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						font-size: 40rpx;
						right: 10%;
						color: #000;
					}
				}
	
			}
		}
	}
	// 最热评论
	.comment{
		.comment-title{
			padding: 15rpx;
			.iconfont{
				color: #f40;
				font-size: 40rpx;
			}
			.content-text{
				font-weight: 600;
				font-size: 28rpx;
				color: #666;
				margin-left: 10rpx;
			}
		}
		.comment-list{
			
		}
	}
	
	
	
	
	
</style>
