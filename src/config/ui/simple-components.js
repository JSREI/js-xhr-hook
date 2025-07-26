/**
 * 简化的UI组件系统
 * 避免复杂的模板字符串和依赖问题
 */

// 简单的通知系统
class SimpleNotifications {
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            word-wrap: break-word;
        `;
        
        // 根据类型设置颜色
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            case 'warning':
                notification.style.background = '#f59e0b';
                break;
            default:
                notification.style.background = '#3b82f6';
        }
        
        notification.textContent = message;
        
        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // 自动移除
        if (duration > 0) {
            setTimeout(() => {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
        }
        
        return notification;
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
}

// 简单的按钮组件
class SimpleButton {
    constructor(options = {}) {
        this.options = {
            text: '',
            variant: 'primary',
            onClick: null,
            ...options
        };
        this.element = null;
    }
    
    render(container) {
        this.element = document.createElement('button');
        this.element.textContent = this.options.text;
        this.element.className = `btn btn-${this.options.variant}`;
        
        if (this.options.onClick) {
            this.element.addEventListener('click', this.options.onClick);
        }
        
        if (container) {
            container.appendChild(this.element);
        }
        
        return this.element;
    }
}

// 简单的开关组件
class SimpleToggle {
    constructor(options = {}) {
        this.options = {
            id: '',
            checked: false,
            onChange: null,
            ...options
        };
        this.element = null;
        this.checked = this.options.checked;
    }
    
    render(container) {
        this.element = document.createElement('div');
        this.element.className = 'toggle-switch';
        this.element.dataset.id = this.options.id;
        
        if (this.checked) {
            this.element.classList.add('active');
        }
        
        const slider = document.createElement('div');
        slider.className = 'slider';
        this.element.appendChild(slider);
        
        this.element.addEventListener('click', () => {
            this.toggle();
        });
        
        if (container) {
            container.appendChild(this.element);
        }
        
        return this.element;
    }
    
    toggle() {
        this.checked = !this.checked;
        this.element.classList.toggle('active', this.checked);
        
        if (this.options.onChange) {
            this.options.onChange(this.checked);
        }
    }
    
    setChecked(checked) {
        this.checked = checked;
        if (this.element) {
            this.element.classList.toggle('active', checked);
        }
    }
    
    isChecked() {
        return this.checked;
    }
}

// 简单的输入框组件
class SimpleInput {
    constructor(options = {}) {
        this.options = {
            id: '',
            type: 'text',
            value: '',
            placeholder: '',
            onChange: null,
            ...options
        };
        this.element = null;
    }
    
    render(container) {
        this.element = document.createElement('input');
        this.element.type = this.options.type;
        this.element.className = 'input-field';
        this.element.dataset.id = this.options.id;
        this.element.value = this.options.value;
        this.element.placeholder = this.options.placeholder;
        
        this.element.addEventListener('input', (e) => {
            if (this.options.onChange) {
                this.options.onChange(e.target.value);
            }
        });
        
        if (container) {
            container.appendChild(this.element);
        }
        
        return this.element;
    }
    
    getValue() {
        return this.element ? this.element.value : this.options.value;
    }
    
    setValue(value) {
        this.options.value = value;
        if (this.element) {
            this.element.value = value;
        }
    }
}

// 简单的区域组件
class SimpleSection {
    constructor(options = {}) {
        this.options = {
            title: '',
            description: '',
            ...options
        };
        this.element = null;
        this.items = [];
    }
    
    render(container) {
        this.element = document.createElement('div');
        this.element.className = 'config-section';
        
        if (this.options.title) {
            const title = document.createElement('h2');
            title.textContent = this.options.title;
            this.element.appendChild(title);
        }
        
        if (this.options.description) {
            const description = document.createElement('p');
            description.textContent = this.options.description;
            description.style.marginBottom = '20px';
            description.style.color = '#6b7280';
            this.element.appendChild(description);
        }
        
        // 渲染已添加的项目
        this.items.forEach(item => {
            this.renderItem(item);
        });
        
        if (container) {
            container.appendChild(this.element);
        }
        
        return this.element;
    }
    
    addItem(item) {
        this.items.push(item);
        if (this.element) {
            this.renderItem(item);
        }
    }
    
    renderItem(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'config-item';
        
        const labelContainer = document.createElement('div');
        labelContainer.style.flex = '1';
        
        if (item.label) {
            const label = document.createElement('label');
            label.textContent = item.label;
            labelContainer.appendChild(label);
        }
        
        if (item.description) {
            const description = document.createElement('div');
            description.className = 'description';
            description.textContent = item.description;
            labelContainer.appendChild(description);
        }
        
        const controlContainer = document.createElement('div');
        
        if (item.control && item.control.render) {
            item.control.render(controlContainer);
        }
        
        itemElement.appendChild(labelContainer);
        itemElement.appendChild(controlContainer);
        this.element.appendChild(itemElement);
    }
}

// 创建全局实例
const notifications = new SimpleNotifications();

module.exports = {
    SimpleButton,
    SimpleToggle,
    SimpleInput,
    SimpleSection,
    notifications
};
