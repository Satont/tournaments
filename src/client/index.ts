import Vue from 'vue'
import vuetify from './libs/vuetify'
import store from './libs/vuex'
import router from './libs/router'
import App from './App.vue'
import './css/main.css'

import axios from 'axios'

const bootstrap = async () => {
  try {
    const { data: user } = await axios.get('/auth/me')
    store.commit('set.user', user)
  } catch {
    window.location.replace(`/auth/discord`)
  }

  store.dispatch('loadTeams')
  store.dispatch('loadRoles')
  store.dispatch('loadSettings')

  new Vue({
    vuetify,
    render: (h) => h(App),
    store,
    router,
  }).$mount('#app')
}

bootstrap()
