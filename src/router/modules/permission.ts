import type { RouteConfig } from 'types/router'

export default {
  path: '/',
  name: 'permission',
  redirect: '/permission/backend',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/permissions/menu',
      name: 'permissionMenu',
      component: () => import('@/views/permission/menu.vue')
    },
    {
      path: '/permissions/role',
      name: 'permissionRole',
      component: () => import('@/views/permission/role.vue')
    }
  ]
} as RouteConfig
