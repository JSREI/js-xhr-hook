/**
 * 增加访问响应头的Hook
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @param propertyName
 * @return {Proxy<T>}
 */
function addVisitResponseHeaderHook(xhrObject, xhrContext, propertyName) {
    return new Proxy(xhrObject[propertyName], {
        apply(target, thisArg, argArray) {

            // TODO 打印日志

            // TODO 断点测试
            return target[propertyName];
        }
    });
}

module.exports = {
    addVisitResponseHeaderHook,
}