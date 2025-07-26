const {addOnreadystatechangeHook} = require("../../response/attribute/add-onreadystatechange-hook");
const {ResponseContextParser} = require("../../../../parser/response-context-parser");
const {UrlEncodeAnalyzer} = require("../../../../analyzer/core-encoding/url-encode-analyzer/url-encode-analyzer");
const {HexEncodeAnalyzer} = require("../../../../analyzer/core-encoding/hex-encode-analyzer/hex-encode-analyzer");
const {Base64Analyzer} = require("../../../../analyzer/core-encoding/base64-analyzer/base64-analyzer");
const {RsaAnalyzer} = require("../../../../analyzer/encrypt/rsa/rsa-analyzer");

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
            const [eventName, eventFunction] = argArray;
            try {
                const event = new Event(eventName, eventFunction);
                xhrContext.requestContext.eventContext.addEvent(event);
            } catch (e) {
                console.error(e);
            }

            // TODO 2023-1-3 01:21:21 断点测试

            // 根据不同的事件名称有不同的处理逻辑
            try {
                switch (eventName) {
                    case "readystatechange":
                        // 设置的是请求回调方法
                        addReadystatechangeEventHook(target, xhrObject, xhrContext, argArray);
                        break;
                    default:
                        // 默认情况下就直接添加事件回调
                        return target.apply(xhrObject, argArray);
                }
            } catch (e) {
                console.error(e);
            }

        }
    });
}

/**
 *
 * @param proxyTarget
 * @param xhrObject
 * @param xhrContext
 * @param argArray
 */
function addReadystatechangeEventHook(proxyTarget, xhrObject, xhrContext, argArray) {
    const [eventName, eventFunction] = argArray;
    argArray[1] = function () {

        try {
            xhrContext.requestContext.readyState = xhrObject.readyState;
            if (xhrContext.requestContext.isRequestDone()) {
                debugger;

                const responseContext = xhrContext.responseContext = new ResponseContextParser().parse(xhrObject, xhrContext);

                // 分析响应中的各种编码
                UrlEncodeAnalyzer.analyzeResponseContext(xhrContext.responseContext);
                HexEncodeAnalyzer.analyzeResponseContext(xhrContext.responseContext);
                Base64Analyzer.analyzeResponseContext(xhrContext.responseContext);

                // 响应体是整个编码的：
                // https://jzsc.mohurd.gov.cn/data/company
                //

                // // TODO 2025-01-11 12:47:38 临时测试
                // console.log("done " + responseContext.urlContext.rawUrl);
                // if (xhrContext.requestContext.urlContext.rawUrl.includes("login/key")) {
                //     debugger;
                // }

                const rsaContext = new RsaAnalyzer().analyze(xhrContext);
                if (rsaContext) {
                    debugger;
                }

            }
        } catch (e) {
            console.error(e);
        }

        eventFunction.apply(xhrObject, arguments);
    };
    proxyTarget.apply(xhrObject, argArray);
}

module.exports = {
    addAddEventListenerHook,
}