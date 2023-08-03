<template>
  <svg :style="{ width, height }">
    <use :href="prefix + '-' + name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon'
  },
  name: {
    type: String,
    request: true
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '20px'
  },
  height: {
    type: String,
    default: '20px'
  }
})
</script>
