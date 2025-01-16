const {Header} = require("../../../../context/header");
const {ContextLocation} = require("../../../../context/context-location");
const {HeaderParser} = require("../../../../parser/header-parser");
const {DebuggerTester} = require("../../../../debuggers/debugger-tester");


/**
 * 设置请求头的时候拦截一下
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @returns {Proxy<Function>}
 */
function addSetRequestHeaderHook(xhrObject, xhrContext) {
    return new Proxy(xhrObject.setRequestHeader, {
        apply(target, thisArg, argArray) {

            // 收集设置的请求头信息
            collectInformation(xhrObject, xhrContext, argArray);

            // 测试断点是否命中
            DebuggerTester.test(xhrContext);

            // 把属性真正设置上
            return target.apply(xhrObject, argArray);
        }
    });
}

/**
 *
 * 采集请求上的信息
 *
 * @param xhrObject
 * @param xhrContext
 * @param argArray
 */
function collectInformation(xhrObject, xhrContext, argArray) {
    try {

        // 设置的请求头的名字和值，名字和值都是字符串类型
        const [requestHeaderName, requestHeaderValue] = argArray;

        const header = new Header();
        header.location = ContextLocation.REQUEST;
        header.isCustom = !new HeaderParser().isStandardHeader(requestHeaderName);
        header.name = requestHeaderName;
        header.value = requestHeaderValue;
        xhrContext.requestContext.headerContext.headers.push(header);

        // 测试网站：
        // https://liuyan.people.com.cn/threads/list?fid=5050&formName=%E5%A4%96%E4%BA%A4%E9%83%A8%E9%83%A8%E9%95%BF%E7%8E%8B%E6%AF%85&position=1
        // TODO 2025-01-10 23:35:24 断点测试
        if (header.isCustom) {
            console.log("设置了自定义请求头： " + header.name + ":" + header.value);
        }

    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    addSetRequestHeaderHook,
}