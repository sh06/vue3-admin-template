<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/auth'
import type { FormInstance } from 'element-plus'

interface LoginForm {
  username: string
  password: string
}
const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const loginFormRef = ref()

const loginFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const doLogin = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if (valid) {
      login(loginForm)
    }
  })
}
</script>

<template>
  <div class="login">
    <el-row justify="center">
      <el-col :xs="12" :sm="6">
        <el-form class="login_form" :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
          <h1>Hello</h1>
          <h2>欢迎来到管理系统</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名、手机号"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin(loginFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-color: white;

  &_form {
    position: relative;
    top: 30vh;
    width: 80%;

    h1 {
      font-size: 40px;
    }

    h2 {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
}
</style>
