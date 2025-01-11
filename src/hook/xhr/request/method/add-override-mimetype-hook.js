/**
 *
 *
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType
 *
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @returns {Proxy<Function>}
 */
function addOverrideMimeTypeHook(xhrObject, xhrContext) {
    return new Proxy(xhrObject.overrideMimeType, {
        apply(target, thisArg, argArray) {
            // TODO
            return target.apply(xhrObject, argArray);
        }
    });
}

module.exports = {
    addOverrideMimeTypeHook
}