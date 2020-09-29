<template>
	<view>
		<view class="home-tab">
			<view class="home-tab-title">
				<view class="title-inner">
					<!-- 分段器 -->
					<uni-segmented-control 
						:current="current" 
						:values="items.map(v=>v.title)" 
						@clickItem="onClickItem" 
						style-type="text" 
						active-color="#007aff">
					</uni-segmented-control>
				</view>
				<!-- 搜索 -->
				<view class="iconfont iconsearch"></view>
			</view>
			<!-- 内容 -->
			<view class="home-tab-content">
				<view v-if="current === 0">
					<album></album>
				</view>
				<view v-if="current === 1">
					<category></category>
				</view>
				<view v-if="current === 2">
					<homeNew></homeNew>
				</view>
				<view v-if="current === 3">
					<recommend></recommend>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import album from './album.vue'
	import category from './category.vue'
	import homeNew from './new.vue'
	import recommend from './recommend.vue'
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	
	export default {
		data() {
			return {
				items: [
					{title: '推荐'},
					{title: '分类'},
					{title: '最新'},
					{title: '专辑'}
				],
				current: 1
			}
		},
		components:{
			album,
			category,
			homeNew,
			recommend,
			uniSegmentedControl
		},
		onLoad() {
			
		},
		methods:{
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss">
	.home-tab{
		.home-tab-title{
			display: flex;
			align-items: center;
			.title-inner{
				width: 60%;
				margin: 0 auto;
			}
			.iconsearch{
				margin-right: 20rpx;
			}
		}
		.home-tab-content{
			
		}
	}
</style>
