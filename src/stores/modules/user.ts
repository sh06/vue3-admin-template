import { defineStore } from 'pinia'
import { reqLogin, reqLogout } from '@/api/auth'
import type { loginData, loginResponseData, logoutResponseData } from '@/api/auth/type'
import { setAuthToken, getAuthItem } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getAuthItem('token'),
    expire: getAuthItem('expire'),
    user_id: getAuthItem('user_id'),
    username: getAuthItem('username'),
    menu: getAuthItem('menu'),
    permission: getAuthItem('permission')
  }),
  getters: {},
  actions: {
    SET_USERNAME(username: string) {
      this.username = username
    },
    SET_USER_ID(userId: string) {
      this.user_id = userId
    },
    SET_TOKEN(token: string) {
      this.token = token
    },
    SET_EXPIRE(expire: number) {
      this.expire = expire
    },
    SET_MENU(menu: Array<object>) {
      this.menu = menu
    },
    SET_PERMISSION(permission: Array<string>) {
      this.permission = permission
    },
    userLogin(data: loginData) {
      return new Promise<loginResponseData>((resolve, reject) => {
        reqLogin(data)
          .then((rst) => {
            setAuthToken(rst.data)
            resolve(rst)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    userLogout() {
      return new Promise<logoutResponseData>((resolve, reject) => {
        reqLogout()
          .then((rst) => {
            resolve(rst)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
