import type { RouteConfig } from 'types/router'

export default {
  path: '/user',
  name: 'user',
  redirect: '/user/backend',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '用户管理'
  },
  children: [
    {
      path: '/user/backend',
      name: 'userBackend',
      component: () => import('@/views/user/backend.vue'),
      meta: {
        title: '后台用户管理',
        isMenu: true
      }
    },
    {
      path: '/user/customer',
      name: 'userCustomer',
      component: () => import('@/views/user/customer.vue'),
      meta: {
        title: '客户端用户管理',
        isMenu: true
      }
    }
  ]
} as RouteConfig
