<template>
	<view class="home-category">
		<navigator class="cate-item"
			v-for="item in category"
			:key="item.id"
			:url="`/pages/imgcategory/imgcategory?id={$item.id}`">
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="cate-name">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: []
			}
		},
		mounted() {
			// 修改页面的标题
			uni.setNavigationBarTitle({
				title:'分类'
			})
			this.getList()
		},
		methods: {
			getList(){
				this.$https({
					url: this.baseurl+'/image/v1/vertical/category'
				})
				.then(res=>{
					console.log(res)
					this.category=res.res.category
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-category{
		display: flex;
		flex-wrap: wrap;
		.cate-item{
			width: 33.33%;
			position: relative;
			image{
				height: 240rpx;
			}
			.cate-name{
				position: absolute;
				width: 100%;
				height: 40rpx;
				left: 0;
				bottom: 0;
				color: #fff;
				// css3 渐变
				background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
			}
		}
	}
</style>
