/**
 *
 * 拦截 abort() 方法
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @returns {Proxy<Function>}
 */
function addAbortHook(xhrObject, xhrContext) {
    const _this = this;
    return new Proxy(xhrObject.abort, {
        apply(target, thisArg, argArray) {

            // 设置请求状态
            xhrContext.requestContext.isAbortted = true;

            // TODO 2025-01-11 00:11:30 断点测试

            return target.apply(xhrObject, argArray);
        }
    });
}

module.exports = {
    addAbortHook
}