/**
 * 主题配置
 * 定义全局的设计令牌和样式变量
 */

const theme = {
    // 颜色系统
    colors: {
        // 主色调
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            main: '#4f46e5',
            dark: '#4338ca',
            light: '#6366f1'
        },
        
        // 次要色调
        secondary: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            main: '#6b7280',
            dark: '#4b5563',
            light: '#9ca3af'
        },
        
        // 状态色
        success: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            main: '#10b981',
            dark: '#059669',
            light: '#34d399'
        },
        
        error: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
            main: '#ef4444',
            dark: '#dc2626',
            light: '#f87171'
        },
        
        warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            main: '#f59e0b',
            dark: '#d97706',
            light: '#fbbf24'
        },
        
        info: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            main: '#3b82f6',
            dark: '#2563eb',
            light: '#60a5fa'
        },
        
        // 中性色
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#374151',
        textSecondary: '#6b7280',
        textDisabled: '#9ca3af',
        border: '#e5e7eb',
        divider: '#f3f4f6'
    },
    
    // 间距系统
    spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
        48: '192px',
        56: '224px',
        64: '256px',
        
        // 语义化间距
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
    },
    
    // 圆角系统
    borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '12px',
        '3xl': '16px',
        full: '9999px'
    },
    
    // 阴影系统
    shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },
    
    // 字体系统
    typography: {
        fontFamily: {
            sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
        },
        
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '36px',
            '5xl': '48px',
            '6xl': '60px'
        },
        
        fontWeight: {
            thin: '100',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900'
        },
        
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2'
        }
    },
    
    // 动画系统
    animation: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms'
        },
        
        easing: {
            linear: 'linear',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    },
    
    // 断点系统
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    
    // Z-index 层级
    zIndex: {
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        modal: '1040',
        popover: '1050',
        tooltip: '1060',
        notification: '1070'
    }
};

/**
 * 获取主题值的辅助函数
 * @param {string} path - 主题路径，如 'colors.primary.main'
 * @returns {*} 主题值
 */
function getThemeValue(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], theme);
}

/**
 * 创建CSS变量字符串
 * @param {Object} obj - 对象
 * @param {string} prefix - 前缀
 * @returns {string} CSS变量字符串
 */
function createCSSVariables(obj, prefix = '--') {
    let css = '';
    
    function traverse(obj, currentPrefix) {
        Object.entries(obj).forEach(([key, value]) => {
            const varName = `${currentPrefix}${key}`;
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                traverse(value, `${varName}-`);
            } else {
                css += `${varName}: ${value};\n`;
            }
        });
    }
    
    traverse(obj, prefix);
    return css;
}

module.exports = {
    theme,
    getThemeValue,
    createCSSVariables
};
