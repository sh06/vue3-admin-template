<script setup lang="ts">
defineProps(['routerViewKey'])
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div class="app_main" :key="route.path">
        <component :is="Component" v-if="routerViewKey" />
      </div>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.app_main {
  padding: 20px;
}
</style>
