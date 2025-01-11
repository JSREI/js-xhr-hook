const {XhrContext} = require("../context/xhr-context");
const {RequestContext} = require("../context/request-context");
const {RequestContextParser} = require("./request-context-parser");

/**
 *
 */
class XhrContextParser {

    /**
     *
     * @param xhrContext {XhrContext}
     * @param url {string}
     */
    updateWithUrl(xhrContext, url) {
        new RequestContextParser().updateWithUrl(xhrContext.requestContext, url);
    }

}

module.exports = {
    XhrContextParser
}
