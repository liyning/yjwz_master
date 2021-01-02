import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app/index.js'
import module_lyn03 from '@/pages/modules/platform_app/module_lyn03/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		app
	}
})
