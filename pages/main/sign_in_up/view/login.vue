<template>
	<view>
		<view class='loginBanner'>
			<view class='loginText'>您好，</view>
			<view class='loginTextSmall'>欢迎登录应急物资平台</view>
		</view>
		<view class='loginForm'>
			<form @submit="submitLogin" @reset="formReset">
				<view class="loginItem">
					<input class="loginInput" name="userName" placeholder="请输入用户名" />
				</view>
				<view class="loginItem">
					<input class="loginInput" name="pwd" placeholder="请输入密码" password />
				</view>
				<view class="loginTextItem">
					<view class='loginTextBottom'>忘记密码？</view>
					<view class='loginTextBottom' style="margin-left: 384rpx" @click="goRegister">首次注册</view>
				</view>

				<view style="padding-top: 96rpx;">
					<button class='loginButton' type='primary' form-type="submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		login,
		getPlatForm,
		cusAuthenticationJudge,
		querySupplier,
		queryCustomer
	} from '../api/login.js'
	export default {
		data() {
			return {
				lastPath: '',
			}
		},

		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.lastPath = option.path
		},

		methods: {
			submitLogin(e) {
				let data = {
					loginName: e.detail.value.userName,
					loginPwd: e.detail.value.pwd
				}

				if (!data.loginName || !data.loginPwd) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名密码'
					})
					return
				}

				let authentication = null

				login(data, res => {
					console.log(res)
					if (res.code === 0) {
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						})
						// 登录成功
						uni.setStorageSync('loginTime', new Date())
						console.log(uni.getStorageSync('loginTime'))
						const userInfo = res.data.loginUser
						uni.setStorageSync('loginId', res.data.loginId)
						uni.setStorageSync('sessionKey', res.data.sessionKey)
						uni.setStorageSync('sessionId', res.data.sessionId)
						uni.setStorageSync('userType', res.data.sessionKey)
						uni.setStorageSync('customerOrSupplier', res.data.customerOrSupplier)
						uni.setStorageSync('user', userInfo)
						uni.setStorageSync('registerType', res.data.loginUser.registerType)
						uni.setStorageSync("current1", "gys");
						const menuList = res.data.menuList
						const loginType = res.data.loginType
						if (loginType === 5 || loginType === '5') {
							uni.setStorageSync('loginType', Number(res.data.loginType))
						}
						if ((loginType === 3 || loginType === 5) && res.data.loginType === '3') {
							uni.setStorageSync('menuList', JSON.stringify(menuList))

							for (var i = 0; i < menuList.length; i++) {
								uni.setStorageSync(menuList[i].mePath, JSON.stringify(menuList[i].childrenList))
							}
						} else if (res.data.loginType === 1) {
							let tempArr = JSON.stringify(menuList)
							uni.setStorageSync('subMenuList', tempArr)
						}

						cusAuthenticationJudge({}, res => {
							uni.setStorageSync("newCusNum", res.data);
							uni.setStorageSync("authentication", res.data);
							authentication = res.data;

							querySupplier({}, res => {
								if (res.code == 0) {
									uni.setStorageSync("approvalStatus", data.approvalStatus);
								} else if (res.code == -1) {
									uni.setStorageSync("approvalStatus", -1);
								}
							})

							queryCustomer({}, res => {
								if (res.code == 0) {
									uni.setStorageSync("approvalStatusCus", res.data.approvalStatus);
									uni.setStorageSync("approvalStatusCusData", res.data);
								} else if (res.code == -1) {
									uni.setStorageSync("approvalStatusCus", -1);
								}
							})

							let ifClickExp = "";
							if (res.data.loginUser && res.data.loginUser.status == 3) {
								uni.setStorageSync("isBank", true);
							}
							if (loginType == 3) {
								ifClickExp = "F";
							} else if (res.data.customerOrSupplier > 0) {
								// 二三级供应商入口
								ifClickExp = "X";
							} else {
								// 一级模块商入口
								ifClickExp = "T";
							}
							uni.setStorageSync("ifClickExp", ifClickExp);
							const fromShoppingList = uni.getStorageSync("isFromShoppingList") == "true" ? 1 : 0;
							if (ifClickExp === "F") {
								//海尔用户
								let auth = [];
								let roles = res.data.roles
								if (Array.isArray(roles) && roles.length != 0) {
									auth = roles.filter((val) => {
										return val.roleId == 27;
									});
								}

								if (auth.length > 0) {
									uni.setStorageSync("auth", true);
								} else {
									uni.setStorageSync("auth", false);
								}
								if (res.data.loginUser.status == 3) {
									uni.setStorageSync("isBank", true);
								} else {
									uni.setStorageSync("isBank", false);
								}

								if (fromShoppingList == 0) {
									uni.setStorageSync("userType", Number(3));
								}
							} else {
								if (authentication == 'Y' || (authentication == 'N' && uni.getStorageSync("customerOrSupplier") == 0)) {
									uni.setStorageSync("current1", "cust");
									uni.setStorageSync("userType", Number(1));
								} else {
									uni.setStorageSync("current1,", "gys");
									uni.setStorageSync("userType", Number(2));
								}
							}
						})
						uni.removeStorageSync('isFromShoppingList');
						getPlatForm({}, res => {
							console.log(res)
							uni.setStorageSync('platform', res.data)
						})

						console.log(this.lastPath)
						if (this.lastPath) {
							if (this.lastPath == "home-page" || this.lastPath == "my-info" || this.lastPath == "item-list" || this.lastPath ==
								'orderManagement') {
								uni.switchTab({
									url: '../' + this.lastPath + '/index',
									success: function(e) {
										let page = getCurrentPages().pop()
										if (page == undefined || page == null) return
										page.onShow()
									}
								})
								return
							}
							uni.navigateBack({
							    delta: 1,
							    animationType: 'pop-out',
							    animationDuration: 200
							});
							if (this.lastPath.indexOf('%3D') > -1) {
								this.lastPath = this.lastPath.replace('%3D', '=')
							}
							if (this.lastPath.indexOf('%3F') > -1) {
								this.lastPath = this.lastPath.replace('%3F', '?')
							}
							uni.redirectTo({
								url: '../../' + this.lastPath
							})
							
						} else {
							 uni.switchTab({
							 	url: '../../a_index/index'
							 })
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			},
			formReset(e) {
				console.log('清空数据')
			},

			goRegister() {
				uni.redirectTo({
					url: "../register/register"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.loginBanner {
		text-align: left;
		padding: 48rpx 32rpx;

		.loginText {
			font-size: 60rpx;
			font-weight: bold;
		}

		.loginTextSmall {
			font-size: 34rpx;
			padding-top: 16rpx;
		}

	}

	.loginForm {
		padding: 0 48rpx;

		.loginItem {
			display: flex;
			height: 155rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
			;

			.loginInput {
				width: 100%;
				padding-top: 65rpx;
				height: 90rpx;
			}
		}

		.loginTextItem {
			display: flex;
			flex-direction: row;
			align-items: left;
			justify-content: center;

			.loginTextBottom {
				height: 42px;
				font-size: 30rpx;
				font-weight: 500;
				line-height: 42px;
				color: rgba(53, 53, 53, 1);
				opacity: 1;
			}
		}
	}

	.loginButton {
		width: 654rpx;
		height: 96rpx;
		background: rgba(63, 116, 255, 1);
		opacity: 1;
		border-radius: 100rpx;
	}
</style>
