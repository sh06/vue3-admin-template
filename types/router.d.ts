import { type RouteComponent } from 'vue-router'

// 路由元数据定义
interface RouteMetaConfig {
  // 菜单名称 必填
  title: string
  // 菜单图标 可选
  icon?: string
  // 菜单是否显示
  show?: boolean
  // 菜单排序 可选 小的在上边
  rank?: number
  // 是否是菜单
  isMenu?: boolean
}

// 一级路由定义
interface RouteConfig {
  // 路由地址 必填
  path: string
  // 路由名称 可选
  name?: string
  // 页面组件 可选
  component?: RouteComponent
  // 路由重定向 可选
  redirect?: string
  // 路由元信息
  meta?: RouteMetaConfig
  // 子路由配置
  children?: Array<RouteChildrenConfig>
}

// 子路由定义
interface RouteChildrenConfig {
  // 路由地址 必填
  path: string
  // 路由名称 可选
  name?: string
  // 页面组件 可选
  component?: RouteComponent
  // 路由重定向 可选
  redirect?: string
  // 路由元信息
  meta?: RouteMetaConfig
  // 子路由配置
  children?: Array<RouteChildrenConfig>
}
