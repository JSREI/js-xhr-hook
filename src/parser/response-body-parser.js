const {BodyContext} = require("../context/body-context");
const {ContentType} = require("../context/content-type");

/**
 *
 */
class ResponseBodyParser {

    /**
     *
     * @param xhrObject
     * @param xhrContext
     * @return {BodyContext}
     */
    parse(xhrObject, xhrContext) {
        const bodyContext = new BodyContext();
        bodyContext.rawBody = xhrObject.response;
        bodyContext.rawBodyText = xhrObject.responseText;

        // JSON
        try {
            bodyContext.object = JSON.parse(xhrObject.responseText)
            bodyContext.contentType = ContentType.JSON;
        } catch (e) {
            // ignored
        }

        // TODO 2025-01-11 12:39:12 其它类型

        return bodyContext;

    }

}

module.exports = {
    ResponseBodyParser
}