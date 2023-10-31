import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局进度条的配置
NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 1000,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
})

// 打开进度条
export const nprogressStart = () => {
  NProgress.start()
}

// 关闭进度条
export const nprogressDone = () => {
  NProgress.done()
}
