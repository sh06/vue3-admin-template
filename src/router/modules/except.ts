export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
    name: 'Any'
  }
]
