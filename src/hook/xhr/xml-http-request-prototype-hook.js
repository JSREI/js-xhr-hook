const {ancestorXMLHttpRequestHolder} = require("./holder");
const {XMLHttpRequestObjectHook} = require("./xml-http-request-object-hook");
const {getUnsafeWindow} = require("../../utils/scope-util");

/**
 * Hook原型的方法
 */
class XMLHttpRequestPrototypeHook {

    addHook() {
        let XMLHttpRequestHolder = ancestorXMLHttpRequestHolder;
        let cachedProxyXHR = null;
        Object.defineProperty(getUnsafeWindow(), "XMLHttpRequest", {
            get: () => {
                if (!cachedProxyXHR) {
                    cachedProxyXHR = new Proxy(XMLHttpRequestHolder, {
                        // new XMLHttpRequest()的时候给替换掉返回的对象
                        construct(target, argArray, newTarget) {
                            const xhrObject = new XMLHttpRequestHolder();
                            return new XMLHttpRequestObjectHook(xhrObject).addHook();
                        },
                        // get(target, p, receiver) {
                        //     return target[p];
                        // },
                        // getPrototypeOf(target) {
                        //     // 应该如何Hook住对原型链的修改呢？
                        //     // TODO 当访问原型的时候将其拦截住，因为有些拦截器是通用在原型上添加的
                        //     debugger;
                        // }
                    });
                }
                return cachedProxyXHR;
            }, set: newValue => {
                // 缓存失效
                cachedProxyXHR = null;
                // 设置为新的值，可能会存在多层嵌套的情况
                XMLHttpRequestHolder = newValue;
            },
            configurable: true,
        });
    }

}

module.exports = {
    XMLHttpRequestPrototypeHook
}