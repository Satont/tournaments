import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    roles: [],
    settings: {},
    teams: [],
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
    'set.teams'(state, payLoad) {
      state.teams = payLoad
    },
  },
})
