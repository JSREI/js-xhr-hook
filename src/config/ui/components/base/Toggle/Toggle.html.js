/**
 * Toggle组件模板
 */

/**
 * 生成Toggle HTML模板
 * @param {Object} props - 组件属性
 * @returns {string} HTML字符串
 */
function toggleTemplate(props) {
    const {
        id = '',
        name = '',
        label = '',
        description = '',
        checked = false,
        disabled = false,
        loading = false,
        size = 'medium', // small, medium, large
        variant = 'primary', // primary, success, warning, error
        labelPosition = 'right', // left, right, top, bottom
        className = '',
        ariaLabel = '',
        ariaDescribedBy = ''
    } = props;

    // 生成唯一ID
    const toggleId = id || `ui-toggle-${Math.random().toString(36).substr(2, 9)}`;
    const descriptionId = description ? `${toggleId}-description` : '';

    // 构建CSS类名
    const containerClasses = [
        'ui-toggle',
        `ui-toggle--${size}`,
        `ui-toggle--${variant}`,
        `ui-toggle--label-${labelPosition}`,
        disabled ? 'ui-toggle--disabled' : '',
        loading ? 'ui-toggle--loading' : '',
        className
    ].filter(Boolean).join(' ');

    const switchClasses = [
        'ui-toggle__switch',
        checked ? 'ui-toggle__switch--checked' : '',
        disabled ? 'ui-toggle__switch--disabled' : ''
    ].filter(Boolean).join(' ');

    const labelClasses = [
        'ui-toggle__label',
        disabled ? 'ui-toggle__label--disabled' : ''
    ].filter(Boolean).join(' ');

    // 构建属性
    const inputAttributes = [
        `type="checkbox"`,
        `id="${toggleId}"`,
        name ? `name="${name}"` : '',
        checked ? 'checked' : '',
        disabled || loading ? 'disabled' : '',
        ariaLabel ? `aria-label="${ariaLabel}"` : '',
        ariaDescribedBy || descriptionId ? `aria-describedby="${ariaDescribedBy || descriptionId}"` : ''
    ].filter(Boolean).join(' ');

    const switchAttributes = [
        `role="switch"`,
        `aria-checked="${checked}"`,
        `tabindex="${disabled || loading ? '-1' : '0'}"`,
        disabled || loading ? 'aria-disabled="true"' : ''
    ].filter(Boolean).join(' ');

    // 构建标签内容
    let labelContent = '';
    if (label) {
        labelContent = `
            <label for="${toggleId}" class="${labelClasses}">
                ${label}
                ${description ? `<div class="ui-toggle__description" id="${descriptionId}">${description}</div>` : ''}
            </label>
        `;
    }

    // 构建开关内容
    const switchContent = `
        <div class="${switchClasses}" ${switchAttributes}>
            <input class="ui-toggle__input" ${inputAttributes}>
            <div class="ui-toggle__slider"></div>
        </div>
    `;

    // 根据标签位置组装内容
    let content = '';
    switch (labelPosition) {
        case 'left':
            content = labelContent + switchContent;
            break;
        case 'top':
            content = labelContent + switchContent;
            break;
        case 'bottom':
            content = switchContent + labelContent;
            break;
        case 'right':
        default:
            content = switchContent + labelContent;
            break;
    }

    return `<div class="${containerClasses}">${content}</div>`;
}

/**
 * 预定义的Toggle配置
 */
const togglePresets = {
    // 基础开关
    basic: {
        size: 'medium',
        variant: 'primary',
        labelPosition: 'right'
    },

    // 小尺寸开关
    small: {
        size: 'small',
        variant: 'primary',
        labelPosition: 'right'
    },

    // 大尺寸开关
    large: {
        size: 'large',
        variant: 'primary',
        labelPosition: 'right'
    },

    // 成功状态开关
    success: {
        size: 'medium',
        variant: 'success',
        labelPosition: 'right'
    },

    // 警告状态开关
    warning: {
        size: 'medium',
        variant: 'warning',
        labelPosition: 'right'
    },

    // 错误状态开关
    error: {
        size: 'medium',
        variant: 'error',
        labelPosition: 'right'
    },

    // 左侧标签
    labelLeft: {
        size: 'medium',
        variant: 'primary',
        labelPosition: 'left'
    },

    // 顶部标签
    labelTop: {
        size: 'medium',
        variant: 'primary',
        labelPosition: 'top'
    },

    // 底部标签
    labelBottom: {
        size: 'medium',
        variant: 'primary',
        labelPosition: 'bottom'
    }
};

/**
 * 创建预设Toggle
 * @param {string} preset - 预设名称
 * @param {Object} overrides - 覆盖属性
 * @returns {string} HTML字符串
 */
function createPresetToggle(preset, overrides = {}) {
    const presetConfig = togglePresets[preset];
    if (!presetConfig) {
        throw new Error(`Unknown toggle preset: ${preset}`);
    }

    return toggleTemplate({ ...presetConfig, ...overrides });
}

module.exports = {
    toggleTemplate,
    togglePresets,
    createPresetToggle
};
