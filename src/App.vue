<script setup lang="ts">
import { login } from '@/api/auth'

onMounted(() => {
  login({ username: 'admin', password: '123456' })
})
</script>

<template>
  <ul>
    <li><RouterLink to="/">dashboard</RouterLink></li>
    <li><RouterLink to="/login">login</RouterLink></li>
    <li><RouterLink to="/error/403">403</RouterLink></li>
    <li><RouterLink to="/error/404">404</RouterLink></li>
    <li><RouterLink to="/error/500">500</RouterLink></li>
  </ul>

  <RouterView />
</template>
