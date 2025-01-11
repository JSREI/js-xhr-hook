const {Param} = require("../../../context/param");
const {Base64Codec} = require("../../../codec/commons/base64-codec/base64-codec");
const {RequestContext} = require("../../../context/request-context");
const {ResponseContext} = require("../../../context/response-context");

/**
 *
 */
class Base64Analyzer {

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
        // TODO 2025-01-11 16:30:41 分析响应中的base64情况
        // 如果是json，则遍历json
        // 或者是整个返回的base64
    }

    /**
     * 分析param并设置相关字段
     *
     * @param param {Param}
     */
    static analyzeParam(param) {
        if (!Base64Codec.isBase64(param.getValuePlain())) {
            return;
        }
        param.valueBase64Decode = Base64Codec.decode(param.getValuePlain());
        param.isValueBase64 = true;
    }

}

module.exports = {
    Base64Analyzer
}