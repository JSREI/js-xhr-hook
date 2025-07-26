/**
 * Button组件
 * 可重用的按钮组件，支持多种样式和状态
 */

const { ComponentBase } = require('../../utils/component-base');
const { addStyles } = require('../../utils/dom-utils');
const { buttonStyles } = require('./Button.css');
const { buttonTemplate, icons } = require('./Button.html');

class Button extends ComponentBase {
    constructor(options = {}) {
        super(options);
        this.addStyles();
    }

    getDefaultOptions() {
        return {
            text: '',
            type: 'button',
            variant: 'primary', // primary, secondary, success, error, outline, ghost
            size: 'medium', // small, medium, large
            disabled: false,
            loading: false,
            fullWidth: false,
            round: false,
            iconOnly: false,
            icon: null,
            iconPosition: 'left', // left, right
            className: '',
            id: '',
            ariaLabel: '',
            title: '',
            onClick: null,
            ripple: true
        };
    }

    getInitialState() {
        return {
            disabled: this.options.disabled,
            loading: this.options.loading
        };
    }

    addStyles() {
        // 只添加一次样式
        if (!document.getElementById('ui-button-styles')) {
            addStyles(buttonStyles, 'ui-button-styles');
        }
    }

    createElement() {
        const props = {
            ...this.options,
            disabled: this.state.disabled,
            loading: this.state.loading
        };

        // 创建临时容器来解析HTML
        const temp = document.createElement('div');
        temp.innerHTML = buttonTemplate(props);
        const button = temp.firstElementChild;

        return button;
    }

    bindEvents() {
        if (!this.element) return;

        // 点击事件
        this.element.addEventListener('click', this.handleClick.bind(this));

        // 键盘事件
        this.element.addEventListener('keydown', this.handleKeyDown.bind(this));

        // 波纹效果
        if (this.options.ripple) {
            this.element.addEventListener('mousedown', this.handleRipple.bind(this));
        }
    }

    handleClick(event) {
        if (this.state.disabled || this.state.loading) {
            event.preventDefault();
            return;
        }

        // 触发自定义点击事件
        this.emit('click', event);

        // 执行回调函数
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
    }

    handleKeyDown(event) {
        // Enter 或 Space 键触发点击
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleClick(event);
        }
    }

    handleRipple(event) {
        if (this.state.disabled || this.state.loading) return;

        const button = this.element;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ui-button__ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        // 动画结束后移除波纹元素
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // 设置加载状态
    setLoading(loading) {
        this.setState({ loading });
    }

    // 设置禁用状态
    setDisabled(disabled) {
        this.setState({ disabled });
    }

    // 设置按钮文本
    setText(text) {
        this.options.text = text;
        this.update();
    }

    // 设置按钮图标
    setIcon(icon) {
        this.options.icon = icon;
        this.update();
    }

    // 获取按钮状态
    isDisabled() {
        return this.state.disabled;
    }

    isLoading() {
        return this.state.loading;
    }

    // 模拟点击
    click() {
        if (this.element && !this.state.disabled && !this.state.loading) {
            this.element.click();
        }
    }

    // 聚焦按钮
    focus() {
        if (this.element) {
            this.element.focus();
        }
    }

    // 失焦按钮
    blur() {
        if (this.element) {
            this.element.blur();
        }
    }

    // 静态方法：创建常用按钮
    static createSaveButton(options = {}) {
        return new Button({
            text: 'Save',
            variant: 'primary',
            icon: icons.save,
            ...options
        });
    }

    static createCancelButton(options = {}) {
        return new Button({
            text: 'Cancel',
            variant: 'secondary',
            icon: icons.close,
            ...options
        });
    }

    static createResetButton(options = {}) {
        return new Button({
            text: 'Reset',
            variant: 'outline',
            icon: icons.reset,
            ...options
        });
    }

    static createDeleteButton(options = {}) {
        return new Button({
            text: 'Delete',
            variant: 'error',
            icon: icons.delete,
            ...options
        });
    }
}

module.exports = { Button, icons };
