import { createStore } from 'vuex'

export default createStore({
  state: {
    user: ''
  },
  getters: {
  },
  mutations: {
    saveUser(state, newData){
      state.user = newData;
    }
  },
  actions: {
  },
  modules: {
  }
})
