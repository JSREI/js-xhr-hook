/**
 * 表示参数的类型
 *
 * @type {Readonly<{QUERY_STRING: symbol, FORM: symbol, XML: symbol, JSON: symbol, UNKNOWN: symbol}>}
 */
const ParamType = Object.freeze({

    // 未知，暂不支持的参数类型
    UNKNOWN: Symbol("UNKNOWN"),

    // 表单参数
    FORM: Symbol("FORM"),

    // 从query string中提取出来的参数
    QUERY_STRING: Symbol("QUERY_STRING"),

    // JSON类型的参数
    JSON: Symbol("JSON"),

    // XML参数
    XML: Symbol("XML"),
});

module.exports = {
    ParamType
}