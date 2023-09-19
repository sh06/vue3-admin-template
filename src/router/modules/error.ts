export default {
  path: '/error',
  redirect: '/error/403',
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('@/views/error/403.vue')
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/views/error/404.vue')
    },
    {
      path: '/error/500',
      name: '500',
      component: () => import('@/views/error/500.vue')
    }
  ]
}
