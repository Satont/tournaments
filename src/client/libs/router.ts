import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const linkActiveClass = 'router-active-link'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Players',
      component: () => import('../pages/Players.vue'),
    },
  ],
  linkActiveClass,
})
