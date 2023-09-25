import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import exceptRoute from './modules/except'

const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/except.ts'],
  {
    eager: true
  }
)

let routes: any[] = []

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

routes = routes.concat(...exceptRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// 路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = useUserStore().token
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
})

export default router
