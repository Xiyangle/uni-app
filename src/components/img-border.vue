<template>
	<image @click="handleClick" class="img-border" :src="src" ></image>
</template>

<script>
	export default{
		props:{
			src:String
		},
		methods:{
			handleClick(){
				// console.log("组件传值")
				// 子组件向父组件传递数据 通过触发事件
				// this.$emit('自定义的事件名称','要传递的参数')
				this.$emit('srcChange',this.src)
			}
		}
	}
</script>

<style>
	.img-border{
		border-radius: 20rpx;
	}
</style>
