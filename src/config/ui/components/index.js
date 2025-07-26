/**
 * UI组件库入口文件
 * 导出所有可用的组件
 */

// 基础组件
const { Button, icons: buttonIcons } = require('./base/Button/Button');
const { Toggle, togglePresets } = require('./base/Toggle/Toggle');
const { Input, inputIcons } = require('./base/Input/Input');
const { Section } = require('./base/Section/Section');

// 工具函数
const { ComponentBase } = require('./utils/component-base');
const domUtils = require('./utils/dom-utils');
const { theme, getThemeValue, createCSSVariables } = require('./styles/theme');

// 通知系统
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.addStyles();
    }

    addStyles() {
        if (!document.getElementById('ui-notification-styles')) {
            const styles = `
                .ui-notification-container {
                    position: fixed;
                    top: ${theme.spacing.lg};
                    right: ${theme.spacing.lg};
                    z-index: ${theme.zIndex.notification};
                    display: flex;
                    flex-direction: column;
                    gap: ${theme.spacing.sm};
                    pointer-events: none;
                }
                
                .ui-notification {
                    padding: ${theme.spacing.md} ${theme.spacing.lg};
                    border-radius: ${theme.borderRadius.lg};
                    color: white;
                    font-weight: ${theme.typography.fontWeight.medium};
                    box-shadow: ${theme.shadows.lg};
                    animation: slideIn 0.3s ease-out;
                    pointer-events: auto;
                    max-width: 400px;
                    word-wrap: break-word;
                }
                
                .ui-notification--success {
                    background: ${theme.colors.success.main};
                }
                
                .ui-notification--error {
                    background: ${theme.colors.error.main};
                }
                
                .ui-notification--warning {
                    background: ${theme.colors.warning.main};
                }
                
                .ui-notification--info {
                    background: ${theme.colors.info.main};
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            domUtils.addStyles(styles, 'ui-notification-styles');
        }
    }

    getContainer() {
        if (!this.container) {
            this.container = domUtils.createElement('div', {
                className: 'ui-notification-container'
            });
            document.body.appendChild(this.container);
        }
        return this.container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = domUtils.createElement('div', {
            className: `ui-notification ui-notification--${type}`
        }, message);

        const container = this.getContainer();
        container.appendChild(notification);

        this.notifications.push(notification);

        // 自动移除
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }

        return notification;
    }

    remove(notification) {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 300);
        }
    }

    success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    clear() {
        this.notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
        this.notifications = [];
    }
}

// 创建全局通知实例
const notifications = new NotificationSystem();

// 配置项组件
class ConfigItem extends ComponentBase {
    constructor(options = {}) {
        super(options);
    }

    getDefaultOptions() {
        return {
            id: '',
            label: '',
            description: '',
            type: 'toggle', // toggle, input, select
            defaultValue: null,
            options: [], // for select type
            className: ''
        };
    }

    createElement() {
        const container = domUtils.createElement('div', {
            className: `config-item ${this.options.className}`
        });

        // 创建标签区域
        const labelContainer = domUtils.createElement('div', {
            className: 'config-item__info'
        });

        if (this.options.label) {
            const label = domUtils.createElement('div', {
                className: 'config-item__label'
            }, this.options.label);
            labelContainer.appendChild(label);
        }

        if (this.options.description) {
            const description = domUtils.createElement('div', {
                className: 'config-item__description'
            }, this.options.description);
            labelContainer.appendChild(description);
        }

        container.appendChild(labelContainer);

        // 创建控件区域
        const controlContainer = domUtils.createElement('div', {
            className: 'config-item__control'
        });

        let control;
        switch (this.options.type) {
            case 'toggle':
                control = new Toggle({
                    id: this.options.id,
                    checked: this.options.defaultValue,
                    onChange: (checked) => this.emit('change', checked)
                });
                break;
            case 'input':
                control = new Input({
                    id: this.options.id,
                    value: this.options.defaultValue,
                    onChange: (value) => this.emit('change', value)
                });
                break;
            default:
                control = domUtils.createElement('span', {}, 'Unknown control type');
        }

        if (control.render) {
            control.render(controlContainer);
            this.control = control;
        } else {
            controlContainer.appendChild(control);
        }

        container.appendChild(controlContainer);

        return container;
    }

    getValue() {
        if (this.control) {
            if (this.control.getValue) {
                return this.control.getValue();
            } else if (this.control.isChecked) {
                return this.control.isChecked();
            }
        }
        return null;
    }

    setValue(value) {
        if (this.control) {
            if (this.control.setValue) {
                this.control.setValue(value);
            } else if (this.control.setChecked) {
                this.control.setChecked(value);
            }
        }
    }
}

module.exports = {
    // 基础组件
    Button,
    Toggle,
    Input,
    Section,
    
    // 复合组件
    ConfigItem,
    NotificationSystem,
    
    // 工具
    ComponentBase,
    domUtils,
    theme,
    getThemeValue,
    createCSSVariables,
    
    // 图标
    buttonIcons,
    inputIcons,
    
    // 预设
    togglePresets,
    
    // 全局实例
    notifications
};
