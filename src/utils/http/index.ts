import axios from 'axios'
import router from '@/router'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: import.meta.env.VITE_HTTP_TIMEOUT
})

/** 请求拦截器 */
http.interceptors.request.use((config) => {
  return config
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

    if (httpCode == 403) {
      error.message = '拒绝访问'
      router.push('/error/403')
    } else if (httpCode == 404) {
      error.message = '请求不存在'
      router.push('/error/404')
    } else if (httpCode == 500) {
      error.message = '请求不存在'
      router.push('/error/404')
    } else {
      error.message = '请求错误，请稍后再试。'
      ElMessage({
        showClose: true,
        message: error.message,
        type: 'error'
      })
    }

    return Promise.reject(error)
  }
)

export default http
