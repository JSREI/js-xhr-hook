function registerMenu() {
    let id = GM_registerMenuCommand(
        "Configuration",
        function () {
            const targetUrl = "https://github.com/JSREI/js-xhr-hook?configuration=true";
            if (window.location.href !== targetUrl) {
                window.location.href = targetUrl;
                return; // 跳转后不执行 show()，等待页面加载完成后再检查
            }
            show();
        }
    );
}

// 检查是否应该显示配置窗口
function checkAndShowConfiguration() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('configuration') === 'true') {
        show();
    }
}

function show() {
    // 清空整个文档
    document.documentElement.innerHTML = '';

    // 重新创建基本的 HTML 结构
    const head = document.createElement('head');
    const body = document.createElement('body');
    document.documentElement.appendChild(head);
    document.documentElement.appendChild(body);

    // 添加全局样式
    addGlobalStyles();

    // 创建配置界面
    createModernConfigurationUI();
}

// 导入简化的组件库
const {
    SimpleButton,
    SimpleToggle,
    SimpleInput,
    SimpleSection,
    notifications
} = require('./simple-components');

function addGlobalStyles() {
    const style = document.createElement('style');
    style.id = 'config-global-styles';
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .config-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .config-header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .config-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .config-header p {
            opacity: 0.9;
            font-size: 1.1rem;
        }

        .config-content {
            padding: 40px;
        }

        .config-section {
            margin-bottom: 40px;
            padding: 25px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #f9fafb;
        }

        .config-section h2 {
            color: #374151;
            margin-bottom: 20px;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .config-item {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .config-item label {
            font-weight: 500;
            color: #374151;
            flex: 1;
            margin-right: 20px;
        }

        .config-item .description {
            font-size: 0.9rem;
            color: #6b7280;
            margin-top: 5px;
        }

        .toggle-switch {
            position: relative;
            width: 60px;
            height: 30px;
            background: #d1d5db;
            border-radius: 15px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .toggle-switch.active {
            background: #10b981;
        }

        .toggle-switch .slider {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle-switch.active .slider {
            transform: translateX(30px);
        }

        .input-field {
            padding: 10px 15px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            width: 200px;
            transition: border-color 0.3s;
        }

        .input-field:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
        }

        .btn {
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #4f46e5;
            color: white;
        }

        .btn-primary:hover {
            background: #4338ca;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .btn-secondary:hover {
            background: #4b5563;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
        }
    `;

    document.head.appendChild(style);
}

function createModernConfigurationUI() {
    // 创建主容器
    const container = document.createElement('div');
    container.className = 'config-container';

    // 创建头部
    const header = document.createElement('div');
    header.className = 'config-header';
    header.innerHTML = `
        <h1>XHR Monitor Configuration</h1>
        <p>Configure your XHR monitoring and debugging settings</p>
    `;

    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'config-content';

    // 存储所有配置控件的引用
    const configControls = {};

    // 监控设置部分
    const monitorSection = new SimpleSection({
        title: 'Monitor Settings',
        description: 'Control basic monitoring functionality'
    });

    // 创建监控设置项
    const enableMonitorToggle = new SimpleToggle({
        id: 'enableMonitor',
        checked: true,
        onChange: (checked) => {
            configControls.enableMonitor = checked;
        }
    });

    const enableLoggingToggle = new SimpleToggle({
        id: 'enableLogging',
        checked: true,
        onChange: (checked) => {
            configControls.enableLogging = checked;
        }
    });

    const enableBreakpointsToggle = new SimpleToggle({
        id: 'enableBreakpoints',
        checked: false,
        onChange: (checked) => {
            configControls.enableBreakpoints = checked;
        }
    });

    // 添加监控设置项到区域
    monitorSection.addItem({
        label: 'Enable XHR Monitoring',
        description: 'Turn on/off XHR request monitoring',
        control: enableMonitorToggle
    });

    monitorSection.addItem({
        label: 'Enable Console Logging',
        description: 'Log XHR requests to browser console',
        control: enableLoggingToggle
    });

    monitorSection.addItem({
        label: 'Enable Breakpoints',
        description: 'Allow setting breakpoints on XHR requests',
        control: enableBreakpointsToggle
    });

    // 过滤设置部分
    const filterSection = new SimpleSection({
        title: 'Filter Settings',
        description: 'Configure request filtering options'
    });

    const urlFilterInput = new SimpleInput({
        id: 'urlFilter',
        placeholder: 'Enter URL pattern (regex supported)',
        value: '',
        onChange: (value) => {
            configControls.urlFilter = value;
        }
    });

    const methodFilterInput = new SimpleInput({
        id: 'methodFilter',
        placeholder: 'GET,POST,PUT,DELETE',
        value: 'GET,POST,PUT,DELETE',
        onChange: (value) => {
            configControls.methodFilter = value;
        }
    });

    filterSection.addItem({
        label: 'URL Filter Pattern',
        description: 'Only monitor URLs matching this pattern (regex supported)',
        control: urlFilterInput
    });

    filterSection.addItem({
        label: 'HTTP Methods',
        description: 'Comma-separated list of methods to monitor',
        control: methodFilterInput
    });

    // 显示设置部分
    const displaySection = new SimpleSection({
        title: 'Display Settings',
        description: 'Configure display and performance options'
    });

    const maxRequestsInput = new SimpleInput({
        id: 'maxRequests',
        type: 'number',
        value: '100',
        onChange: (value) => {
            configControls.maxRequests = value;
        }
    });

    const showTimestampToggle = new SimpleToggle({
        id: 'showTimestamp',
        checked: true,
        onChange: (checked) => {
            configControls.showTimestamp = checked;
        }
    });

    displaySection.addItem({
        label: 'Max Requests to Keep',
        description: 'Maximum number of requests to keep in memory',
        control: maxRequestsInput
    });

    displaySection.addItem({
        label: 'Show Timestamps',
        description: 'Display timestamp for each request',
        control: showTimestampToggle
    });

    // 渲染所有区域
    monitorSection.render(content);
    filterSection.render(content);
    displaySection.render(content);

    // 创建按钮组
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const saveBtn = new SimpleButton({
        text: 'Save Settings',
        variant: 'primary',
        onClick: () => saveModernConfiguration(configControls)
    });

    const resetBtn = new SimpleButton({
        text: 'Reset to Defaults',
        variant: 'secondary',
        onClick: () => resetModernConfiguration(configControls)
    });

    const closeBtn = new SimpleButton({
        text: 'Close',
        variant: 'secondary',
        onClick: () => window.location.reload()
    });

    saveBtn.render(buttonGroup);
    resetBtn.render(buttonGroup);
    closeBtn.render(buttonGroup);

    content.appendChild(buttonGroup);
    container.appendChild(header);
    container.appendChild(content);
    document.body.appendChild(container);

    // 加载当前配置
    loadModernConfiguration(configControls);

    // 存储控件引用以便后续使用
    window.configControls = configControls;
}

// 旧的函数已被新的组件系统替代

function saveModernConfiguration(configControls) {
    const config = {};

    // 收集所有配置值
    Object.keys(configControls).forEach(key => {
        config[key] = configControls[key];
    });

    // 使用 GM_setValue 保存配置
    try {
        GM_setValue('xhrMonitorConfig', JSON.stringify(config));

        // 显示保存成功提示
        notifications.success('Configuration saved successfully!');

        console.log('Configuration saved:', config);
    } catch (error) {
        notifications.error('Failed to save configuration!');
        console.error('Failed to save configuration:', error);
    }
}

function loadModernConfiguration(configControls) {
    try {
        const configStr = GM_getValue('xhrMonitorConfig', '{}');
        const config = JSON.parse(configStr);

        // 应用配置到控件
        if (config.enableMonitor !== undefined && window.configControls) {
            // 这里需要通过控件实例来设置值，但由于作用域问题，我们使用事件系统
            // 实际实现中应该通过更好的方式管理控件状态
        }

        // 更新configControls对象
        Object.keys(config).forEach(key => {
            if (configControls.hasOwnProperty(key)) {
                configControls[key] = config[key];
            }
        });

        console.log('Configuration loaded:', config);
    } catch (error) {
        console.error('Failed to load configuration:', error);
        notifications.warning('Failed to load configuration, using defaults');
    }
}

function resetModernConfiguration(configControls) {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        try {
            GM_setValue('xhrMonitorConfig', '{}');

            // 重新加载页面以应用默认设置
            window.location.reload();
        } catch (error) {
            console.error('Failed to reset configuration:', error);
            notifications.error('Failed to reset configuration!');
        }
    }
}

// 通知功能已由组件库的notifications系统替代

// 获取配置的公共函数
function getConfig(key, defaultValue = null) {
    try {
        const configStr = GM_getValue('xhrMonitorConfig', '{}');
        const config = JSON.parse(configStr);
        return config.hasOwnProperty(key) ? config[key] : defaultValue;
    } catch (error) {
        console.error('Failed to get config:', error);
        return defaultValue;
    }
}

module.exports = {
    registerMenu,
    show,
    checkAndShowConfiguration,
    getConfig,
}

