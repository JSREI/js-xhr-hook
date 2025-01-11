const {getUnsafeWindow} = require("../../utils/scope-util");

// 持有一份最纯净的原型
const ancestorXMLHttpRequestHolder = getUnsafeWindow().XMLHttpRequest;

module.exports = {
    ancestorXMLHttpRequestHolder
}