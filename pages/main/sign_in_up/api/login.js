import api from '$common/api.js'

export function login(data, res) {
	api.request({
			method: 'post',
			url: '/login',
			data
		})
		.then(res)
};

export function getPlatForm(params, res) {
	api.request({
			method: 'get',
			url: '/yjwzyun/getPlatForm',
			params
		})
		.then(res)
};

export function cusAuthenticationJudge(data, res) {
	api.request({
			method: 'post',
			url: '/customerAuthenticationJudge/cusAuthenticationJudge',
			data
		})
		.then(res)
};

export function querySupplier(data, res) {
	api.request({
			method: 'post',
			url: '/supplierAuthentication/querySupplier',
			data
		})
		.then(res)
};

export function queryCustomer(data, res) {
	api.request({
			method: 'post',
			url: '/customerAuthentication/queryCustomer',
			data
		})
		.then(res)
};