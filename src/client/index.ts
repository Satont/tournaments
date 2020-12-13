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
    await this.checkAuthorization()
    await this.loadData()
  },
  methods: {
    async checkAuthorization() {
      try {
        const { data } = await axios.get('/auth/me')
        this.$store.commit('setUser', data)
      } catch (e) {
        window.location.replace(`/auth/discord`)
      }
    },
    async loadData() {
      const [roles] = await Promise.all([
        axios.get('/api/roles'),
      ])

      this.$store.commit('setRoles', roles.data)
    },
  },
}).$mount('#app')
