import type { RouteConfig } from 'types/router'

export default {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/home/dashboard.vue'),
      meta: {
        title: '首页'
      }
    }
  ]
} as RouteConfig
