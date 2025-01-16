const {XhrContextParser} = require("../../../../parser/xhr-context-parser");
const {formatToUrl} = require("../../../../utils/url-util");
const {OpenMessage} = require("../../../../message-formatter/request/method/open-message");
const {AuthContext} = require("../../../../context/auth-context");

/**
 * 为open添加代理，以便在访问的时候能够拦截得到
 *
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @returns {Proxy<Function>}
 */
function addOpenHook(xhrObject, xhrContext) {
    return new Proxy(xhrObject.open, {
        apply(target, thisArg, argArray) {

            collectInformation(xhrObject, xhrContext, argArray);

            // TODO 2025-01-11 00:18:43 断点测试

            return target.apply(xhrObject, argArray);
        }
    });
}

/**
 * 收集请求上的信息
 *
 * @param xhrObject
 * @param xhrContext
 * @param argArray
 */
function collectInformation(xhrObject, xhrContext, argArray) {
    try {
        // 从第三个参数开始是可选的
        const [method, url, isAsync, username, password] = argArray;

        const formattedUrl = formatToUrl(url);
        new XhrContextParser().updateWithUrl(xhrContext, formattedUrl);
        const requestContext = xhrContext.requestContext;
        requestContext.isAsync = isAsync;
        requestContext.method = method;
        // console.log("open " + url);

        if (username || password) {
            requestContext.authContext = new AuthContext(username, password);
        }

        OpenMessage.print(xhrContext);

    } catch (e) {
        console.error(e);
    }
}


module.exports = {
    addOpenHook,
}