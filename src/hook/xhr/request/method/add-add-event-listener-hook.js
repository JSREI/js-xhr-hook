/**
 * 为XHR添加事件响应函数时将被拦截到
 *
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @return {Proxy<Function>}
 */
function addAddEventListenerHook(xhrObject, xhrContext) {
    return new Proxy(xhrObject.addEventListener, {
        apply(target, thisArg, argArray) {

            // 记录事件状态
            try{
                const [eventName, eventFunction] = argArray;
                const event = new Event(eventName, eventFunction);
                xhrContext.requestContext.eventContext.addEvent(event);
                debugger;
            } catch (e) {
                console.error(e);
            }

            // TODO 2023-1-3 01:21:21 断点测试
            try {

                // switch (eventName) {
                //     case "readystatechange":
                //     // TODO
                // }
            } catch (e) {
                console.error(e);
            }

            return target.apply(xhrObject, argArray);
        }
    });
}

module.exports = {
    addAddEventListenerHook,
}