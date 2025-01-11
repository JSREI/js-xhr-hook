/**
 * onabort事件回调
 *
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @param eventCallbackFunction {Function}
 */
function addOnabortHook(xhrObject, xhrContext, eventCallbackFunction) {
    const _this = this;
    return xhrObject.onabort = () => {
        // TODO 检查上下文是否符合条件断点

        // 跟进去下面这个函数就是处理响应体的代码逻辑了
        if (eventCallbackFunction) {
            return eventCallbackFunction.apply(xhrObject, arguments);
        } else {
            return null;
        }
    }
}

module.exports = {
    addOnabortHook
}