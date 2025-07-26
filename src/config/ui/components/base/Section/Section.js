/**
 * Section组件
 * 用于组织相关配置项的区域组件
 */

const { ComponentBase } = require('../../utils/component-base');
const { addStyles, createElement } = require('../../utils/dom-utils');
const { theme } = require('../../styles/theme');

const sectionStyles = `
    .ui-section {
        margin-bottom: ${theme.spacing.xl};
        padding: ${theme.spacing.lg};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.xl};
        background: ${theme.colors.surface};
    }
    
    .ui-section__header {
        margin-bottom: ${theme.spacing.lg};
        padding-bottom: ${theme.spacing.md};
        border-bottom: 1px solid ${theme.colors.divider};
    }
    
    .ui-section__title {
        font-family: ${theme.typography.fontFamily.sans.join(', ')};
        font-size: ${theme.typography.fontSize['2xl']};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.sm} 0;
    }
    
    .ui-section__description {
        font-size: ${theme.typography.fontSize.base};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.relaxed};
        margin: 0;
    }
    
    .ui-section__content {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.lg};
    }
    
    .ui-section__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${theme.spacing.md};
        padding: ${theme.spacing.md} 0;
    }
    
    .ui-section__item-info {
        flex: 1;
    }
    
    .ui-section__item-label {
        font-weight: ${theme.typography.fontWeight.medium};
        color: ${theme.colors.text};
        margin-bottom: ${theme.spacing[1]};
    }
    
    .ui-section__item-description {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.snug};
    }
    
    .ui-section__item-control {
        flex-shrink: 0;
    }
    
    .ui-section--collapsible .ui-section__header {
        cursor: pointer;
        user-select: none;
    }
    
    .ui-section--collapsed .ui-section__content {
        display: none;
    }
    
    .ui-section__toggle {
        margin-left: auto;
        transition: transform ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
    }
    
    .ui-section--collapsed .ui-section__toggle {
        transform: rotate(-90deg);
    }
`;

class Section extends ComponentBase {
    constructor(options = {}) {
        super(options);
        this.addStyles();
    }

    getDefaultOptions() {
        return {
            title: '',
            description: '',
            collapsible: false,
            collapsed: false,
            className: '',
            items: []
        };
    }

    getInitialState() {
        return {
            collapsed: this.options.collapsed
        };
    }

    addStyles() {
        if (!document.getElementById('ui-section-styles')) {
            addStyles(sectionStyles, 'ui-section-styles');
        }
    }

    createElement() {
        const classes = [
            'ui-section',
            this.options.collapsible ? 'ui-section--collapsible' : '',
            this.state.collapsed ? 'ui-section--collapsed' : '',
            this.options.className
        ].filter(Boolean).join(' ');

        const section = createElement('div', { className: classes });

        // 创建头部
        if (this.options.title || this.options.description) {
            const header = this.createHeader();
            section.appendChild(header);
        }

        // 创建内容区域
        const content = this.createContent();
        section.appendChild(content);

        return section;
    }

    createHeader() {
        const header = createElement('div', { className: 'ui-section__header' });

        if (this.options.title) {
            const title = createElement('h2', { className: 'ui-section__title' }, this.options.title);
            header.appendChild(title);

            if (this.options.collapsible) {
                const toggle = createElement('span', { className: 'ui-section__toggle' }, '▼');
                title.appendChild(toggle);
            }
        }

        if (this.options.description) {
            const description = createElement('p', { className: 'ui-section__description' }, this.options.description);
            header.appendChild(description);
        }

        return header;
    }

    createContent() {
        const content = createElement('div', { className: 'ui-section__content' });

        this.options.items.forEach(item => {
            const itemElement = this.createItem(item);
            content.appendChild(itemElement);
        });

        return content;
    }

    createItem(item) {
        const itemElement = createElement('div', { className: 'ui-section__item' });

        // 创建信息区域
        const info = createElement('div', { className: 'ui-section__item-info' });
        
        if (item.label) {
            const label = createElement('div', { className: 'ui-section__item-label' }, item.label);
            info.appendChild(label);
        }

        if (item.description) {
            const description = createElement('div', { className: 'ui-section__item-description' }, item.description);
            info.appendChild(description);
        }

        itemElement.appendChild(info);

        // 创建控件区域
        if (item.control) {
            const controlContainer = createElement('div', { className: 'ui-section__item-control' });
            
            if (item.control instanceof HTMLElement) {
                controlContainer.appendChild(item.control);
            } else if (typeof item.control === 'object' && item.control.render) {
                // 如果是组件实例
                item.control.render(controlContainer);
            }

            itemElement.appendChild(controlContainer);
        }

        return itemElement;
    }

    bindEvents() {
        if (!this.element) return;

        if (this.options.collapsible) {
            const header = this.element.querySelector('.ui-section__header');
            if (header) {
                header.addEventListener('click', this.handleToggle.bind(this));
            }
        }
    }

    handleToggle() {
        this.setState({ collapsed: !this.state.collapsed });
        this.emit('toggle', { collapsed: this.state.collapsed });
    }

    // 公共方法
    addItem(item) {
        this.options.items.push(item);
        const content = this.element.querySelector('.ui-section__content');
        if (content) {
            const itemElement = this.createItem(item);
            content.appendChild(itemElement);
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.options.items.length) {
            this.options.items.splice(index, 1);
            this.update();
        }
    }

    clearItems() {
        this.options.items = [];
        const content = this.element.querySelector('.ui-section__content');
        if (content) {
            content.innerHTML = '';
        }
    }

    expand() {
        if (this.options.collapsible) {
            this.setState({ collapsed: false });
        }
    }

    collapse() {
        if (this.options.collapsible) {
            this.setState({ collapsed: true });
        }
    }

    toggle() {
        if (this.options.collapsible) {
            this.handleToggle();
        }
    }

    isCollapsed() {
        return this.state.collapsed;
    }

    setTitle(title) {
        this.options.title = title;
        this.update();
    }

    setDescription(description) {
        this.options.description = description;
        this.update();
    }
}

module.exports = { Section };
