import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { errorRoute } from './modules/error'
import { loginRoute } from './modules/login'
import { dashboardRoute } from './modules/dashboard'

let routes: RouteRecordRaw[] = []
routes = routes.concat(...errorRoute)
routes = routes.concat(...loginRoute)
routes = routes.concat(...dashboardRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
