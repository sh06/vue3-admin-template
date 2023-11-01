import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import exceptRoute from './modules/except'
import { nprogressStart, nprogressDone } from '@/plugins/nprogress'

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
  nprogressStart()

  // 鉴权后是否继续执行，默认是
  const pass = ref(true)
  const permissionList = useUserStore().permission
  const toPermissionID = to.meta.permission_id

  // 只有有 permission_id，也就是需要鉴权的才会验证
  if (toPermissionID) {
    // 是否验证通过，默认不通过
    const hasPermission = ref(false)

    // 循环所有权限，如果有要访问的路由的权限，则验证通过
    for (const permission of permissionList) {
      if (permission == toPermissionID) {
        hasPermission.value = true
      }
    }

    // 如果没有通过，则提示没有权限，并停止跳转路由
    if (!hasPermission.value) {
      pass.value = false
      ElMessage.error('您没有权限')
      // 因为修改地址栏跳转，会没有 from 所以单独做处理
      if (from.name) {
        next(false)
      } else {
        next('/')
      }
    }
  }

  // 鉴权成功，或者没有鉴权，继续执行，验证其他的
  if (pass.value) {
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
  }
})

router.afterEach(() => {
  nprogressDone()
})

export default router
