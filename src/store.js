import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:2
  },
  mutations: {
    changeNum(state,payload){
      state.num=payload.num
    }
  },
  actions: {
    changeNumAsync(context,payload){
      setTimeout(()=>{
        context.commit('changeNum',payload)
      },1000)
    }
  }
})
