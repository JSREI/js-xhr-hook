/**
 * DOM操作工具函数
 */

/**
 * 创建DOM元素
 * @param {string} tagName - 标签名
 * @param {Object} attributes - 属性对象
 * @param {string|HTMLElement|Array} children - 子元素
 * @returns {HTMLElement}
 */
function createElement(tagName, attributes = {}, children = null) {
    const element = document.createElement(tagName);
    
    // 设置属性
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            // 事件监听器
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // 添加子元素
    if (children) {
        appendChildren(element, children);
    }
    
    return element;
}

/**
 * 添加子元素
 * @param {HTMLElement} parent - 父元素
 * @param {string|HTMLElement|Array} children - 子元素
 */
function appendChildren(parent, children) {
    if (Array.isArray(children)) {
        children.forEach(child => appendChildren(parent, child));
    } else if (typeof children === 'string') {
        parent.appendChild(document.createTextNode(children));
    } else if (children instanceof HTMLElement) {
        parent.appendChild(children);
    }
}

/**
 * 添加CSS样式到页面
 * @param {string} css - CSS字符串
 * @param {string} id - 样式ID（可选）
 * @returns {HTMLStyleElement}
 */
function addStyles(css, id = null) {
    const style = document.createElement('style');
    style.textContent = css;
    
    if (id) {
        style.id = id;
        // 如果已存在相同ID的样式，先移除
        const existing = document.getElementById(id);
        if (existing) {
            existing.remove();
        }
    }
    
    document.head.appendChild(style);
    return style;
}

/**
 * 移除CSS样式
 * @param {string} id - 样式ID
 */
function removeStyles(id) {
    const style = document.getElementById(id);
    if (style) {
        style.remove();
    }
}

/**
 * 查找最近的父元素
 * @param {HTMLElement} element - 起始元素
 * @param {string} selector - CSS选择器
 * @returns {HTMLElement|null}
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    
    // 兼容性实现
    let current = element;
    while (current && current.nodeType === 1) {
        if (current.matches && current.matches(selector)) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}

/**
 * 添加CSS类
 * @param {HTMLElement} element - 元素
 * @param {string|Array} classNames - 类名
 */
function addClass(element, classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => element.classList.add(className));
    } else {
        element.classList.add(classNames);
    }
}

/**
 * 移除CSS类
 * @param {HTMLElement} element - 元素
 * @param {string|Array} classNames - 类名
 */
function removeClass(element, classNames) {
    if (Array.isArray(classNames)) {
        classNames.forEach(className => element.classList.remove(className));
    } else {
        element.classList.remove(classNames);
    }
}

/**
 * 切换CSS类
 * @param {HTMLElement} element - 元素
 * @param {string} className - 类名
 * @param {boolean} force - 强制添加或移除
 */
function toggleClass(element, className, force = undefined) {
    return element.classList.toggle(className, force);
}

/**
 * 检查元素是否包含CSS类
 * @param {HTMLElement} element - 元素
 * @param {string} className - 类名
 * @returns {boolean}
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}

/**
 * 设置元素属性
 * @param {HTMLElement} element - 元素
 * @param {Object} attributes - 属性对象
 */
function setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

/**
 * 获取元素属性
 * @param {HTMLElement} element - 元素
 * @param {string} attribute - 属性名
 * @returns {string|null}
 */
function getAttribute(element, attribute) {
    return element.getAttribute(attribute);
}

/**
 * 移除元素属性
 * @param {HTMLElement} element - 元素
 * @param {string|Array} attributes - 属性名
 */
function removeAttributes(element, attributes) {
    if (Array.isArray(attributes)) {
        attributes.forEach(attr => element.removeAttribute(attr));
    } else {
        element.removeAttribute(attributes);
    }
}

/**
 * 清空元素内容
 * @param {HTMLElement} element - 元素
 */
function empty(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * 获取元素的计算样式
 * @param {HTMLElement} element - 元素
 * @param {string} property - 样式属性
 * @returns {string}
 */
function getComputedStyle(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * 检查元素是否在视口中
 * @param {HTMLElement} element - 元素
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 平滑滚动到元素
 * @param {HTMLElement} element - 目标元素
 * @param {Object} options - 滚动选项
 */
function scrollToElement(element, options = {}) {
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    element.scrollIntoView({ ...defaultOptions, ...options });
}

module.exports = {
    createElement,
    appendChildren,
    addStyles,
    removeStyles,
    closest,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    setAttributes,
    getAttribute,
    removeAttributes,
    empty,
    getComputedStyle,
    isInViewport,
    scrollToElement
};
