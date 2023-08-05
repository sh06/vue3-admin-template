import http from '@/utils/http'
import type { loginForm, loginResponseData } from './type'

enum API {
  LOGIN_URL = '/login'
}

export const login = (data: loginForm) => {
  http.post<string, loginResponseData>(API.LOGIN_URL, data)
}
