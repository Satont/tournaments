import Vue from 'vue'
import vuetify from './libs/vuetify'
import router from './libs/router'
import App from './App.vue'
import './css/main.css'
import store from './libs/vuex'

import axios from 'axios'

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  store,
  async created() {
    try {
      const { data } = await axios.get('/auth/me')
      this.$store.commit('setUser', data)
    } catch (e) {
      window.location.replace(`/auth/discord`)
    }
  },
}).$mount('#app')
