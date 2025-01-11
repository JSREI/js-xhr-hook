/**
 * 用于表示是在请求头还是在响应头里
 *
 * @type {Readonly<{REQUEST: symbol, UNKNOWN: symbol, RESPONSE: symbol}>}
 */
const ContextLocation = Object.freeze({

    // 未知
    UNKNOWN: Symbol("UNKNOWN"),

    // 在请求中
    REQUEST: Symbol("REQUEST"),

    // 在响应中
    RESPONSE: Symbol("RESPONSE"),

});

module.exports = {
    ContextLocation
}