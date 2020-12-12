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
      path: '/tournaments',
      name: 'Tournaments',
      component: () => import('../pages/Tournaments/list.vue'),
    },
    {
      path: '/tournaments/:id',
      name: 'TournamentsEdit',
      component: () => import('../pages/Tournaments/edit.vue'),
    },
    {
      path: '*',
      component: { render: (h) => h('div', ['Страница не найдена']) },
    },
  ],
  linkActiveClass,
})
