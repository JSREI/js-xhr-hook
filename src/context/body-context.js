const {ContextLocation} = require("./context-location");
const {ContentType} = require("./content-type");

/**
 * 表示一个请求体或者响应体
 */
class BodyContext {

    constructor() {

        // ContextLocation，表示是请求体还是响应体
        this.location = ContextLocation.UNKNOWN;

        // 原始的请求体或者响应体内容，因为有时候可能会是二进制的
        this.rawBody = null;
        this.rawBodyText = null;

        // ContentType, 内容的类型
        this.contentType = ContentType.UNKNOWN;

        // 如果是请求体的话，则在此处携带请求体里的参数
        this.params = [];

        // 如果是json类型的话，则解析json对象放在这里
        this.object = {};


        // 会分析一下rawBody是否是url编码了
        this.isRawBodyUrlEncode = false;
        // 如果是被url编码的话则会尝试对其进行解码
        this.rawBodyUrlDecode = null;

        // 会分析一下rawBody是否是使用hex编码了
        this.isRawBodyHex = false;
        // 如果是的话，则会尝试解码一下
        this.rawBodyHexDecode = null;

        // 会分析一下rawBody是否是使用base64编码了
        this.isRawBodyBase64 = false;
        // 如果是的话，则会尝试解码一下
        this.rawBodyBase64Decode = null;

    }

    /**
     *
     * @return {null}
     */
    getRawBodyPlain() {

        if (this.isRawBodyBase64) {
            return this.rawBodyBase64Decode;
        }

        if (this.isRawBodyHex) {
            return this.rawBodyHexDecode;
        }

        if (this.isRawBodyUrlEncode) {
            return this.rawBodyUrlDecode;
        }

        return this.rawBody;
    }

}

module.exports = {
    BodyContext
}