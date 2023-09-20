import type { RouteConfig } from 'types/router'

export default {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
} as RouteConfig
