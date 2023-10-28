import type { RouteConfig } from 'types/router'

export default {
  path: '/permission',
  name: 'permission',
  redirect: '/permission/menu',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '权限管理'
  },
  children: [
    {
      path: '/permission/menu',
      name: 'permissionMenu',
      component: () => import('@/views/permission/menu.vue'),
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: '/permission/role',
      name: 'permissionRole',
      component: () => import('@/views/permission/role.vue'),
      meta: {
        title: '角色管理'
      }
    }
  ]
} as RouteConfig
