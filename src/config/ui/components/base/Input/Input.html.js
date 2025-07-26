/**
 * Input组件模板
 */

/**
 * 生成Input HTML模板
 * @param {Object} props - 组件属性
 * @returns {string} HTML字符串
 */
function inputTemplate(props) {
    const {
        id = '',
        name = '',
        type = 'text',
        label = '',
        placeholder = '',
        value = '',
        defaultValue = '',
        disabled = false,
        readonly = false,
        required = false,
        maxLength = null,
        minLength = null,
        max = null,
        min = null,
        step = null,
        pattern = '',
        size = 'medium', // small, medium, large
        variant = 'default', // default, error, success, warning
        iconLeft = null,
        iconRight = null,
        clearable = false,
        showPasswordToggle = false,
        helpText = '',
        showCounter = false,
        rows = 4,
        resize = true,
        className = '',
        ariaLabel = '',
        ariaDescribedBy = ''
    } = props;

    // 生成唯一ID
    const inputId = id || `ui-input-${Math.random().toString(36).substr(2, 9)}`;
    const helpId = helpText ? `${inputId}-help` : '';
    const counterId = showCounter ? `${inputId}-counter` : '';

    // 构建CSS类名
    const containerClasses = [
        'ui-input',
        `ui-input--${size}`,
        variant !== 'default' ? `ui-input--${variant}` : '',
        iconLeft ? 'ui-input--with-icon-left' : '',
        iconRight ? 'ui-input--with-icon-right' : '',
        className
    ].filter(Boolean).join(' ');

    const fieldClasses = [
        'ui-input__field',
        type === 'textarea' ? 'ui-input__field--textarea' : '',
        type === 'textarea' && !resize ? 'ui-input__field--no-resize' : ''
    ].filter(Boolean).join(' ');

    // 构建输入框属性
    const fieldAttributes = [
        `id="${inputId}"`,
        name ? `name="${name}"` : '',
        type !== 'textarea' ? `type="${type}"` : '',
        placeholder ? `placeholder="${placeholder}"` : '',
        value ? `value="${value}"` : '',
        defaultValue && !value ? `value="${defaultValue}"` : '',
        disabled ? 'disabled' : '',
        readonly ? 'readonly' : '',
        required ? 'required' : '',
        maxLength ? `maxlength="${maxLength}"` : '',
        minLength ? `minlength="${minLength}"` : '',
        max ? `max="${max}"` : '',
        min ? `min="${min}"` : '',
        step ? `step="${step}"` : '',
        pattern ? `pattern="${pattern}"` : '',
        ariaLabel ? `aria-label="${ariaLabel}"` : '',
        ariaDescribedBy || helpId || counterId ? `aria-describedby="${[ariaDescribedBy, helpId, counterId].filter(Boolean).join(' ')}"` : ''
    ].filter(Boolean).join(' ');

    // 构建标签
    let labelContent = '';
    if (label) {
        const labelClasses = [
            'ui-input__label',
            required ? 'ui-input__label--required' : ''
        ].filter(Boolean).join(' ');

        labelContent = `<label for="${inputId}" class="${labelClasses}">${label}</label>`;
    }

    // 构建图标
    let leftIconContent = '';
    let rightIconContent = '';
    
    if (iconLeft) {
        leftIconContent = `<div class="ui-input__icon ui-input__icon--left">${iconLeft}</div>`;
    }
    
    if (iconRight) {
        rightIconContent = `<div class="ui-input__icon ui-input__icon--right">${iconRight}</div>`;
    }

    // 构建清除按钮
    let clearButtonContent = '';
    if (clearable && type !== 'password') {
        clearButtonContent = `
            <button type="button" class="ui-input__clear" aria-label="Clear input">
                <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                </svg>
            </button>
        `;
    }

    // 构建密码显示切换按钮
    let passwordToggleContent = '';
    if (showPasswordToggle && type === 'password') {
        passwordToggleContent = `
            <button type="button" class="ui-input__password-toggle" aria-label="Toggle password visibility">
                <svg class="ui-input__password-toggle-show" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5S21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7 17 9.24 17 12 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z"/>
                </svg>
                <svg class="ui-input__password-toggle-hide" viewBox="0 0 24 24" style="display: none;">
                    <path d="M12 7C9.24 7 7 9.24 7 12C7 13.08 7.37 14.05 8 14.82L5.18 17.64C4.24 16.79 3.46 15.79 2.89 14.68C2.33 13.57 2 12.31 2 12C2 7.61 6.27 4.5 12 4.5C13.73 4.5 15.39 4.88 16.89 5.64L14.82 7.71C14.05 7.26 13.08 7 12 7ZM2.01 3.87L4.69 6.55C3.06 7.84 1.77 9.53 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.97 18.7 16.31 18.18L19.42 21.29L20.71 20L3.42 2.71L2.01 3.87ZM9.51 11.37L12.12 13.98C12.08 14 12.04 14 12 14C10.34 14 9 12.66 9 11C9 10.96 9 10.92 9.01 10.88L9.51 11.37ZM13.09 9.85L16.12 12.88C16.5 12.3 16.5 11.7 16.12 11.12C15.74 10.54 15.08 10.15 14.37 10.04L13.09 9.85Z"/>
                </svg>
            </button>
        `;
    }

    // 构建输入框元素
    let fieldElement = '';
    if (type === 'textarea') {
        const textareaAttributes = fieldAttributes.replace(/type="textarea"/, '') + (rows ? ` rows="${rows}"` : '');
        fieldElement = `<textarea class="${fieldClasses}" ${textareaAttributes}>${value || defaultValue || ''}</textarea>`;
    } else {
        fieldElement = `<input class="${fieldClasses}" ${fieldAttributes}>`;
    }

    // 构建包装器内容
    const wrapperContent = `
        <div class="ui-input__wrapper">
            ${leftIconContent}
            ${fieldElement}
            ${rightIconContent}
            ${clearButtonContent}
            ${passwordToggleContent}
        </div>
    `;

    // 构建帮助文本
    let helpContent = '';
    if (helpText) {
        helpContent = `<div class="ui-input__help" id="${helpId}">${helpText}</div>`;
    }

    // 构建计数器
    let counterContent = '';
    if (showCounter && maxLength) {
        const currentLength = (value || defaultValue || '').length;
        const counterClasses = [
            'ui-input__counter',
            currentLength > maxLength ? 'ui-input__counter--over-limit' : ''
        ].filter(Boolean).join(' ');

        counterContent = `<div class="${counterClasses}" id="${counterId}">${currentLength}/${maxLength}</div>`;
    }

    return `
        <div class="${containerClasses}">
            ${labelContent}
            ${wrapperContent}
            ${helpContent}
            ${counterContent}
        </div>
    `;
}

/**
 * 常用图标SVG
 */
const inputIcons = {
    search: `<svg viewBox="0 0 24 24">
        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
    </svg>`,
    
    email: `<svg viewBox="0 0 24 24">
        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
    </svg>`,
    
    user: `<svg viewBox="0 0 24 24">
        <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
    </svg>`,
    
    lock: `<svg viewBox="0 0 24 24">
        <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z"/>
    </svg>`,
    
    phone: `<svg viewBox="0 0 24 24">
        <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/>
    </svg>`,
    
    calendar: `<svg viewBox="0 0 24 24">
        <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z"/>
    </svg>`,
    
    url: `<svg viewBox="0 0 24 24">
        <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12S4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12S18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12S19.76 7 17 7Z"/>
    </svg>`
};

module.exports = {
    inputTemplate,
    inputIcons
};
