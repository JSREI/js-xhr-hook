/**
 * URL相关的上下文
 */
class UrlContext {

    constructor() {

        this.rawUrl = null;

        // 请求的域名
        this.domain = null;

        // 端口
        this.port = null;

        // 协议
        this.protocol = null;

        // get参数
        this.queryString = null;

        // 请求路径
        this.requestPath = null;

        // 携带参数
        this.params = [];
    }

}

module.exports = {
    UrlContext
}
