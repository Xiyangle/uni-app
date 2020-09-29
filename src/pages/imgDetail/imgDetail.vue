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
			<swiper-action @swiperAction="handleSwiperAction">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</swiper-action>
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
		<view class="album-wrap" v-if="album.length">
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
		<!-- 最热评论 hot -->
		<view class="comment hot" v-if="hot.length">
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
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user-name">
							<view class="user-nickname">{{item.user.name}}</view>
							<view class="user-time">{{item.cnTime}}</view>
						</view>
						<!-- 用户徽章 -->
						<view class="user-badge">
							<image
							v-for="item2 in item.user.title"
							:key='item2.icon'
							:src="item2.icon"></image>
						</view>
					</view>
					<!-- 评论数据 -->
					<view class="comment-desc">
						<view class="comment-content">{{item.content}}</view>
						<view class="comment-like">
							<text class="iconfont icondianzan">{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> 
		<!-- 最新评论comment -->
		<view class="comment hot" v-if="comment.length">
			<view class="comment-title">
				<text class="iconfont iconhot"></text>
				<text class="content-text">最新评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item"
						v-for="item in comment"
						:key='item.id'>
					<!-- 用户信息 -->
					<view class="comment-user">
						<view class="user-icon">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user-name">
							<view class="user-nickname">{{item.user.name}}</view>
							<view class="user-time">{{item.cnTime}}</view>
						</view>
						<!-- 用户徽章 -->
						<view class="user-badge">
							<image
							v-for="item2 in item.user.title"
							:key='item2.icon'
							:src="item2.icon"></image>
						</view>
					</view>
					<!-- 评论数据 -->
					<view class="comment-desc">
						<view class="comment-content">{{item.content}}</view>
						<view class="comment-like">
							<text class="iconfont icondianzan">{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> 
		<!-- 下载图片 开始 -->
		<view class="download">
			<view class="download-btn" @click='handleDownload'>下载图片</view>
		</view>
		<!-- 下载图片 结束 -->
	</view>
</template>

<script>
	import moment from 'moment'
	// 设置moment语言为中文
	moment.locale('zh-cn')
	import swiperAction from '../../components/swiperAction.vue'
	
	export default {
		components:{
			swiperAction
		},
		data() {
			return {
				// 图片信息对象 包含着用户头像
				imgDetail:{},
				// 专辑数据 数组
				album: [],
				// 最热评论
				hot: [],
				// 最新评论
				comment: [],
				// 图片的索引
				imgIndex: 0
			}
		},
		onLoad() {
			// console.log(getApp().globalData)
			// 解构赋值
			const {imgIndex}=getApp().globalData
			this.imgIndex = imgIndex
			this.getData()
		},
		methods: {
			// 给当前页面赋值
			getData(){
				const {imgList}=getApp().globalData
				this.imgDetail=imgList[this.imgIndex]
				//this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)
				// xxx年前的数据
				this.imgDetail.cnTime=moment(this.imgDetail.atime*1000).fromNow()
				// 获取图片详情的id
				// this.imgDetail.id
				this.getComments(this.imgDetail.id)
			},
			getComments(id){
				this.$https({
					url: this.baseurl+`/image/v2/wallpaper/wallpaper/${id}/comment`
				})
				.then(res=>{
					// console.log(res)
					this.album=res.res.album
					this.hot=res.res.hot
					
					
					// 给comment数组中的对象添加一个时间属性 XXX月前
					
					res.res.comment.forEach(v=>v.cnTime=moment(v.atime*1000).fromNow())
					
					this.comment=res.res.comment
				})
			},
			// 滑动事件
			handleSwiperAction(e){
				console.log(e)
				/*
				1、用户 左滑 imgIndex++
				2、用户 右滑 imgIndex--
				3、判断 数组是否越界问题
				4、左滑 e.direction === "left"&&this.imgIndex<imgList.length-1
				5、右滑 e.direction === "right"&&this.imgIndex>0
				*/
			   const {imgList}=getApp().globalData
			   if(e.direction === "left"&&this.imgIndex<imgList.length-1){
				   // 可以进行左滑 加载下一页
				   this.imgIndex++;
				   this.getData()
			   }else if(e.direction === "right"&&this.imgIndex>0){
				   // 右滑 加载上一页
				   this.imgIndex--;
				   this.getData()
			   }else{
				   uni.showToast({
				   	title:"没有数据了",
					icon:"none"
				   })
			   }
			},
			// 点击下载图片
			async handleDownload(){
				// uni.downloadFile()
				// uni.saveImageToPhotosAlbum({})
				await uni.showLoading({
					title: '下载中'
				})
				// 1、将远程文件下载到小程序的内存中
				const result1 = await uni.downloadFile({url:this.imgDetail.img})
				const {tempFilePath} = result1[1]
				// 2、将小程序内存中的临时文件下载到本地上
				const result2 = await uni.saveImageToPhotosAlbum({
					filePath:tempFilePath
				})
				console.log(result2)
				// 3、提示用户下载成功
				uni.hideLoading()
				await uni.showToast({
					title: '下载成功'
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
			.comment-item{
				border-bottom: 8rpx solid #EEEEEE;
				padding: 30rpx 20rpx;
				.comment-user{
					display: flex;
					.user-icon{
						image{
							width: 80rpx;
							margin-right: 20rpx;
						}
					}
					.user-name{
						.user-nickname{
							color: #2C3E50;
						}
						.user-time{
							color: #CCCCCC;
						}
					}
					.user-badge{
						
					}
				}
				.comment-desc{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.comment-content{
						margin-left: 15%;
						padding: 30rpx 0;
					}
				}
			}
		}
	}
	// 高清大图
	.high-img{
		image{
			border-bottom: 3rpx solid #f40;
		}
	}
	// 下载图片
	.download{
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.download-btn{
			width: 90%;
			height: 80%;
			background-color: $color;
			color: #fff;
			font-size: 50rpx;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	
	
	
	
</style>
