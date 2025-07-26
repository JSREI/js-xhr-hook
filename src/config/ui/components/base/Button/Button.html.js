/**
 * Button组件模板
 */

/**
 * 生成按钮HTML模板
 * @param {Object} props - 组件属性
 * @returns {string} HTML字符串
 */
function buttonTemplate(props) {
    const {
        text = '',
        type = 'button',
        variant = 'primary',
        size = 'medium',
        disabled = false,
        loading = false,
        fullWidth = false,
        round = false,
        iconOnly = false,
        icon = null,
        iconPosition = 'left',
        className = '',
        id = '',
        ariaLabel = '',
        title = ''
    } = props;

    // 构建CSS类名
    const classes = [
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${size}`,
        fullWidth ? 'ui-button--full-width' : '',
        round ? 'ui-button--round' : '',
        iconOnly ? 'ui-button--icon-only' : '',
        loading ? 'ui-button--loading' : '',
        className
    ].filter(Boolean).join(' ');

    // 构建属性
    const attributes = [
        `type="${type}"`,
        `class="${classes}"`,
        id ? `id="${id}"` : '',
        disabled || loading ? 'disabled' : '',
        ariaLabel ? `aria-label="${ariaLabel}"` : '',
        title ? `title="${title}"` : '',
        loading ? 'aria-busy="true"' : ''
    ].filter(Boolean).join(' ');

    // 构建内容
    let content = '';
    
    if (loading) {
        content = '<span class="ui-button__spinner"></span>';
        if (text && !iconOnly) {
            content += ` ${text}`;
        }
    } else {
        if (icon && iconPosition === 'left') {
            content += `<span class="ui-button__icon">${icon}</span>`;
        }
        
        if (text && !iconOnly) {
            content += text;
        }
        
        if (icon && iconPosition === 'right') {
            content += `<span class="ui-button__icon">${icon}</span>`;
        }
        
        if (iconOnly && icon) {
            content = `<span class="ui-button__icon">${icon}</span>`;
        }
    }

    return `<button ${attributes}>${content}</button>`;
}

/**
 * 常用图标SVG
 */
const icons = {
    save: `<svg viewBox="0 0 24 24">
        <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"/>
    </svg>`,
    
    close: `<svg viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
    </svg>`,
    
    reset: `<svg viewBox="0 0 24 24">
        <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z"/>
    </svg>`,
    
    check: `<svg viewBox="0 0 24 24">
        <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/>
    </svg>`,
    
    plus: `<svg viewBox="0 0 24 24">
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
    </svg>`,
    
    minus: `<svg viewBox="0 0 24 24">
        <path d="M19 13H5V11H19V13Z"/>
    </svg>`,
    
    edit: `<svg viewBox="0 0 24 24">
        <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z"/>
    </svg>`,
    
    delete: `<svg viewBox="0 0 24 24">
        <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z"/>
    </svg>`,
    
    settings: `<svg viewBox="0 0 24 24">
        <path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12S10.07 8.5 12 8.5 15.5 10.07 15.5 12 13.93 15.5 12 15.5M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.22 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"/>
    </svg>`,
    
    info: `<svg viewBox="0 0 24 24">
        <path d="M13 9H11V7H13M13 17H11V11H13M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z"/>
    </svg>`,
    
    warning: `<svg viewBox="0 0 24 24">
        <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"/>
    </svg>`
};

module.exports = {
    buttonTemplate,
    icons
};
