<template>
	<view>
		<view class="category-tab">
			<view class="category-tab-title">
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
			<view class="category-tab-content">
				777
			</view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	export default {
		components:{
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: '最新'},
					{title: '热门'}
				],
				current: 1
			};
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

</style>
