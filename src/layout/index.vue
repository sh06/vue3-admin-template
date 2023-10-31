<script setup lang="ts">
import setting from '@/setting'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import menuItem from '@/layout/component/sidebar/menuItem.vue'
import topbar from '@/layout/component/header/topbar.vue'
import logo from '@/layout/component/sidebar/logo.vue'
import appMain from '@/layout/component/appMain.vue'

const loading = ref(false)
const userStore = useUserStore()
const userName = userStore.username
const menu = userStore.menu
const logoSetting = setting.logo
const sidebarIsCollapse = ref(false)
const currentInstance = getCurrentInstance()
const menuRef = ref(null)
// 设置侧边菜单的 key，当 key 值发生变化的时候组件刷新
const menuKey = ref(1)
// 用来刷新router-view组件
const routerViewKey = ref(true)

// 计算侧边栏菜单打开的菜单
const activeMenu = computed(() => {
  const active = ref('')
  const menuMatche = useRoute().matched

  for (const item of menuMatche) {
    if (item.meta.isMenu == true) {
      active.value = item.path
    }
  }

  return active.value
})

// 监听 menuKey 的变化来关闭所有的菜单
watch(menuKey, () => {
  for (const item of menu) {
    if (item.children) {
      currentInstance?.refs?.menuRef?.close(item.route)
    }
  }
})

// 监听值变化，如果变成 false 销毁组件，然后在赋值 true 创建组件，实现刷新
watch(routerViewKey, () => {
  nextTick(() => {
    routerViewKey.value = true
  })
})
</script>

<template>
  <div class="layout" v-loading="loading">
    <el-container>
      <el-aside class="layout_sidebar">
        <el-scrollbar>
          <el-menu
            ref="menuRef"
            :collapse-transition="true"
            :default-active="activeMenu"
            :collapse="sidebarIsCollapse"
            class="layout_sidebar_menu"
            router
          >
            <logo :sidebar-is-collapse="sidebarIsCollapse" :logo-setting="logoSetting"></logo>
            <menuItem :menuList="menu"></menuItem>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="layout_content">
        <el-header class="layout_content_header">
          <topbar
            v-model:router-view-key="routerViewKey"
            v-model:collapse="sidebarIsCollapse"
            v-model:menu-key="menuKey"
            v-model:loading="loading"
            :user-name="userName"
            :user-store="userStore"
          ></topbar>
        </el-header>
        <el-main class="layout_content_main">
          <el-scrollbar class="layout_content_main_scroll">
            <appMain :router-view-key="routerViewKey"></appMain>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.layout {
  position: fixed;
  width: 100%;
  height: 100vh;

  &_sidebar {
    width: auto;
    background: $layout-sidebar-background;

    // 侧边栏显示
    &_menu {
      height: 100vh;
    }
  }

  &_content {
    &_header {
      z-index: 1999;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      height: $layout-header-height;
      padding: 0;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    }

    &_main {
      height: calc(100vh - $layout-header-height);
      padding: 0;
      background: $layout-main-background;
    }
  }
}
</style>
