import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    roles: [],
    settings: {},
  },
  mutations: {
    'set.user'(state, payLoad) {
      state.user = payLoad
    },
    'set.roles'(state, payLoad) {
      state.roles = payLoad
    },
    'set.settings'(state, payLoad) {
      state.settings = payLoad
    },
  },
})
