import http from '@/utils/http'
import type { loginForm, loginResponseData } from './type'

enum API {
  LOGIN_URL = '/login'
}

export const login = (data: loginForm) => {
  http.post<string, loginResponseData>(API.LOGIN_URL, data, {
    baseURL: 'http://127.0.0.1:4523/m1/1186598-0-default/api'
  })
}
