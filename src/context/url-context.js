/**
 * UrlContext 类
 * 用于表示与 URL 相关的上下文信息。
 * 该类封装了 URL 的各个组成部分，方便对 URL 进行解析和操作。
 */
class UrlContext {

    /**
     * 构造函数
     * 初始化 UrlContext 实例，设置 URL 相关的属性。
     */
    constructor() {
        // 原始 URL，可以从这里获取到原始的完整的url字符串
        this.rawUrl = null;

        // 请求的域名
        this.domain = null;

        // 端口
        this.port = null;

        // 协议（如 http、https）
        this.protocol = null;

        // GET 请求的参数（查询字符串）
        this.queryString = null;

        // 请求路径（不包含域名和查询参数）
        this.requestPath = null;

        // 携带的参数（通常用于 POST 请求或其他请求方法）
        this.params = [];
    }

}

module.exports = {
    UrlContext
};