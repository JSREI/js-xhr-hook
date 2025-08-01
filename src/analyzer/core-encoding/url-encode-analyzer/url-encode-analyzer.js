const {UrlEncodeCodec} = require("../../../codec/commons/url-encode-codec/url-encode-codec");
const {HexCodec} = require("../../../codec/commons/hex-codec/hex-codec");

/**
 *
 */
class UrlEncodeAnalyzer {

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
        if (!UrlEncodeCodec.isEncode(requestContext.bodyContext.getRawBodyPlain())) {
            return;
        }
        requestContext.bodyContext.rawBodyHexDecode = UrlEncodeCodec.decode(requestContext.bodyContext.getRawBodyPlain());
        requestContext.bodyContext.isRawBodyHex = true;
    }

    /**
     *
     * @param responseContext {ResponseContext}
     */
    static analyzeResponseContext(responseContext) {
        // TODO 2025-01-11 16:30:41 分析响应中的url编码情况
        // 如果是json，则遍历json
        // 或者是整个返回的base64

        // 响应体
        if (!UrlEncodeCodec.isEncode(responseContext.bodyContext.getRawBodyPlain())) {
            return;
        }
        responseContext.bodyContext.rawBodyHexDecode = UrlEncodeCodec.decode(responseContext.bodyContext.getRawBodyPlain());
        responseContext.bodyContext.isRawBodyHex = true;
    }

    /**
     * 分析param并设置相关字段
     *
     * @param param {Param}
     */
    static analyzeParam(param) {
        if (!UrlEncodeCodec.isEncode(param.value)) {
            return;
        }
        param.valueUrlDecode = UrlEncodeCodec.decode(param.value);
        param.isValueUrlEncode = true;
    }

}

module.exports = {
    UrlEncodeAnalyzer
}