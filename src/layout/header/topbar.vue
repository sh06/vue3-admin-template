<script setup lang="ts">
import router from '@/router'
import { clearAuthToken } from '@/utils/auth'

const props = defineProps(['userName', 'collapse', 'loading', 'userStore', 'menukey'])
const emit = defineEmits(['update:collapse', 'update:loading', 'update:menukey'])
let menuKeyValue = ref(props.menukey)

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

// 自增 menuKey，不能 menuKeyValue++，因为会先更新原来的值，然后才自增
const incrMenuKey = () => {
  emit('update:menukey', ++menuKeyValue.value)
}

// 跳转到个人信息页
const jumpToProfile = () => {
  incrMenuKey()
  router.push('/profile')
}

// 跳转到更改密码页
const jumpToResetPassword = () => {
  incrMenuKey()
  router.push('/resetPassword')
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
  </div>
  <div class="layout_content_header_right">
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

  &_user {
    &_name {
      display: flex;
      align-items: center;
      height: $layout-header-height;
    }
  }
}
</style>
