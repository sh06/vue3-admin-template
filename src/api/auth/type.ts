// 登陆表单
export interface loginForm {
  username: string
  password: string
}

// 登陆返回数据格式
interface dataType {
  token: string
  username: string
  user_id: string
}

// 登陆返回数据
export interface loginResponseData {
  code: number
  data: dataType
}
