import type { RouteConfig } from 'types/router'

export default {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
} as RouteConfig
