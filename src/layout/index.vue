<script setup lang="ts">
import setting from '@/setting'
import menuItem from '@/layout/sidebar/menuItem.vue'
import topbar from '@/layout/header/topbar.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

let loading = ref(false)
let userStore = useUserStore()
const userName = userStore.username
const menu = userStore.menu
const logo = setting.logo
const sidebarIsCollapse = ref(false)
const currentInstance = getCurrentInstance()
// 设置侧边菜单的 key，当 key 值发生变化的时候组件刷新
let menuKey = ref(1)
let menuRef = ref(null)

// 计算侧边栏菜单打开的菜单
const activeMenu = computed(() => {
  let active = ref('')
  let menuMatche = useRoute().matched
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
            <div v-show="!sidebarIsCollapse" class="layout_sidebar_menu_logo">
              <icon-svg :name="logo.name" :width="logo.width" :height="logo.height"></icon-svg>
            </div>
            <div v-show="sidebarIsCollapse" class="layout_sidebar_menu_logo_mini">
              <icon-svg
                :name="logo.mini_name"
                :width="logo.mini_width"
                :height="logo.mini_height"
              ></icon-svg>
            </div>
            <menuItem :menuList="menu"></menuItem>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="layout_content">
        <el-header class="layout_content_header">
          <topbar
            v-model:collapse="sidebarIsCollapse"
            v-model:menu-key="menuKey"
            v-model:loading="loading"
            :user-name="userName"
            :user-store="userStore"
          ></topbar>
        </el-header>
        <el-main class="layout_content_main">
          <el-scrollbar class="layout_content_main_scroll">
            <router-view />
            <div class="layout_content_main_bottom"></div>
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
    //width: $layout-sidebar-width;
    background: $layout-sidebar-background;

    // 侧边栏显示
    &_menu {
      height: 100vh;

      &_logo {
        width: $layout-sidebar-width;
        height: $layout-sidebar-logo-width;
      }
    }
  }

  &_content {
    &_header {
      z-index: 1999;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    }

    &_main {
      height: calc(100vh - $layout-header-height);
      padding: 0;
      background: $layout-main-background;

      &_scroll {
        padding: 20px 20px 0;
      }

      &_bottom {
        width: auto;
        height: 20px;
      }
    }
  }
}
</style>
