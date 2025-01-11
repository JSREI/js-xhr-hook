/**
 * 增加访问响应内容时的Hook
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @param {string} propertyName
 * @return {Proxy<T>}
 */
function addVisitResponsePropertyHook(xhrObject, xhrContext, propertyName) {

    // TODO 2025-01-10 23:28:25

    return xhrObject[propertyName];
}

module.exports = {
    addVisitResponsePropertyHook,
}