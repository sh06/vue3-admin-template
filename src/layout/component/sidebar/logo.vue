<script setup lang="ts">
defineProps(['sidebarIsCollapse', 'logoSetting'])
</script>

<template>
  <div v-show="!sidebarIsCollapse" class="layout_sidebar_menu_logo">
    <icon-svg
      :name="logoSetting.name"
      :width="logoSetting.width"
      :height="logoSetting.height"
    ></icon-svg>
  </div>
  <div v-show="sidebarIsCollapse">
    <icon-svg
      :name="logoSetting.mini_name"
      :width="logoSetting.mini_width"
      :height="logoSetting.mini_height"
    ></icon-svg>
  </div>
</template>

<style lang="scss" scoped>
.layout_sidebar_menu_logo {
  width: $layout-sidebar-width;
  height: $layout-sidebar-logo-width;
}
</style>
