import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import {router,RouterMount} from './router.js' 
Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
