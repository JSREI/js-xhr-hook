/**
 * Input组件
 * 可重用的输入框组件，支持多种类型和验证
 */

const { ComponentBase } = require('../../utils/component-base');
const { addStyles } = require('../../utils/dom-utils');
const { inputStyles } = require('./Input.css');
const { inputTemplate, inputIcons } = require('./Input.html');

class Input extends ComponentBase {
    constructor(options = {}) {
        super(options);
        this.addStyles();
    }

    getDefaultOptions() {
        return {
            id: '',
            name: '',
            type: 'text',
            label: '',
            placeholder: '',
            value: '',
            defaultValue: '',
            disabled: false,
            readonly: false,
            required: false,
            maxLength: null,
            minLength: null,
            max: null,
            min: null,
            step: null,
            pattern: '',
            size: 'medium',
            variant: 'default',
            iconLeft: null,
            iconRight: null,
            clearable: false,
            showPasswordToggle: false,
            helpText: '',
            showCounter: false,
            rows: 4,
            resize: true,
            className: '',
            ariaLabel: '',
            ariaDescribedBy: '',
            onChange: null,
            onInput: null,
            onFocus: null,
            onBlur: null,
            onKeyDown: null,
            onKeyUp: null,
            validator: null
        };
    }

    getInitialState() {
        return {
            value: this.options.value || this.options.defaultValue || '',
            focused: false,
            valid: true,
            errorMessage: '',
            showPassword: false
        };
    }

    addStyles() {
        if (!document.getElementById('ui-input-styles')) {
            addStyles(inputStyles, 'ui-input-styles');
        }
    }

    createElement() {
        const props = {
            ...this.options,
            value: this.state.value,
            variant: this.state.valid ? this.options.variant : 'error',
            helpText: this.state.valid ? this.options.helpText : this.state.errorMessage,
            type: this.options.type === 'password' && this.state.showPassword ? 'text' : this.options.type
        };

        const temp = document.createElement('div');
        temp.innerHTML = inputTemplate(props);
        return temp.firstElementChild;
    }

    bindEvents() {
        if (!this.element) return;

        this.field = this.element.querySelector('.ui-input__field');
        this.clearButton = this.element.querySelector('.ui-input__clear');
        this.passwordToggle = this.element.querySelector('.ui-input__password-toggle');

        if (this.field) {
            this.field.addEventListener('input', this.handleInput.bind(this));
            this.field.addEventListener('change', this.handleChange.bind(this));
            this.field.addEventListener('focus', this.handleFocus.bind(this));
            this.field.addEventListener('blur', this.handleBlur.bind(this));
            this.field.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.field.addEventListener('keyup', this.handleKeyUp.bind(this));
        }

        if (this.clearButton) {
            this.clearButton.addEventListener('click', this.handleClear.bind(this));
        }

        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', this.handlePasswordToggle.bind(this));
        }
    }

    handleInput(event) {
        const value = event.target.value;
        this.setState({ value });
        this.validate(value);
        this.updateCounter();

        this.emit('input', { value, event });
        if (typeof this.options.onInput === 'function') {
            this.options.onInput(value, event);
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.emit('change', { value, event });
        if (typeof this.options.onChange === 'function') {
            this.options.onChange(value, event);
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
        this.validate(this.state.value);
        this.emit('blur', event);
        if (typeof this.options.onBlur === 'function') {
            this.options.onBlur(event);
        }
    }

    handleKeyDown(event) {
        this.emit('keydown', event);
        if (typeof this.options.onKeyDown === 'function') {
            this.options.onKeyDown(event);
        }
    }

    handleKeyUp(event) {
        this.emit('keyup', event);
        if (typeof this.options.onKeyUp === 'function') {
            this.options.onKeyUp(event);
        }
    }

    handleClear() {
        this.setValue('');
        this.focus();
        this.emit('clear');
    }

    handlePasswordToggle() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    validate(value) {
        let valid = true;
        let errorMessage = '';

        // 必填验证
        if (this.options.required && !value.trim()) {
            valid = false;
            errorMessage = 'This field is required';
        }

        // 长度验证
        if (valid && this.options.minLength && value.length < this.options.minLength) {
            valid = false;
            errorMessage = `Minimum length is ${this.options.minLength}`;
        }

        if (valid && this.options.maxLength && value.length > this.options.maxLength) {
            valid = false;
            errorMessage = `Maximum length is ${this.options.maxLength}`;
        }

        // 模式验证
        if (valid && this.options.pattern && !new RegExp(this.options.pattern).test(value)) {
            valid = false;
            errorMessage = 'Invalid format';
        }

        // 自定义验证器
        if (valid && typeof this.options.validator === 'function') {
            const result = this.options.validator(value);
            if (result !== true) {
                valid = false;
                errorMessage = typeof result === 'string' ? result : 'Invalid value';
            }
        }

        this.setState({ valid, errorMessage });
        return valid;
    }

    updateCounter() {
        if (this.options.showCounter && this.options.maxLength) {
            const counter = this.element.querySelector('.ui-input__counter');
            if (counter) {
                const currentLength = this.state.value.length;
                counter.textContent = `${currentLength}/${this.options.maxLength}`;
                counter.classList.toggle('ui-input__counter--over-limit', currentLength > this.options.maxLength);
            }
        }
    }

    // 公共方法
    setValue(value) {
        this.setState({ value });
        if (this.field) {
            this.field.value = value;
        }
        this.validate(value);
        this.updateCounter();
    }

    getValue() {
        return this.state.value;
    }

    clear() {
        this.setValue('');
    }

    focus() {
        if (this.field) {
            this.field.focus();
        }
    }

    blur() {
        if (this.field) {
            this.field.blur();
        }
    }

    select() {
        if (this.field) {
            this.field.select();
        }
    }

    isValid() {
        return this.state.valid;
    }

    getErrorMessage() {
        return this.state.errorMessage;
    }

    setError(message) {
        this.setState({ valid: false, errorMessage: message });
    }

    clearError() {
        this.setState({ valid: true, errorMessage: '' });
    }

    // 静态方法：创建常用输入框
    static createText(options = {}) {
        return new Input({ type: 'text', ...options });
    }

    static createEmail(options = {}) {
        return new Input({ 
            type: 'email', 
            iconLeft: inputIcons.email,
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            ...options 
        });
    }

    static createPassword(options = {}) {
        return new Input({ 
            type: 'password', 
            iconLeft: inputIcons.lock,
            showPasswordToggle: true,
            ...options 
        });
    }

    static createSearch(options = {}) {
        return new Input({ 
            type: 'search', 
            iconLeft: inputIcons.search,
            clearable: true,
            ...options 
        });
    }

    static createNumber(options = {}) {
        return new Input({ type: 'number', ...options });
    }

    static createTextarea(options = {}) {
        return new Input({ type: 'textarea', ...options });
    }

    static createUrl(options = {}) {
        return new Input({ 
            type: 'url', 
            iconLeft: inputIcons.url,
            pattern: '^https?://.+',
            ...options 
        });
    }
}

module.exports = { Input, inputIcons };
