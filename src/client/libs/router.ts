import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const linkActiveClass = 'router-active-link'

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/players',
      name: 'Players',
      component: () => import('../pages/Players/list.vue'),
    },
    {
      path: '/players/:id',
      name: 'PlayersEdit',
      component: () => import('../pages/Players/edit.vue'),
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('../pages/Teams/list.vue'),
    },
    {
      path: '/teams/:id',
      name: 'TeamsEdit',
      component: () => import('../pages/Teams/edit.vue'),
    },
    {
      path: '*',
      component: { render: (h) => h('div', ['404! Page Not Found!']) },
    },
  ],
  linkActiveClass,
})
