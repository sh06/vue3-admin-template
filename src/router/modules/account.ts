import type { RouteConfig } from 'types/router'

export default {
  path: '/account',
  name: 'account',
  redirect: '/account/profile',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '个人账户'
  },
  children: [
    {
      path: '/account/profile',
      name: 'accountProfile',
      component: () => import('@/views/account/profile.vue'),
      meta: {
        title: '账户信息'
      }
    },
    {
      path: '/account/resetPassword',
      name: 'accountResetPassword',
      component: () => import('@/views/account/resetPassword.vue'),
      meta: {
        title: '重置密码'
      }
    }
  ]
} as RouteConfig
