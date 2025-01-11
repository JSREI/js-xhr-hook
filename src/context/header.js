const {ContextLocation} = require("./context-location");

/**
 * 用于表示一个请求头或响应头
 */
class Header {

    constructor() {

        // HeaderLocation类型，用于表示这个头所处的位置
        this.location = ContextLocation.UNKNOWN;

        // 请求头的名称
        this.name = null;

        // 请求头的值
        this.value = null;

        // 此请求头或响应头是否是自定义的
        this.isCustom = null;
    }

}

module.exports = {
    Header
}
