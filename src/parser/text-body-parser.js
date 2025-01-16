const {BodyContext} = require("../context/body-context");
const {ContextLocation} = require("../context/context-location");
const {ContentType} = require("../context/content-type");

/**
 *
 */
class TextBodyParser {

    /**
     *
     * @param text {string}
     * @return {BodyContext}
     */
    parse(text) {
        const bodyContext = new BodyContext();
        bodyContext.location = ContextLocation.REQUEST;
        bodyContext.rawBody = text;
        bodyContext.contentType = ContentType.PLAINTEXT;
        bodyContext.params = [];
        return bodyContext;
    }

}

module.exports = {
    TextBodyParser
}