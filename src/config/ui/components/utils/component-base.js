/**
 * 组件基类
 * 提供所有UI组件的基础功能
 */
class ComponentBase {
    constructor(options = {}) {
        this.options = { ...this.getDefaultOptions(), ...options };
        this.element = null;
        this.eventListeners = new Map();
        this.state = this.getInitialState();
        this.children = [];
        this.parent = null;
        this.isDestroyed = false;
    }

    /**
     * 获取默认选项
     * 子类应该重写此方法
     */
    getDefaultOptions() {
        return {};
    }

    /**
     * 获取初始状态
     * 子类应该重写此方法
     */
    getInitialState() {
        return {};
    }

    /**
     * 渲染组件
     * @param {HTMLElement} container - 容器元素
     * @returns {HTMLElement} 组件元素
     */
    render(container = null) {
        if (this.isDestroyed) {
            throw new Error('Cannot render destroyed component');
        }

        // 如果已经渲染过，先销毁
        if (this.element) {
            this.destroy();
        }

        // 创建组件元素
        this.element = this.createElement();
        
        // 绑定事件
        this.bindEvents();
        
        // 如果提供了容器，添加到容器中
        if (container) {
            container.appendChild(this.element);
        }

        // 触发渲染完成事件
        this.emit('rendered');

        return this.element;
    }

    /**
     * 创建组件元素
     * 子类必须实现此方法
     */
    createElement() {
        throw new Error('createElement method must be implemented by subclass');
    }

    /**
     * 绑定事件
     * 子类可以重写此方法
     */
    bindEvents() {
        // 默认实现为空
    }

    /**
     * 获取组件元素
     */
    getElement() {
        return this.element;
    }

    /**
     * 更新组件状态
     * @param {Object} newState - 新状态
     */
    setState(newState) {
        if (this.isDestroyed) {
            return;
        }

        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // 触发状态变化事件
        this.emit('stateChange', { oldState, newState: this.state });
        
        // 重新渲染
        this.update();
    }

    /**
     * 获取组件状态
     */
    getState() {
        return { ...this.state };
    }

    /**
     * 更新组件
     * 子类可以重写此方法来优化更新逻辑
     */
    update() {
        if (this.element && !this.isDestroyed) {
            const parent = this.element.parentNode;
            if (parent) {
                const newElement = this.createElement();
                parent.replaceChild(newElement, this.element);
                this.element = newElement;
                this.bindEvents();
            }
        }
    }

    /**
     * 添加事件监听器
     * @param {string} event - 事件名称
     * @param {Function} handler - 事件处理函数
     */
    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    /**
     * 移除事件监听器
     * @param {string} event - 事件名称
     * @param {Function} handler - 事件处理函数
     */
    off(event, handler) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    /**
     * 触发事件
     * @param {string} event - 事件名称
     * @param {*} data - 事件数据
     */
    emit(event, data = null) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            handlers.forEach(handler => {
                try {
                    handler.call(this, data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * 添加子组件
     * @param {ComponentBase} child - 子组件
     */
    addChild(child) {
        if (child instanceof ComponentBase) {
            this.children.push(child);
            child.parent = this;
        }
    }

    /**
     * 移除子组件
     * @param {ComponentBase} child - 子组件
     */
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
            child.parent = null;
        }
    }

    /**
     * 获取所有子组件
     */
    getChildren() {
        return [...this.children];
    }

    /**
     * 销毁组件
     */
    destroy() {
        if (this.isDestroyed) {
            return;
        }

        // 销毁所有子组件
        this.children.forEach(child => child.destroy());
        this.children = [];

        // 移除DOM元素
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        // 清理事件监听器
        this.eventListeners.clear();

        // 标记为已销毁
        this.isDestroyed = true;
        this.element = null;
        this.parent = null;

        // 触发销毁事件
        this.emit('destroyed');
    }

    /**
     * 检查组件是否已销毁
     */
    isDestroyed() {
        return this.isDestroyed;
    }
}

module.exports = { ComponentBase };
