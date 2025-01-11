const {XhrContextParser} = require("../../../../parser/xhr-context-parser");
const {formatToUrl} = require("../../../../utils/url-util");

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

            try {
                // 从第三个参数开始是可选的
                const [method, url, isAsync, user, password] = argArray;

                const formattedUrl = formatToUrl(url);
                new XhrContextParser().updateWithUrl(xhrContext, formattedUrl);
                const requestContext = xhrContext.requestContext;
                requestContext.isAsync = isAsync;
                requestContext.method = method;
                // console.log("open " + url);
            } catch (e) {
                console.error(e);
            }

            // TODO 2025-01-11 00:18:43 断点测试

            return target.apply(xhrObject, argArray);
        }
    });
}

module.exports = {
    addOpenHook,
}