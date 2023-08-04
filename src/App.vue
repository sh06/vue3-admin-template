<script setup lang="ts">
import http from '@/utils/http/index'

onMounted(() => {
  http.request({
    url: 'http://127.0.0.1:4523/m1/1186598-0-default/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456'
    }
  })
})
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>

  <RouterView />
</template>
