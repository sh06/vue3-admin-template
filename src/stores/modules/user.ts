import { defineStore } from 'pinia'
import { reqLogin } from '@/api/auth'
import type { loginData } from '@/api/auth/type'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token'),
    user_id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username')
  }),
  getters: {},
  actions: {
    async userLogin(data: loginData) {
      const result = await reqLogin(data)
      this.token = result.data.token
      this.user_id = result.data.user_id
      this.username = result.data.username
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user_id', result.data.user_id)
      localStorage.setItem('username', result.data.username)
      return result
    }
  }
})
