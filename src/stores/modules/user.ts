import { defineStore } from 'pinia'
import { reqLogin } from '@/api/auth'
import type { loginData, loginResponseData } from '@/api/auth/type'
import { setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token'),
    user_id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username')
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
    userLogin(data: loginData) {
      return new Promise<loginResponseData>((resolve, reject) => {
        reqLogin(data)
          .then((rst) => {
            setToken(rst.data)
            resolve(rst)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
