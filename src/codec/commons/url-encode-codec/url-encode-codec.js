/**
 *
 */
class UrlEncodeCodec {

    /**
     * 判断字符串是否已被 URL 编码
     * @param value {string}
     * @return {boolean}
     */
    static isEncode(value) {
        if (!value) {
            return false;
        }
        // URL 编码的字符串通常包含 % 符号
        return typeof value === 'string' && /%[0-9A-Fa-f]{2}/.test(value);
    }

    /**
     * 对字符串进行 URL 编码
     * @param value {string}
     * @return {string}
     */
    static encode(value) {
        if (typeof value !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return encodeURIComponent(value);
    }

    /**
     * 对 URL 编码的字符串进行解码
     * @param value {string}
     * @return {string}
     */
    static decode(value) {
        if (typeof value !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return decodeURIComponent(value);
    }
}

module.exports = {
    UrlEncodeCodec
};