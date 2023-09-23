import http from '@/utils/http'
import type { loginData, loginResponseData } from './type'

enum API {
  LOGIN_URL = '/login'
}

export const reqLogin = (data: loginData) => {
  return http.post<string, loginResponseData>(API.LOGIN_URL, data)
}
