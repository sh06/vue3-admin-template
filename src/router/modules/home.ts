export const homeRoute = {
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
}
