module.exports = {
  types: [
    { value: 'feat', name: 'feat:      新功能' },
    { value: 'fix', name: 'fix:       修复Bug' },
    { value: 'wip', name: 'wip:       开发中' },
    { value: 'docs', name: 'docs:      修改文档' },
    { value: 'style', name: 'style:     修改格式（空格，格式化，省略分号等）' },
    { value: 'ui', name: 'ui:        页面的更改' },
    { value: 'refactor', name: 'refactor:  重构（既不是修 bug ，也不是加功能）' },
    { value: 'perf', name: 'perf:      性能优化' },
    { value: 'test', name: 'test:      测试相关' },
    { value: 'build', name: 'build:     构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置等' },
    { value: 'ci', name: 'ci:        ci 相关的更改' }
  ],
  // 生成 feat: 这种
  scopes: [{ name: '默认空', value: '' }],
  messages: {
    type: '选择一种提交类型:',
    scope: '选择一个scope (可选):\n',
    // used if allowCustomScopes is true
    // customScope: '模块名称:',
    subject: '短描述:\n',
    body: '长描述，使用"|"换行(可选):\n',
    breaking: '不兼容的改动 (可选):\n',
    footer: '关联关闭的issue, 例如: #1, #2(可选):\n',
    confirmCommit: '确定提交?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100
}
