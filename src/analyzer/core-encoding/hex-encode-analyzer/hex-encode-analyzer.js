const {UrlEncodeCodec} = require("../../../codec/commons/url-encode-codec/url-encode-codec");
const {HexCodec} = require("../../../codec/commons/hex-codec/hex-codec");
const {Base64Codec} = require("../../../codec/commons/base64-codec/base64-codec");

/**
 *
 */
class HexEncodeAnalyzer {

    /**
     *
     * @param requestContext {RequestContext}
     */
    static analyzeRequestContext(requestContext) {

        // 请求参数
        for (let param of requestContext.getParams()) {
            this.analyzeParam(param);
        }

        // 请求体
        if (!HexCodec.isHex(requestContext.bodyContext.getRawBodyPlain())) {
            return;
        }
        requestContext.bodyContext.rawBodyHexDecode = HexCodec.decode(requestContext.bodyContext.getRawBodyPlain());
        requestContext.bodyContext.isRawBodyHex = true;
    }

    /**
     *
     * @param responseContext {ResponseContext}
     */
    static analyzeResponseContext(responseContext) {
        // TODO 2025-01-11 16:30:41 分析响应中的hex编码情况
        // 如果是json，则遍历json
        // 或者是整个返回的hex

        // 响应体
        if (!HexCodec.isHex(responseContext.bodyContext.getRawBodyPlain())) {
            return;
        }
        responseContext.bodyContext.rawBodyHexDecode = HexCodec.decode(responseContext.bodyContext.getRawBodyPlain());
        responseContext.bodyContext.isRawBodyHex = true;
    }

    /**
     * 分析param并设置相关字段
     *
     * @param param {Param}
     */
    static analyzeParam(param) {
        if (!HexCodec.isHex(param.getValuePlain())) {
            return;
        }
        param.isValueHex = HexCodec.decode(param.getValuePlain());
        param.valueHexDecode = true;
    }

}

module.exports = {
    HexEncodeAnalyzer
}