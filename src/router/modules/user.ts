import type { RouteConfig } from 'types/router'

export default {
  path: '/',
  name: 'user',
  redirect: '/user/backend',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/user/backend',
      name: 'userBackend',
      component: () => import('@/views/user/backend.vue')
    },
    {
      path: '/user/customer',
      name: 'userCustomer',
      component: () => import('@/views/user/customer.vue')
    }
  ]
} as RouteConfig
