import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const linkActiveClass = 'router-active-link'

const needAdminPerm = {
  meta: {
    requiresAuth: true,
    needAdminPerm: true,
  },
}

const router = new Router({
  routes: [
    {
      path: '/',
      alias: '/players',
      name: 'Players',
      component: () => import('../pages/Players/list.vue'),
      ...needAdminPerm,
    },
    {
      path: '/players/:id',
      name: 'PlayersEdit',
      component: () => import('../pages/Players/edit.vue'),
      ...needAdminPerm,
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('../pages/Teams/list.vue'),
      ...needAdminPerm,
    },
    {
      path: '/teams/:id',
      name: 'TeamsEdit',
      component: () => import('../pages/Teams/edit.vue'),
      ...needAdminPerm,
    },
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: () => import('../pages/Tournaments/list.vue'),
      ...needAdminPerm,
    },
    {
      path: '/tournaments/:id',
      name: 'TournamentsEdit',
      component: () => import('../pages/Tournaments/edit.vue'),
      ...needAdminPerm,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../pages/Settings/edit.vue'),
      ...needAdminPerm,
    },
    {
      path: 'errors/:code',
      name: 'DynamicError',
      component: () => import('../pages/Errors/dynamic.vue'),
      props: route => route.params,
    },
  ],
  linkActiveClass,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const needAdminPerm = to.matched.some(record => record.meta.needAdminPerm)
  const authenticatedUser = router.app.$store.state.user

  if (requiresAuth && (!authenticatedUser || (needAdminPerm && !authenticatedUser?.isAdmin))) {
    next({
      name: 'DynamicError',
      path: 'errors/403',
      params: {
        title: '403',
        subTitle: '',
        text: 'У вас нет прав для просмотра этой страницы.',
      },
    })
  } else next()
})

router.afterEach((to) => {
  if (!to.matched.length) {
    router.push({
      name: 'DynamicError',
      path: 'errors/404',
      params: {
        title: '404',
        subTitle: to.fullPath,
        text: 'Страница не найдена',
      },
    })
  }
})

export default router
