<script setup lang="ts">
defineProps(['menuList'])
</script>

<template>
  <template v-for="item in menuList" :key="item.route">
    <el-menu-item v-if="!item.children" :index="item.route">{{ item.name }}</el-menu-item>
    <el-sub-menu v-if="item.children" :index="item.route">
      <template #title>
        <el-icon><icon-svg :name="item.icon"></icon-svg></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item-group>
        <menu-item :menuList="item.children"></menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </template>
</template>

<style lang="scss">
.el-menu-item-group__title {
  padding: 0;
}
</style>
