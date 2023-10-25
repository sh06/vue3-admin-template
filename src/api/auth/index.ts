import http from '@/utils/http'
import type { loginData, loginResponseData, logoutResponseData } from './type'

enum API {
  LOGIN_URL = '/login',
  LOGOUT_URL = '/logout'
}

export const reqLogin = (data: loginData) => {
  return http.post<string, loginResponseData>(API.LOGIN_URL, data)
}

export const reqLogout = () => {
  return http.post<string, logoutResponseData>(API.LOGOUT_URL)
}
