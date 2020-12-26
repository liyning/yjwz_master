import Vue from 'vue'
export default {
	namespaced:true,
	/* 属性值 */
	state: {
		
	},
	
	/* 
		计算属性 
		定义 doneTodos:(state, getters,rootState)=>{}
		使用 store.getters.doneTodosCount
	*/
	getters: {

	},
	/* 
		计算方法
		定义 increment :function(state,data){}
		使用 store.commit('increment', data) or  store.commit({type:'increment',...data})
	 */
	mutations: {
		
	},
	/* 
		导步计算方法
		定义 incrementAsync  :function ({ commit, state,dispatch,rootState  },data){commit('increment',data)}
		使用 store.dispatch('incrementAsync', data) or  store.commit({type:'incrementAsync',...data})
	 */
  actions: {
		
  }
}