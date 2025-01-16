const {ResponseContextParser} = require("../../../../parser/response-context-parser");
const {XhrContext} = require("../../../../context/xhr-context");
const {RsaAnalyzer} = require("../../../../analyzer/encrypt/rsa/rsa-analyzer");
const {UrlEncodeAnalyzer} = require("../../../../analyzer/core-encoding/url-encode-analyzer/url-encode-analyzer");
const {Base64Analyzer} = require("../../../../analyzer/core-encoding/base64-analyzer/base64-analyzer");
const {HexEncodeAnalyzer} = require("../../../../analyzer/core-encoding/hex-encode-analyzer/hex-encode-analyzer");

/**
 * 在设置 onreadystatechange 的时候替换为自己的函数
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readystatechange_event
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @param callbackFunction
 */
function addOnreadystatechangeHook(xhrObject, xhrContext, callbackFunction) {

    // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readystatechange_event
    return xhrObject.onreadystatechange = () => {

        try {
            const [event] = arguments;
            xhrContext.requestContext.readyState = xhrObject.readyState;
            if (xhrContext.requestContext.isRequestDone()) {
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

        // 跟进去下面这个函数就是处理响应体的代码逻辑了
        if (callbackFunction) {
            return callbackFunction.apply(xhrObject, arguments);
        } else {
            return null;
        }
    }
}

module.exports = {
    addOnreadystatechangeHook
}