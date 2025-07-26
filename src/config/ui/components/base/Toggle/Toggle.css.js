/**
 * Toggle组件样式
 */

const { theme } = require('../../styles/theme');

function getToggleStyles() {
    return `
    .ui-toggle {
        display: inline-flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        cursor: pointer;
        user-select: none;
    }
    
    .ui-toggle:focus-within {
        outline: 2px solid transparent;
        outline-offset: 2px;
    }
    
    .ui-toggle--disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    
    .ui-toggle__switch {
        position: relative;
        width: 48px;
        height: 24px;
        background: ${theme.colors.secondary[300]};
        border-radius: ${theme.borderRadius.full};
        transition: all ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
        cursor: pointer;
        border: 2px solid transparent;
    }
    
    .ui-toggle__switch:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${theme.colors.primary.main}40;
    }
    
    .ui-toggle__switch--checked {
        background: ${theme.colors.primary.main};
    }
    
    .ui-toggle__switch--disabled {
        cursor: not-allowed;
        background: ${theme.colors.secondary[200]};
    }
    
    .ui-toggle__switch--disabled.ui-toggle__switch--checked {
        background: ${theme.colors.primary[300]};
    }
    
    .ui-toggle__slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        transition: transform ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-toggle__switch--checked .ui-toggle__slider {
        transform: translateX(24px);
    }
    
    .ui-toggle__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
    }
    
    .ui-toggle__label {
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.medium};
        color: ${theme.colors.text};
        cursor: pointer;
    }
    
    .ui-toggle__label--disabled {
        cursor: not-allowed;
        color: ${theme.colors.textDisabled};
    }
    
    .ui-toggle__description {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        margin-top: ${theme.spacing[1]};
        line-height: ${theme.typography.lineHeight.snug};
    }
    
    /* 尺寸变体 */
    .ui-toggle--small .ui-toggle__switch {
        width: 36px;
        height: 20px;
    }
    
    .ui-toggle--small .ui-toggle__slider {
        width: 12px;
        height: 12px;
        top: 2px;
        left: 2px;
    }
    
    .ui-toggle--small .ui-toggle__switch--checked .ui-toggle__slider {
        transform: translateX(16px);
    }
    
    .ui-toggle--small .ui-toggle__label {
        font-size: ${theme.typography.fontSize.sm};
    }
    
    .ui-toggle--large .ui-toggle__switch {
        width: 60px;
        height: 30px;
    }
    
    .ui-toggle--large .ui-toggle__slider {
        width: 22px;
        height: 22px;
        top: 2px;
        left: 2px;
    }
    
    .ui-toggle--large .ui-toggle__switch--checked .ui-toggle__slider {
        transform: translateX(30px);
    }
    
    .ui-toggle--large .ui-toggle__label {
        font-size: ${theme.typography.fontSize.lg};
    }
    
    /* 颜色变体 */
    .ui-toggle--success .ui-toggle__switch--checked {
        background: ${theme.colors.success.main};
    }
    
    .ui-toggle--warning .ui-toggle__switch--checked {
        background: ${theme.colors.warning.main};
    }
    
    .ui-toggle--error .ui-toggle__switch--checked {
        background: ${theme.colors.error.main};
    }
    
    /* 标签位置 */
    .ui-toggle--label-left {
        flex-direction: row-reverse;
    }
    
    .ui-toggle--label-top {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .ui-toggle--label-bottom {
        flex-direction: column-reverse;
        align-items: flex-start;
    }
    
    /* 动画效果 */
    .ui-toggle__switch:active:not(.ui-toggle__switch--disabled) .ui-toggle__slider {
        transform: scale(1.1);
    }
    
    .ui-toggle__switch--checked:active:not(.ui-toggle__switch--disabled) .ui-toggle__slider {
        transform: translateX(24px) scale(1.1);
    }
    
    .ui-toggle--small .ui-toggle__switch--checked:active:not(.ui-toggle__switch--disabled) .ui-toggle__slider {
        transform: translateX(16px) scale(1.1);
    }
    
    .ui-toggle--large .ui-toggle__switch--checked:active:not(.ui-toggle__switch--disabled) .ui-toggle__slider {
        transform: translateX(30px) scale(1.1);
    }
    
    /* 加载状态 */
    .ui-toggle--loading .ui-toggle__slider {
        animation: ui-toggle-pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes ui-toggle-pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    /* 高对比度模式支持 */
    @media (prefers-contrast: high) {
        .ui-toggle__switch {
            border: 2px solid ${theme.colors.text};
        }
        
        .ui-toggle__switch--checked {
            border-color: ${theme.colors.primary.main};
        }
    }
    
    /* 减少动画模式支持 */
    @media (prefers-reduced-motion: reduce) {
        .ui-toggle__switch,
        .ui-toggle__slider {
            transition: none;
        }
        
        .ui-toggle--loading .ui-toggle__slider {
            animation: none;
        }
    }
`;
}

const toggleStyles = getToggleStyles();

module.exports = { toggleStyles };
