<script setup lang="ts">
import { login } from '@/api/auth'

onMounted(() => {
  login({ username: 'admin', password: '123456' })
})
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>

  <RouterView />
</template>
