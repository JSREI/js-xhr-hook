const {XhrContext} = require("../../../context/xhr-context");
const {JsonAnalyzer} = require("../../json-analyzer");
const {ResponseContext} = require("../../../context/response-context");
const {RsaContext} = require("./rsa-context");

class RsaAnalyzer {

    /**
     *
     * @param xhrContext {XhrContext}
     * @return {RsaContext}
     */
    analyze(xhrContext) {
        return this.analyzeResponse(xhrContext.responseContext);
    }

    analyzeRequest(requestContext) {
        return null;
    }

    /**
     *
     * @param responseContext {ResponseContext}
     */
    analyzeResponse(responseContext) {
        const rsaContext = new RsaContext();

        if (responseContext.isJson()) {
            // 在JSON中寻找
            new JsonAnalyzer().deepTraverse(responseContext.bodyContext.object, function (path, name, value) {
                if (name === "modulus") {
                    rsaContext.modulus = value;
                    rsaContext.modulusJsonPath = path;
                } else if (name === "exponent") {
                    rsaContext.exponent = value;
                    rsaContext.exponentJsonPath = path;
                }
            });
        }
        if (rsaContext.modulus && rsaContext.exponent) {
            return rsaContext;
        } else {
            return null;
        }
    }

}

module.exports = {
    RsaAnalyzer
}