const {XhrContext} = require("../../../context/xhr-context");
const {SignContext} = require("./sign-context");
const {RequestContext} = require("../../../context/request-context");

class SignAnalyzer {

    /**
     *
     * @param xhrContext {XhrContext}
     */
    analyze(xhrContext) {
        const signParam = this.analyzeRequest(xhrContext.requestContext);
        if (signParam) {
            return new SignContext(signParam.name, signParam.value);
        } else {
            return null;
        }
    }

    /**
     *
     *
     *
     * @param requestContext {RequestContext}
     */
    analyzeRequest(requestContext) {
        for(let param of requestContext.getParams()) {
            if (this.maybeSignName(param.name)) {
                return param;
            }
        }
        return null;
    }

    maybeSignName(name) {
        name = name.toLowerCase();
        const signNameSet = new Set();
        signNameSet.add("sign");
        signNameSet.add("signature");
        return signNameSet.has(name);
    }

    /**
     *
     * @param responseContext
     */
    analyzeResponse(responseContext) {

    }

}

module.exports = {
    SignAnalyzer
}