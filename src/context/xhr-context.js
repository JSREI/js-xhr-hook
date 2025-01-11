const {RequestContext} = require("./request-context");
const {ResponseContext} = require("./response-context");

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
 */
class XhrContext {

    constructor() {
        this.requestContext = new RequestContext();
        this.responseContext = new ResponseContext();
    }

}

module.exports = {
    XhrContext
}

