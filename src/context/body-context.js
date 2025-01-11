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

    }

}

module.exports = {
    BodyContext
}