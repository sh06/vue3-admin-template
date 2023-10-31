<script setup lang="ts">
import router from '@/router'
import { clearAuthToken } from '@/utils/auth'
import breadcrumb from '@/layout/component/header/breadcrumb.vue'
import { FullScreen, Refresh } from '@element-plus/icons-vue'

const props = defineProps([
  'userName',
  'collapse',
  'loading',
  'userStore',
  'menuKey',
  'routerViewKey'
])
const emit = defineEmits([
  'update:collapse',
  'update:loading',
  'update:menuKey',
  'update:routerViewKey'
])
let menuKeyValue = ref(props.menuKey)

// 退出调用接口清空cookie
const logout = () => {
  emit('update:loading', true)
  props.userStore
    .userLogout()
    .then((res: { code: number }) => {
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

// 不能 menuKeyValue.value++，因为会先更新原来的值到父组件，然后才自增
const updateMenuKey = () => {
  emit('update:menuKey', ++menuKeyValue.value)
}

// 跳转到个人信息页
const jumpToProfile = () => {
  updateMenuKey()
  router.push('/account/profile')
}

// 跳转到更改密码页
const jumpToResetPassword = () => {
  updateMenuKey()
  router.push('/account/resetPassword')
}

const refresh = () => {
  emit('update:routerViewKey', false)
}

const fullScreen = () => {
  // 这个属性判断当前是否是全屏模式 true是全屏 false不是
  let full = document.fullscreenElement
  if (!full) {
    // 实现全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>

<template>
  <div class="layout_content_header_left">
    <div @click="$emit('update:collapse', !props.collapse)">
      <el-icon :size="20" class="el-icon--right" v-if="props.collapse">
        <i-ep-expand />
      </el-icon>
      <el-icon :size="20" class="el-icon--right" v-if="!props.collapse">
        <i-ep-fold />
      </el-icon>
    </div>
    <div>
      <breadcrumb></breadcrumb>
    </div>
  </div>
  <div class="layout_content_header_right">
    <div class="layout_content_header_right_tool">
      <el-button :circle="true" size="small" :icon="Refresh" title="刷新页面" @click="refresh" />
      <el-button
        :circle="true"
        size="small"
        :icon="FullScreen"
        title="全屏显示与退出"
        @click="fullScreen"
      />
    </div>
    <el-dropdown popper-class="layout_content_header_right_user">
      <span class="el-dropdown-link layout_content_header_right_user_name">
        {{ props.userName }}
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
</template>

<style scoped lang="scss">
// 顶部左侧logo与工具区
.layout_content_header_left {
  display: flex;
  align-items: center;
  height: $layout-header-height;
  background: white;
}

.layout_content_header_left div {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 4px;
  cursor: pointer;
}

// 顶部右侧
.layout_content_header_right {
  display: flex;
  align-items: center;
  height: $layout-header-height;
  padding: 0 14px;
  background: white;

  &_tool {
    margin-right: 10px;
  }

  &_user {
    &_name {
      display: flex;
      align-items: center;
      height: $layout-header-height;
    }
  }
}
</style>
