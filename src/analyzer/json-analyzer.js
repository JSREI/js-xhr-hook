class JsonAnalyzer {

    /**
     * 深度遍历 JSON 对象
     * @param obj {Object} 要遍历的对象
     * @param callback {Function} 回调函数，接收 name、path 和 value
     * @param path {string} 当前路径（用于递归）
     */
    deepTraverse(obj, callback, path = '') {
        if (typeof obj === 'object' && obj !== null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newPath = path ? `${path}.${key}` : key; // 构建当前路径
                    this.deepTraverse(obj[key], callback, newPath); // 递归遍历
                }
            }
        } else {
            // 如果是基本类型（非对象），调用回调函数
            const name = path.split('.').pop(); // 从路径中提取当前键名
            callback(name, path, obj);
        }
    }

}

module.exports = {
    JsonAnalyzer
};