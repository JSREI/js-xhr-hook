const {UrlContext} = require("./url-context");
const {BodyContext} = require("./body-context");
const {HeaderContext} = require("./header-context");
const {ContentType} = require("./content-type");

/**
 * 响应上下文
 */
class ResponseContext {

    constructor() {

        // 响应状态码
        this.statusCode = null;

        // 可能会有重定向之类的？
        this.urlContext = new UrlContext();

        // 请求携带的请求体
        this.bodyContext = new BodyContext();

        // 请求的请求头上下文
        this.headerContext = new HeaderContext();
    }

    /**
     * 判断响应内容是否是JSON
     */
    isJson() {
        // TODO 2025-01-11 11:56:40 似乎拿不到相应，从请求推测？
        return this.bodyContext.contentType === ContentType.JSON;
    }

}

module.exports = {
    ResponseContext
}

