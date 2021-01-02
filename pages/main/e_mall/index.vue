<template>
	<view class="">
		store data:{{user}}
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState('app',{
				user: state => state.user
			})
		},
		onLoad() {
		},
		onShow() {},
		methods: {
			}
	}
</script>

<style>
</style>
