<template>
	<view class="homePage">
		<view class="hp-nav">
			<view class="hp-nav-item" v-for="(item, index) in modulesList" :key="index">
				<view @click="goToModules(item)">
					<image class="hp-nav-itemImg" :src="item.iconPath" mode="widthFix"></image>
					<text class="hp-nav-text">{{item.text}}</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				modulesList: []
			}
		},
		onLoad() {
			this.getModuleList()
		},
		onShow() {},
		methods: {
			getModuleList() {
				let modulesJson = require('@/package.json');
				console.log("cityJson: ", modulesJson);
				this.modulesList = [];
				Object.keys(modulesJson.devDependencies).forEach(key => {
					if (new RegExp("^module_.*$").test(key)) {
						let getModuleConfig = require('@/pages/modules/platform_app/' + key + '/tabBar.json');
						getModuleConfig.iconPath = require('@/pages/modules/platform_app/' + key + '/static/logo.png');
						this.modulesList.push(getModuleConfig);
					}
				});
				console.log("moduleList", this.modulesList);
			},
			goToModules(pageInfo) {
				let pagePath = pageInfo.pagePath;
				console.log('test-------------', pagePath)
				uni.navigateTo({
					url: pagePath
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}

	.hp-img {
		width: 750rpx;
	}

	.hp-nav {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 30rpx;
	}

	.hp-nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.hp-nav-itemImg {
		width: 112rpx;
	}

	.hp-nav-text {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 33rpx;
		color: rgba(102, 102, 102, 1);
		opacity: 1;
		display: block;
		text-align: center;
	}
</style>
