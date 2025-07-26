/**
 * Button组件样式
 */

const buttonStyles = `
    .ui-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
        border: none;
        border-radius: ${theme.borderRadius.lg};
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.medium};
        line-height: ${theme.typography.lineHeight.none};
        text-decoration: none;
        cursor: pointer;
        transition: all ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
        user-select: none;
        outline: none;
        position: relative;
        overflow: hidden;
    }
    
    .ui-button:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
    }
    
    .ui-button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
    }
    
    /* 按钮变体 */
    .ui-button--primary {
        background: ${theme.colors.primary.main};
        color: white;
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--primary:hover:not(:disabled) {
        background: ${theme.colors.primary.dark};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.md};
    }
    
    .ui-button--primary:focus {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main}40;
    }
    
    .ui-button--primary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--secondary {
        background: ${theme.colors.secondary.main};
        color: white;
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--secondary:hover:not(:disabled) {
        background: ${theme.colors.secondary.dark};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.md};
    }
    
    .ui-button--secondary:focus {
        box-shadow: 0 0 0 3px ${theme.colors.secondary.main}40;
    }
    
    .ui-button--secondary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--success {
        background: ${theme.colors.success.main};
        color: white;
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--success:hover:not(:disabled) {
        background: ${theme.colors.success.dark};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.md};
    }
    
    .ui-button--success:focus {
        box-shadow: 0 0 0 3px ${theme.colors.success.main}40;
    }
    
    .ui-button--error {
        background: ${theme.colors.error.main};
        color: white;
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--error:hover:not(:disabled) {
        background: ${theme.colors.error.dark};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.md};
    }
    
    .ui-button--error:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error.main}40;
    }
    
    .ui-button--outline {
        background: transparent;
        color: ${theme.colors.primary.main};
        border: 1px solid ${theme.colors.primary.main};
        box-shadow: none;
    }
    
    .ui-button--outline:hover:not(:disabled) {
        background: ${theme.colors.primary.main};
        color: white;
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.sm};
    }
    
    .ui-button--outline:focus {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main}20;
    }
    
    .ui-button--ghost {
        background: transparent;
        color: ${theme.colors.text};
        box-shadow: none;
    }
    
    .ui-button--ghost:hover:not(:disabled) {
        background: ${theme.colors.secondary[100]};
        transform: translateY(-1px);
    }
    
    .ui-button--ghost:focus {
        box-shadow: 0 0 0 3px ${theme.colors.secondary.main}20;
    }
    
    /* 按钮尺寸 */
    .ui-button--small {
        padding: ${theme.spacing.2} ${theme.spacing.4};
        font-size: ${theme.typography.fontSize.sm};
    }
    
    .ui-button--medium {
        padding: ${theme.spacing.3} ${theme.spacing.6};
        font-size: ${theme.typography.fontSize.base};
    }
    
    .ui-button--large {
        padding: ${theme.spacing.4} ${theme.spacing.8};
        font-size: ${theme.typography.fontSize.lg};
    }
    
    /* 全宽按钮 */
    .ui-button--full-width {
        width: 100%;
    }
    
    /* 圆形按钮 */
    .ui-button--round {
        border-radius: ${theme.borderRadius.full};
    }
    
    /* 加载状态 */
    .ui-button--loading {
        pointer-events: none;
    }
    
    .ui-button__spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: ui-button-spin 1s linear infinite;
    }
    
    @keyframes ui-button-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* 图标按钮 */
    .ui-button--icon-only {
        padding: ${theme.spacing.3};
        width: auto;
        height: auto;
        aspect-ratio: 1;
    }
    
    .ui-button__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
    }
    
    .ui-button__icon svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
    
    /* 波纹效果 */
    .ui-button__ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ui-button-ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ui-button-ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
}

const buttonStyles = getButtonStyles();

module.exports = { buttonStyles };
