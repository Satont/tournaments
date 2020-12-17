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

  const [roles, settings] = await Promise.all([
    axios.get('/api/roles'),
    axios.get('/api/settings'),
  ])
  store.commit('set.roles', roles.data)
  store.commit('set.settings', settings.data)

  new Vue({
    vuetify,
    render: (h) => h(App),
    store,
    router,
  }).$mount('#app')
}

bootstrap()
