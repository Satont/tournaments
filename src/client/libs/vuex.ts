import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    roles: [],
    settings: {},
    teams: {
      list: [],
      loaded: false,
    },
    tournaments: {
      list: [],
      loaded: false,
    },
    channels: {
      list: [],
      loaded: false,
    },
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
      state.teams.loaded = true
      state.teams.list = payLoad
    },
    'set.tournaments'(state, payLoad) {
      state.tournaments.loaded = true
      state.tournaments.list = payLoad
    },
    'set.channels'(state, payLoad) {
      state.channels.loaded = true
      state.channels.list = payLoad
    },
  },
  actions: {
    async loadTeams({ commit }) {
      const { data: { teams } } = await axios.get('/api/teams').catch(() => ({ data: { teams: [] } }))
      commit('set.teams', teams)
    },
    async loadRoles({ commit }) {
      const { data } = await axios.get('/api/roles')
      commit('set.roles', data)
    },
    async loadSettings({ commit }) {
      const { data } = await axios.get('/api/settings')
      commit('set.settings', data)
    },
    async loadTournaments({ commit }) {
      const { data } = await axios.get('/api/tournaments')
      commit('set.tournaments', data.list)
    },
    async loadChannels({ commit }) {
      const { data } = await axios.get('/api/channels')
      commit('set.channels', data)
    },
  },
})
