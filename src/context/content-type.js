/**
 * 表示内容的类型
 *
 * @type {Readonly<{PLAINTEXT: symbol, XML: symbol, BINARY: symbol, JSON: symbol, UNKNOWN: symbol}>}
 */
const ContentType = Object.freeze({

    // 未知
    UNKNOWN: Symbol("UNKNOWN"),

    // 纯文本字符串
    PLAINTEXT: Symbol("PLAINTEXT"),

    // JSON字符串
    JSON: Symbol("JSON"),

    // XML格式
    XML: Symbol("XML"),

    // 二进制
    BINARY: Symbol("BINARY"),

    // 表单
    FORM: Symbol("FORM"),

    // HTML
    HTML: Symbol("HTML"),
});

module.exports = {
    ContentType
}