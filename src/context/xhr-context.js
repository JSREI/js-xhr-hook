const {RequestContext} = require("./request-context"); // 引入请求上下文模块
const {ResponseContext} = require("./response-context"); // 引入响应上下文模块

/**
 * XhrContext 类
 * 用于表示一个 XMLHttpRequest (XHR) 请求的上下文。
 * 该类封装了请求和响应的上下文信息，方便对 XHR 请求进行管理和操作。
 *
 * 参考文档：
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
 */
class XhrContext {

    /**
     * 构造函数
     * 初始化 XhrContext 实例，创建请求上下文和响应上下文的实例。
     */
    constructor() {
        // 初始化请求上下文
        this.requestContext = new RequestContext();
        // 初始化响应上下文
        this.responseContext = new ResponseContext();
    }

}

// 导出 XhrContext 类
module.exports = {
    XhrContext
};