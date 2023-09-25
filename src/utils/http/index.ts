import axios from 'axios'
import { getToken, clearToken } from '../auth'
import router from '@/router'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: import.meta.env.VITE_HTTP_TIMEOUT
})

/** 请求拦截器 */
http.interceptors.request.use((config) => {
  const whiteList = ['/login']

  if (
    whiteList.find((url) => {
      return url === config.url
    })
  ) {
    return config
  } else {
    return new Promise((resolve) => {
      const token = getToken()

      if (token) {
        config.headers['token'] = token
      }
      resolve(config)
    })
  }
})

/** 响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.data.code == 1) {
      return response.data
    } else {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      })
    }
  },
  (error) => {
    const httpCode = error.response.status

    if (httpCode == 401) {
      clearToken()
      error.message = '请重新登录'
      router.push('/login')
    } else {
      error.message = '请求错误，请稍后再试。'
    }
    ElMessage({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default http
