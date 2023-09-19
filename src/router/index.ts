import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { errorRoute } from './modules/error'
import { exceptRoute } from './modules/except'
import { homeRoute } from './modules/home'

let routes: RouteRecordRaw[] = []
routes = routes.concat(errorRoute)
routes = routes.concat(...exceptRoute)
routes = routes.concat(homeRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
