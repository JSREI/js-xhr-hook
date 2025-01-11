const {ResponseContext} = require("../context/response-context");
const {Header} = require("../context/header");
const {ContextLocation} = require("../context/context-location");
const {UrlContextParser} = require("./url-context-parser");
const {ResponseBodyParser} = require("./response-body-parser");

/**
 * 解析响应
 */
class ResponseContextParser {

    /**
     * 解析 XHR 对象并填充 ResponseContext
     * @param {XMLHttpRequest} xhrObject - XHR 对象
     * @param {object} xhrContext - XHR 上下文（可选）
     * @return {ResponseContext} - 填充后的 ResponseContext 对象
     */
    parse(xhrObject, xhrContext) {
        const responseContext = new ResponseContext();

        // 设置响应状态码
        responseContext.statusCode = xhrObject.status;

        // URL
        responseContext.urlContext = new UrlContextParser().parse(xhrObject.responseURL);

        // 设置请求头上下文
        const headers = xhrObject.getAllResponseHeaders();
        if (headers) {
            const headerLines = headers.trim().split(/[\r\n]+/);
            headerLines.forEach(line => {
                const [key, value] = line.split(": ");
                const header = new Header();
                header.location = ContextLocation.RESPONSE;
                header.isCustom = false;
                header.name = key;
                header.value = value;
                responseContext.headerContext.headers.push(header);
            });
        }

        // 解析响应体
        responseContext.bodyContext = new ResponseBodyParser().parse(xhrObject, xhrContext);

        return responseContext;
    }

}

module.exports = {
    ResponseContextParser
};