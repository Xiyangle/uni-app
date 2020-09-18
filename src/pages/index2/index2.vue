<template>
	<view>
		<my-form>
			<view>
				<input type="text" v-model="phone"/>
				<radio></radio>
				<checkbox></checkbox>
			</view>
		</my-form>
	</view>
</template>

<script>
	import myForm from '../../components/my-form.vue'
	export default {
		data() {
			return {
				phone: "18523543215"
			}
		},
		components:{
			myForm
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
