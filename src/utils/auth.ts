import { useUserStore } from '@/stores/modules/user'
import type { dataType } from '@/api/auth/type'

export function setToken(data: dataType) {
  useUserStore().SET_TOKEN(data.token)
  useUserStore().SET_USER_ID(data.user_id)
  useUserStore().SET_USERNAME(data.username)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user_id', data.user_id)
  localStorage.setItem('username', data.username)
}
