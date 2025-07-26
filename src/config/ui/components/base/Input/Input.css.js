/**
 * Input组件样式
 */

const { theme } = require('../../styles/theme');

function getInputStyles() {
    return `
    .ui-input {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing[1]};
    }
    
    .ui-input__label {
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.medium};
        color: ${theme.colors.text};
        margin-bottom: ${theme.spacing[1]};
    }
    
    .ui-input__label--required::after {
        content: ' *';
        color: ${theme.colors.error.main};
    }
    
    .ui-input__wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .ui-input__field {
        width: 100%;
        padding: ${theme.spacing[3]} ${theme.spacing[4]};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.lg};
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize.base};
        line-height: ${theme.typography.lineHeight.normal};
        color: ${theme.colors.text};
        background: ${theme.colors.background};
        transition: all ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
        outline: none;
    }
    
    .ui-input__field::placeholder {
        color: ${theme.colors.textSecondary};
    }
    
    .ui-input__field:focus {
        border-color: ${theme.colors.primary.main};
        box-shadow: 0 0 0 3px ${theme.colors.primary.main}20;
    }
    
    .ui-input__field:disabled {
        background: ${theme.colors.secondary[100]};
        color: ${theme.colors.textDisabled};
        cursor: not-allowed;
    }
    
    .ui-input__field:read-only {
        background: ${theme.colors.secondary[50]};
        cursor: default;
    }
    
    /* 状态变体 */
    .ui-input--error .ui-input__field {
        border-color: ${theme.colors.error.main};
    }
    
    .ui-input--error .ui-input__field:focus {
        border-color: ${theme.colors.error.main};
        box-shadow: 0 0 0 3px ${theme.colors.error.main}20;
    }
    
    .ui-input--success .ui-input__field {
        border-color: ${theme.colors.success.main};
    }
    
    .ui-input--success .ui-input__field:focus {
        border-color: ${theme.colors.success.main};
        box-shadow: 0 0 0 3px ${theme.colors.success.main}20;
    }
    
    .ui-input--warning .ui-input__field {
        border-color: ${theme.colors.warning.main};
    }
    
    .ui-input--warning .ui-input__field:focus {
        border-color: ${theme.colors.warning.main};
        box-shadow: 0 0 0 3px ${theme.colors.warning.main}20;
    }
    
    /* 尺寸变体 */
    .ui-input--small .ui-input__field {
        padding: ${theme.spacing[2]} ${theme.spacing[3]};
        font-size: ${theme.typography.fontSize.sm};
    }
    
    .ui-input--large .ui-input__field {
        padding: ${theme.spacing[4]} ${theme.spacing[5]};
        font-size: ${theme.typography.fontSize.lg};
    }
    
    /* 图标支持 */
    .ui-input--with-icon-left .ui-input__field {
        padding-left: ${theme.spacing[10]};
    }
    
    .ui-input--with-icon-right .ui-input__field {
        padding-right: ${theme.spacing[10]};
    }
    
    .ui-input__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        color: ${theme.colors.textSecondary};
        pointer-events: none;
    }
    
    .ui-input__icon--left {
        left: ${theme.spacing[3]};
    }
    
    .ui-input__icon--right {
        right: ${theme.spacing[3]};
    }
    
    .ui-input__icon svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
    
    /* 帮助文本 */
    .ui-input__help {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.snug};
    }
    
    .ui-input--error .ui-input__help {
        color: ${theme.colors.error.main};
    }
    
    .ui-input--success .ui-input__help {
        color: ${theme.colors.success.main};
    }
    
    .ui-input--warning .ui-input__help {
        color: ${theme.colors.warning.main};
    }
    
    /* 计数器 */
    .ui-input__counter {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        text-align: right;
        margin-top: ${theme.spacing[1]};
    }
    
    .ui-input__counter--over-limit {
        color: ${theme.colors.error.main};
    }
    
    /* 清除按钮 */
    .ui-input__clear {
        position: absolute;
        right: ${theme.spacing[3]};
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: none;
        border: none;
        cursor: pointer;
        color: ${theme.colors.textSecondary};
        opacity: 0;
        transition: opacity ${theme.animation.duration.fast} ${theme.animation.easing.easeInOut};
    }
    
    .ui-input__wrapper:hover .ui-input__clear,
    .ui-input__field:focus + .ui-input__clear {
        opacity: 1;
    }
    
    .ui-input__clear:hover {
        color: ${theme.colors.text};
    }
    
    .ui-input__clear svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
    
    /* 密码显示切换 */
    .ui-input__password-toggle {
        position: absolute;
        right: ${theme.spacing[3]};
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: none;
        border: none;
        cursor: pointer;
        color: ${theme.colors.textSecondary};
    }
    
    .ui-input__password-toggle:hover {
        color: ${theme.colors.text};
    }
    
    .ui-input__password-toggle svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
    
    /* 文本域特殊样式 */
    .ui-input__field--textarea {
        resize: vertical;
        min-height: 80px;
        line-height: ${theme.typography.lineHeight.relaxed};
    }
    
    .ui-input__field--textarea.ui-input__field--no-resize {
        resize: none;
    }
    
    /* 数字输入框 */
    .ui-input__field[type="number"] {
        -moz-appearance: textfield;
    }
    
    .ui-input__field[type="number"]::-webkit-outer-spin-button,
    .ui-input__field[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    /* 搜索输入框 */
    .ui-input__field[type="search"] {
        -webkit-appearance: none;
    }
    
    .ui-input__field[type="search"]::-webkit-search-decoration,
    .ui-input__field[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
    
    /* 高对比度模式支持 */
    @media (prefers-contrast: high) {
        .ui-input__field {
            border-width: 2px;
        }
        
        .ui-input__field:focus {
            border-width: 3px;
        }
    }
    
    /* 减少动画模式支持 */
    @media (prefers-reduced-motion: reduce) {
        .ui-input__field {
            transition: none;
        }
    }
`;
}

const inputStyles = getInputStyles();

module.exports = { inputStyles };
