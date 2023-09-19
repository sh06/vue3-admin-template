import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import exceptRoute from './modules/except'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/except.ts'],
  {
    eager: true
  }
)

let routes: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

routes = routes.concat(...exceptRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
