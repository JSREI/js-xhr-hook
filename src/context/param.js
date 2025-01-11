const {ParamType} = require("./param-type");
const {ContextLocation} = require("./context-location");

/**
 * 表示一个参数
 */
class Param {

    constructor() {

        // 表示参数的类型，参数是从哪里提取出来的
        this.paramType = ParamType.UNKNOWN;

        // 参数的位置
        this.paramLocation = ContextLocation.UNKNOWN;

        // 参数名称
        this.name = null;

        // 参数的值
        this.value = null;

        // 会分析一下value是否是url编码了
        this.isValueUrlEncode = false;
        // 如果是被url编码的话则会尝试对其进行解码
        this.valueUrlDecode = null;

        // 会分析一下value是否是使用base64编码了
        this.isValueBase64 = false;
        // 如果是的话，则会尝试解码一下
        this.valueBase64Decode = null;
    }

    /**
     * 尝试获取一个最干净最还原的value
     *
     * @return {null}
     */
    getValuePlain() {

        if (this.isValueBase64) {
            return this.valueBase64Decode;
        }

        if (this.isValueUrlEncode) {
            return this.valueUrlDecode;
        }

        return this.value;
    }


}

module.exports = {
    Param
}