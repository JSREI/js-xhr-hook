const {UrlContextParser} = require("./url-context-parser");
const {RequestContext} = require("../context/request-context");

class RequestContextParser {

    /**
     *
     * @param requestContext {RequestContext}
     * @param url {string}
     */
    updateWithUrl(requestContext, url) {
        requestContext.urlContext = new UrlContextParser().parse(url);
    }

}

module.exports = {
    RequestContextParser
};