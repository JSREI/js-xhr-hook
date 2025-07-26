/**
 * Toggle组件
 * 可重用的开关切换组件，支持多种样式和状态
 */

const { ComponentBase } = require('../../utils/component-base');
const { addStyles } = require('../../utils/dom-utils');
const { toggleStyles } = require('./Toggle.css');
const { toggleTemplate, togglePresets, createPresetToggle } = require('./Toggle.html');

class Toggle extends ComponentBase {
    constructor(options = {}) {
        super(options);
        this.addStyles();
    }

    getDefaultOptions() {
        return {
            id: '',
            name: '',
            label: '',
            description: '',
            checked: false,
            disabled: false,
            loading: false,
            size: 'medium', // small, medium, large
            variant: 'primary', // primary, success, warning, error
            labelPosition: 'right', // left, right, top, bottom
            className: '',
            ariaLabel: '',
            ariaDescribedBy: '',
            onChange: null,
            onFocus: null,
            onBlur: null
        };
    }

    getInitialState() {
        return {
            checked: this.options.checked,
            disabled: this.options.disabled,
            loading: this.options.loading,
            focused: false
        };
    }

    addStyles() {
        // 只添加一次样式
        if (!document.getElementById('ui-toggle-styles')) {
            addStyles(toggleStyles, 'ui-toggle-styles');
        }
    }

    createElement() {
        const props = {
            ...this.options,
            checked: this.state.checked,
            disabled: this.state.disabled,
            loading: this.state.loading
        };

        // 创建临时容器来解析HTML
        const temp = document.createElement('div');
        temp.innerHTML = toggleTemplate(props);
        const toggle = temp.firstElementChild;

        return toggle;
    }

    bindEvents() {
        if (!this.element) return;

        this.input = this.element.querySelector('.ui-toggle__input');
        this.switch = this.element.querySelector('.ui-toggle__switch');

        if (this.input) {
            this.input.addEventListener('change', this.handleChange.bind(this));
            this.input.addEventListener('focus', this.handleFocus.bind(this));
            this.input.addEventListener('blur', this.handleBlur.bind(this));
        }

        if (this.switch) {
            this.switch.addEventListener('click', this.handleSwitchClick.bind(this));
            this.switch.addEventListener('keydown', this.handleKeyDown.bind(this));
        }

        // 点击整个容器也能切换
        this.element.addEventListener('click', this.handleContainerClick.bind(this));
    }

    handleChange(event) {
        if (this.state.disabled || this.state.loading) {
            event.preventDefault();
            return;
        }

        const checked = event.target.checked;
        this.setState({ checked });

        // 触发自定义变化事件
        this.emit('change', { checked, event });

        // 执行回调函数
        if (typeof this.options.onChange === 'function') {
            this.options.onChange(checked, event);
        }
    }

    handleFocus(event) {
        this.setState({ focused: true });
        this.emit('focus', event);

        if (typeof this.options.onFocus === 'function') {
            this.options.onFocus(event);
        }
    }

    handleBlur(event) {
        this.setState({ focused: false });
        this.emit('blur', event);

        if (typeof this.options.onBlur === 'function') {
            this.options.onBlur(event);
        }
    }

    handleSwitchClick(event) {
        if (this.state.disabled || this.state.loading) {
            event.preventDefault();
            return;
        }

        // 如果点击的是开关本身，切换状态
        if (event.target === this.switch) {
            this.toggle();
        }
    }

    handleKeyDown(event) {
        if (this.state.disabled || this.state.loading) return;

        // Space 或 Enter 键切换状态
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.toggle();
        }
    }

    handleContainerClick(event) {
        if (this.state.disabled || this.state.loading) return;

        // 如果点击的不是输入框或开关，则切换状态
        if (event.target !== this.input && event.target !== this.switch) {
            this.toggle();
        }
    }

    // 切换状态
    toggle() {
        if (this.state.disabled || this.state.loading) return;

        const checked = !this.state.checked;
        this.setChecked(checked);
    }

    // 设置选中状态
    setChecked(checked) {
        if (this.state.disabled || this.state.loading) return;

        this.setState({ checked });

        // 同步更新input元素
        if (this.input) {
            this.input.checked = checked;
        }

        // 触发变化事件
        this.emit('change', { checked });

        if (typeof this.options.onChange === 'function') {
            this.options.onChange(checked);
        }
    }

    // 设置禁用状态
    setDisabled(disabled) {
        this.setState({ disabled });
    }

    // 设置加载状态
    setLoading(loading) {
        this.setState({ loading });
    }

    // 设置标签文本
    setLabel(label) {
        this.options.label = label;
        this.update();
    }

    // 设置描述文本
    setDescription(description) {
        this.options.description = description;
        this.update();
    }

    // 获取当前状态
    isChecked() {
        return this.state.checked;
    }

    isDisabled() {
        return this.state.disabled;
    }

    isLoading() {
        return this.state.loading;
    }

    isFocused() {
        return this.state.focused;
    }

    // 聚焦
    focus() {
        if (this.input && !this.state.disabled && !this.state.loading) {
            this.input.focus();
        }
    }

    // 失焦
    blur() {
        if (this.input) {
            this.input.blur();
        }
    }

    // 获取输入框元素
    getInput() {
        return this.input;
    }

    // 获取开关元素
    getSwitch() {
        return this.switch;
    }

    // 静态方法：创建预设Toggle
    static createPreset(preset, options = {}) {
        const presetConfig = togglePresets[preset];
        if (!presetConfig) {
            throw new Error(`Unknown toggle preset: ${preset}`);
        }

        return new Toggle({ ...presetConfig, ...options });
    }

    // 静态方法：创建常用Toggle
    static createBasic(options = {}) {
        return new Toggle({ ...togglePresets.basic, ...options });
    }

    static createSmall(options = {}) {
        return new Toggle({ ...togglePresets.small, ...options });
    }

    static createLarge(options = {}) {
        return new Toggle({ ...togglePresets.large, ...options });
    }

    static createSuccess(options = {}) {
        return new Toggle({ ...togglePresets.success, ...options });
    }

    static createWarning(options = {}) {
        return new Toggle({ ...togglePresets.warning, ...options });
    }

    static createError(options = {}) {
        return new Toggle({ ...togglePresets.error, ...options });
    }
}

module.exports = { Toggle, togglePresets };
