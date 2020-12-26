import urlConfig from '@/common/config.js'
import {formatGetUri} from '@/common/util.js'

const request = {}

request.globalRequest = (url, method, params, data, dataType) => {
	let loginTime = uni.getStorageSync('loginTime')
	if (loginTime) {
		var timeNow = new Date(); //结束时间
		var time = timeNow.getTime() - new Date(loginTime).getTime(); //时间差的毫秒数    
		var seconds = Math.round(time / 1000)
		console.log(seconds)
		if (seconds >= (20 * 60)) {
			console.log('登录超时了')
			uni.clearStorageSync()

			uni.showModal({
				title: '提示',
				content: '登录信息过期，是否重新登录?',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url: "/pages/login/login"
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		} else {
			uni.setStorageSync('loginTime', new Date())
		}
	}

	//请求头请在此配置
	let headers = {
		/* 'Content-Type': dataType?'application/x-www-form-urlencoded':'application/json', */
		'JSESSIONID': 'JSESSIONID=' + uni.getStorageSync('sessionId'),
		'cookie': 'JSESSIONID=' + uni.getStorageSync('sessionId'),
		'platform': 8//uni.getStorageSync('platform')
	}

	let requestConfig = method == 'post' || method == 'POST' ? {
		url: urlConfig + url,
		method,
		data,
		dataType: dataType || 'json',
		header: headers
	} : {
		url: urlConfig + url + formatGetUri(params),
		method,
		dataType: dataType || 'json',
		header: headers
	}

	return uni.request(requestConfig).then(res => {
		//console.log('res', res)
		if (res[1]) {
			if(res[1].data.code == 998){
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			return res[1].data
		} else {
			uni.showToast({
				title: '网络异常',
				icon: 'none'
			})
		}
	}).catch(params => {
		console.log('params', params)
		switch (params.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: params.message,
					icon: 'none'
				})
				return Promise.reject()
				break
		}
	})
}

export default request
