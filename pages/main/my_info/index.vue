<template>
	<view class="">
		<button type="default" @click="gotoLogin">登录</button>
		<button type="default">注册</button>
		<button type="default" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoLogin(){
				uni.navigateTo({
					url: '/pages/main/sign_in_up/view/login'
				})
			},
			logout(){
				uni.clearStorageSync()
				uni.showToast({
					title: '已退出登录',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
</style>
