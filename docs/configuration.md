# XHR Monitor Configuration

## 概述

XHR Monitor 现在提供了一个美观的配置界面，允许用户自定义监控行为和显示设置。配置界面使用纯原生 JavaScript 实现，无外部依赖，兼容所有现代浏览器。

## 如何打开配置窗口

### 方法 1：通过用户脚本菜单
1. 在安装了用户脚本的浏览器中
2. 点击用户脚本管理器的菜单
3. 选择 "Configuration" 选项

### 方法 2：通过 URL 参数
直接访问：`https://github.com/JSREI/js-xhr-hook?configuration=true`

## 配置选项

### 监控设置 (Monitor Settings)

- **Enable XHR Monitoring**: 开启/关闭 XHR 请求监控
- **Enable Console Logging**: 将 XHR 请求记录到浏览器控制台
- **Enable Breakpoints**: 允许在 XHR 请求上设置断点

### 过滤设置 (Filter Settings)

- **URL Filter Pattern**: 只监控匹配此模式的 URL（支持正则表达式）
- **HTTP Methods**: 要监控的 HTTP 方法，用逗号分隔（如：GET,POST,PUT,DELETE）

### 显示设置 (Display Settings)

- **Max Requests to Keep**: 内存中保留的最大请求数量
- **Show Timestamps**: 为每个请求显示时间戳

## 功能特性

### 现代化 UI
- 渐变背景和卡片式设计
- 响应式布局，适配不同屏幕尺寸
- 平滑的动画效果和交互反馈

### 配置持久化
- 使用 `GM_setValue` 和 `GM_getValue` 保存配置
- 配置在浏览器重启后保持不变
- 支持重置为默认设置

### 用户友好
- 实时保存反馈通知
- 确认对话框防止误操作
- 详细的选项说明

## 技术实现

### 无外部依赖
- 纯原生 JavaScript 实现
- 不依赖 Vue.js、React 等框架
- 兼容严格的 CSP 策略

### 模块化设计
- 可重用的 UI 组件
- 清晰的配置管理逻辑
- 易于扩展和维护

### 安全性
- 遵循内容安全策略 (CSP)
- 不使用内联脚本
- 安全的配置存储

## 使用示例

```javascript
// 获取配置值
const isMonitorEnabled = getConfig('enableMonitor', true);
const urlFilter = getConfig('urlFilter', '');
const maxRequests = getConfig('maxRequests', '100');

// 在代码中使用配置
if (isMonitorEnabled) {
    // 执行监控逻辑
}
```

## 故障排除

### 配置窗口无法打开
1. 确保用户脚本已正确安装并启用
2. 检查浏览器控制台是否有错误信息
3. 尝试刷新页面后重新打开

### 配置无法保存
1. 确保用户脚本管理器支持 `GM_setValue` 和 `GM_getValue`
2. 检查浏览器是否允许本地存储
3. 尝试重置配置后重新设置

### CSP 错误
新的实现已经解决了 CSP 问题，如果仍然遇到问题：
1. 确保使用最新版本的用户脚本
2. 检查页面的 CSP 策略是否过于严格
3. 尝试在不同的页面上打开配置窗口

## 更新日志

### v0.4
- 重写配置界面，移除 Vue.js 依赖
- 修复 CSP 兼容性问题
- 添加现代化 UI 设计
- 改进配置持久化机制
- 添加用户友好的通知系统
