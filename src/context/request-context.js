const {HeaderContext} = require("./header-context");
const {UrlContext} = require("./url-context");
const {BodyContext} = require("./body-context");
const {AuthContext} = require("./auth-context");
const {EventContext} = require("./event-context");

/**
 * 表示一个请求上下文
 */
class RequestContext {

    constructor() {

        this.method = null;

        // 请求的当前状态
        // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState
        this.readyState = XMLHttpRequest.UNSENT;

        this.isAsync = true;
        this.isAbortted = false;

        // 认证相关的上下文
        this.authContext = new AuthContext();

        // 事件上下文
        this.eventContext = new EventContext();

        this.urlContext = new UrlContext();

        // 请求携带的请求体
        this.bodyContext = new BodyContext();

        // 请求的请求头上下文
        this.headerContext = new HeaderContext();

    }

    /**
     * 获取请求中所有的上下文
     *
     * @return {*[]}
     */
    getParams() {
        const params = [];
        params.push(...this.urlContext.params);
        params.push(...this.bodyContext.params);
        return params;
    }

    /**
     *
     * @return {Header|null}
     */
    getContentTypeHeader() {
        return this.headerContext.getByName("content-type");
    }

    /**
     *
     * 判断请求体是否是json
     *
     * @return {boolean}
     */
    isJson() {
        // TODO
        const header = this.getContentTypeHeader();
        if (!header) {
            return false;
        }
        return header.value.toLowerCase().includes("application/json");
    }

    /**
     *
     * 判断请求体是否是表单
     *
     * @return {boolean}
     */
    isForm() {
        // TODO
        // return this.getContentType() === "multipart/form-data";

        const header = this.getContentTypeHeader();
        if (!header) {
            return false;
        }
        const contentType = header.value.toLowerCase();
        // TODO 2025-01-11 11:09:47 是否还有其它类型
        return contentType.includes("application/x-www-form-urlencoded;");
    }

    /**
     * 判断请求是否结束
     *
     * @return {boolean}
     */
    isRequestDone() {
        return this.readyState === XMLHttpRequest.DONE;
    }

}

module.exports = {
    RequestContext,
}