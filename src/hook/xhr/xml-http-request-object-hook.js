const {XhrContext} = require("../../context/xhr-context");
const {addSendHook} = require("./request/method/add-send-hook");
const {addVisitResponseHeaderHook} = require("./response/attribute/add-visit-response-header-hook");
const {addOpenHook} = require("./request/method/add-open-hook");
const {addSetRequestHeaderHook} = require("./request/method/add-set-request-header-hook");
const {addAbortHook} = require("./request/method/add-abort-hook");
const {addOverrideMimeTypeHook} = require("./request/method/add-override-mimetype-hook");
const {addOnreadystatechangeHook} = require("./response/attribute/add-onreadystatechange-hook");
const {addAddEventListenerHook} = require("./request/method/add-add-event-listener-hook");
const {addVisitResponsePropertyHook} = require("./response/attribute/add-visit-response-property-hook");
const {addOnabortHook} = require("./request/attribute/add-on-abort-hook");

/**
 * 为XHR对象添加Hook
 */
class XMLHttpRequestObjectHook {

    /**
     *
     * @param xhrObject {XMLHttpRequest}
     */
    constructor(xhrObject) {
        this.xhrObject = xhrObject;
        this.xhrContext = new XhrContext();
    }

    /**
     *
     * @return {Proxy<Function>|XMLHttpRequest|((mime: string) => void)|(() => void)|(function(): (*|null))|*|boolean}
     */
    addHook() {
        const _this = this;
        return new Proxy(this.xhrObject, {
            get(target, p, receiver) {
                switch (p) {

                    // 请求相关的方法

                    case "open":
                        return addOpenHook(_this.xhrObject, _this.xhrContext);
                    case "send":
                        return addSendHook(_this.xhrObject, _this.xhrContext);
                    case "setRequestHeader":
                        return addSetRequestHeaderHook(_this.xhrObject, _this.xhrContext);
                    case "abort":
                        return addAbortHook(_this.xhrObject, _this.xhrContext);
                    case "overrideMimeType":
                        return addOverrideMimeTypeHook(_this.xhrObject, _this.xhrContext);

                    // 请求相关的属性

                    // 这几个属性就忽略不再拦截了
                    case "readyState":
                    case "timeout":
                    case "upload":
                    case "withCredentials":
                        return target[p];

                    // 响应相关的方法
                    case "getAllResponseHeaders":
                    case "getResponseHeader":
                        return addVisitResponseHeaderHook(_this.xhrObject, _this.xhrContext, p);
                    // 响应相关的属性
                    case "response":
                    case "responseText":
                    case "responseType":
                    case "responseURL":
                    case "responseXML":
                        return addVisitResponsePropertyHook(_this.xhrObject, _this.xhrContext, p);
                    case "status":
                    case "statusText":
                        return target[p];
                    // 事件处理，搞一个专门的单元来处理，添加事件可以通过addEventListener
                    // 也可以直接on+事件名称，所以要把两种情况都覆盖住
                    case "addEventListener":
                        return addAddEventListenerHook(_this.xhrObject, _this.xhrContext);

                    default:
                        // 其它情况就不拦截了，直接放行
                        return target[p];
                }
            }, set(target, p, value, receiver) {
                switch (p) {
                    case "onabort":
                        return addOnabortHook(_this.xhrObject, _this.xhrContext);
                    case "onerror":
                    case "onload":
                    case "onloadend":
                    case "onloadstart":
                    case "onprogress":
                    case "ontimeout":
                        // TODO 2025-01-11 15:21:44 锁定超时时间，这样在断点长时间分析的时候不至于一直失败
                        target[p] = value;
                        return true;
                    case "onreadystatechange":
                        return addOnreadystatechangeHook(_this.xhrObject, _this.xhrContext, value);
                    // case "withCredentials":
                    //     // 设置携带凭证的时候拦截一下
                    //     return _this.addWithCredentialsHook();
                    default:
                        // 默认情况下就直接赋值，不再尝试Hook
                        target[p] = value;
                        return true;
                }
            }
        });
    }

}

module.exports = {
    XMLHttpRequestObjectHook
}