import type { RouteConfig } from 'types/router'

export default {
  path: '/permission',
  name: 'permission',
  redirect: '/permission/menu/index',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '权限管理',
    permission_id: 'PERMISSION'
  },
  children: [
    {
      path: 'menu',
      name: 'permissionMenu',
      redirect: '/permission/menu/index',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        title: '菜单管理',
        isMenu: true,
        permission_id: 'PERMISSION_NODE'
      },
      children: [
        {
          path: 'index',
          name: 'permissionRoleList',
          component: () => import('@/views/permission/menu/index.vue'),
          meta: {
            title: '菜单列表',
            permission_id: 'PERMISSION_NODE_LIST'
          }
        },
        {
          path: 'add',
          name: 'permissionRoleAdd',
          component: () => import('@/views/permission/menu/add.vue'),
          meta: {
            title: '添加菜单',
            permission_id: 'PERMISSION_NODE_ADD'
          }
        }
      ]
    },
    {
      path: 'role',
      name: 'permissionRole',
      component: () => import('@/views/permission/index.vue'),
      redirect: '/permission/role/index',
      meta: {
        title: '角色管理',
        isMenu: true,
        permission_id: 'PERMISSION_ROLE'
      },
      children: [
        {
          path: 'index',
          name: 'permissionRoleIndex',
          component: () => import('@/views/permission/role/index.vue'),
          meta: {
            title: '角色列表',
            permission_id: 'PERMISSION_ROLE_LIST'
          }
        }
      ]
    }
  ]
} as RouteConfig
