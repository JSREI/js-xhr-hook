const {Base64Codec} = require("../../../codec/commons/base64-codec/base64-codec");
const {UrlEncodeCodec} = require("../../../codec/commons/url-encode-codec/url-encode-codec");

/**
 *
 */
class UrlEncodeAnalyzer {

    /**
     *
     * @param requestContext {RequestContext}
     */
    static analyzeRequestContext(requestContext) {
        for (let param of requestContext.getParams()) {
            this.analyzeParam(param);
        }
    }

    /**
     *
     * @param responseContext {ResponseContext}
     */
    static analyzeResponseContext(responseContext) {
        // TODO 2025-01-11 16:30:41 分析响应中的url编码情况
        // 如果是json，则遍历json
        // 或者是整个返回的base64
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