<script setup lang="ts">
import setting from '@/setting'
import router from '@/router'
import menuItem from '@/layout/sidebar/menuItem.vue'
import { useUserStore } from '@/stores/modules/user'
import { clearAuthToken } from '@/utils/auth'

let loading = ref(false)
let userStore = useUserStore()
const userName = userStore.username
const menu = userStore.menu
const logo = setting.logo
const sidebarIsCollapse = ref(false)

// 退出调用接口清空cookie
const logout = () => {
  loading.value = true
  userStore
    .userLogout()
    .then((res) => {
      if (res.code == 1) {
        clearAuthToken()
        router.push('/login')
      }
    })
    .catch(() => {})
}

// 点击退出弹出模态对话框
const openLogout = () => {
  ElMessageBox.confirm('确定要退出吗?', '注意', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      logout()
    })
    .catch(() => {})
}

// 跳转到个人信息页
const jumpToProfile = () => {
  router.push('/profile')
}

// 跳转到更改密码页
const jumpToResetPassword = () => {
  router.push('/resetPassword')
}
</script>

<template>
  <div class="layout" v-loading="loading">
    <el-container>
      <el-aside class="layout_sidebar">
        <el-scrollbar>
          <el-menu
            :collapse-transition="true"
            default-active="1"
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
          <div class="layout_content_header_left">
            <div @click="sidebarIsCollapse = !sidebarIsCollapse">
              <el-icon :size="20" class="el-icon--right" v-if="sidebarIsCollapse">
                <i-ep-expand />
              </el-icon>
              <el-icon :size="20" class="el-icon--right" v-if="!sidebarIsCollapse">
                <i-ep-fold />
              </el-icon>
            </div>
          </div>
          <div class="layout_content_header_right">
            <el-dropdown popper-class="layout_content_header_right_user">
              <span class="el-dropdown-link layout_content_header_right_user_name">
                {{ userName }}
                <el-icon class="el-icon--right">
                  <i-ep-arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="jumpToProfile()">账户信息</el-dropdown-item>
                  <el-dropdown-item @click="jumpToResetPassword()">修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click="openLogout()">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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

      // 顶部左侧logo与工具区
      &_left {
        display: flex;
        align-items: center;
        height: $layout-header-height;
        background: white;
      }

      &_left div {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 4px;
        cursor: pointer;
      }

      // 顶部右侧
      &_right {
        display: flex;
        align-items: center;
        height: $layout-header-height;
        padding: 0 14px;
        background: white;

        &_user {
          &_name {
            display: flex;
            align-items: center;
            height: $layout-header-height;
          }
        }
      }
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
