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
      component: () => import('@/views/home/dashboard.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/home/profile.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('@/views/home/resetPassword.vue')
    }
  ]
} as RouteConfig
