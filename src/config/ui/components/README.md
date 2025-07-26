# UI组件架构设计

## 目录结构

```
src/config/ui/components/
├── base/                    # 基础组件
│   ├── Button/
│   │   ├── Button.js       # 组件逻辑
│   │   ├── Button.css.js   # 组件样式
│   │   └── Button.html.js  # 组件模板
│   ├── Toggle/
│   │   ├── Toggle.js
│   │   ├── Toggle.css.js
│   │   └── Toggle.html.js
│   ├── Input/
│   │   ├── Input.js
│   │   ├── Input.css.js
│   │   └── Input.html.js
│   └── Section/
│       ├── Section.js
│       ├── Section.css.js
│       └── Section.html.js
├── composite/               # 复合组件
│   ├── ConfigSection/
│   │   ├── ConfigSection.js
│   │   ├── ConfigSection.css.js
│   │   └── ConfigSection.html.js
│   ├── NotificationSystem/
│   │   ├── NotificationSystem.js
│   │   ├── NotificationSystem.css.js
│   │   └── NotificationSystem.html.js
│   └── Header/
│       ├── Header.js
│       ├── Header.css.js
│       └── Header.html.js
├── styles/                  # 全局样式
│   ├── global.css.js       # 全局样式定义
│   └── theme.js            # 主题配置
└── utils/                   # 组件工具函数
    ├── component-base.js   # 组件基类
    └── dom-utils.js        # DOM操作工具
```

## 组件设计规范

### 1. 组件基类 (ComponentBase)

所有组件都继承自基类，提供统一的接口：

```javascript
class ComponentBase {
    constructor(options = {}) {
        this.options = options;
        this.element = null;
        this.eventListeners = [];
    }
    
    // 渲染组件
    render() {}
    
    // 销毁组件
    destroy() {}
    
    // 添加事件监听
    addEventListener(event, handler) {}
    
    // 移除事件监听
    removeEventListener(event, handler) {}
    
    // 更新组件状态
    setState(newState) {}
}
```

### 2. 文件分离规范

#### 样式文件 (*.css.js)
- 导出CSS字符串
- 使用模板字符串定义样式
- 支持主题变量

#### 模板文件 (*.html.js)
- 导出HTML模板函数
- 接收数据参数，返回HTML字符串
- 支持条件渲染和循环

#### 逻辑文件 (*.js)
- 组件主要逻辑
- 继承ComponentBase
- 处理事件和状态管理

### 3. 组件接口规范

每个组件都应该提供：

```javascript
// 创建组件实例
const component = new ComponentName(options);

// 渲染到指定容器
component.render(container);

// 获取组件元素
const element = component.getElement();

// 更新组件状态
component.setState(newState);

// 销毁组件
component.destroy();
```

### 4. 事件系统

组件间通信使用自定义事件：

```javascript
// 触发事件
component.emit('change', data);

// 监听事件
component.on('change', handler);

// 移除监听
component.off('change', handler);
```

## 主题系统

### 颜色变量
```javascript
const theme = {
    colors: {
        primary: '#4f46e5',
        secondary: '#6b7280',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#374151',
        textSecondary: '#6b7280'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px'
    }
};
```

## 使用示例

```javascript
// 创建按钮组件
const saveButton = new Button({
    text: 'Save Settings',
    type: 'primary',
    onClick: () => saveConfiguration()
});

// 创建开关组件
const enableToggle = new Toggle({
    id: 'enableMonitor',
    label: 'Enable XHR Monitoring',
    defaultValue: true,
    onChange: (value) => console.log('Toggle changed:', value)
});

// 创建配置区域
const monitorSection = new ConfigSection({
    title: 'Monitor Settings',
    items: [enableToggle, ...]
});

// 渲染到页面
monitorSection.render(document.body);
```

## 优势

1. **模块化**：每个组件独立，易于维护和测试
2. **可重用**：组件可在不同场景下复用
3. **可扩展**：易于添加新组件和功能
4. **主题化**：统一的主题系统，易于定制外观
5. **类型安全**：清晰的接口定义，减少错误
6. **无依赖**：纯原生实现，避免框架冲突
