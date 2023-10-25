import Cookies from 'js-cookie'
import { useUserStore } from '@/stores/modules/user'
import type { loginResponseDataType } from '@/api/auth/type'

const cookieKey = '_auth'

// 设置 Pinia 中的数据，并持久化到 cookie
export function setAuthToken(data: loginResponseDataType) {
  useUserStore().SET_TOKEN(data.token)
  useUserStore().SET_EXPIRE(data.expire)
  useUserStore().SET_USER_ID(data.user_id)
  useUserStore().SET_USERNAME(data.username)
  useUserStore().SET_MENU(data.menu)
  useUserStore().SET_PERMISSION(data.permission)

  Cookies.set(cookieKey, JSON.stringify(data), {
    expires: (data.expire - Date.now()) / 86400000
  })
}

// 获取 cookie 中指定的 key 的数据
export function getAuthItem(key: string) {
  let value = null
  if (Cookies.get(cookieKey)) {
    const v = JSON.parse(Cookies.get(cookieKey) as string)
    if (v[key]) {
      value = v[key]
    }
  }

  return value
}

// 获取 token
export function getAuthToken() {
  return useUserStore().token
}

// 清空 cookie 和 Pinia
export function clearAuthToken() {
  useUserStore().SET_TOKEN('')
  useUserStore().SET_EXPIRE(0)
  useUserStore().SET_USER_ID('')
  useUserStore().SET_USERNAME('')
  useUserStore().SET_MENU([])
  useUserStore().SET_PERMISSION([])

  Cookies.remove(cookieKey)
}
