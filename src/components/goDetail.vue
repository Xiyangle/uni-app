<template>
	<view>
		组件
		<!-- 插槽占位 -->
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			index:Number
		},
		mounted() {
			console.log(this.index)
			console.log(this.list)
		}
	}
</script>

<style>
</style>
