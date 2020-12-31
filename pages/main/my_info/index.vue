<template>
	<view class="">
		<button type="default" @click="gotoLogin">登录</button>
		<button type="default" @click="goEnterprise">跳转至入驻企业模块首页</button>
		<button type="default" @click="goDetails">跳转至企业详情</button>
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
			goDetails(){
				this.$Router.push({
				    name:'enterprise_detail',
				    params:{
				        detailId:'0831016'
				    }
				})
			},
			goEnterprise(){
				this.$Router.push({
				    name:'enterprise_index'
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
