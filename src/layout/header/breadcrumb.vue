<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

let route = useRoute()
let key = ref(1)

const formatData = (list: any) => {
  // 对首页单独处理，因为首页是二级菜单 dashboard，会展示成 首页 / 首页
  if (list[0].path == '/' && list[1].path == '/dashboard') {
    list = [list[0]]
  }
  return list
}

let breadcrumbList = route.matched
breadcrumbList = formatData(breadcrumbList)

watch(
  () => route.fullPath,
  () => {
    breadcrumbList = route.matched
    breadcrumbList = formatData(breadcrumbList)
    ++key.value
  }
)
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight" v-show="breadcrumbList[0].name" :key="key">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :to="item.path"
      v-show="item.meta.title"
      :key="index"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
