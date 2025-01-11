const {BodyContext} = require("../context/body-context");
const {ContentType} = require("../context/content-type");

/**
 *
 */
class JsonBodyParser {

    /**
     *
     * @param jsonString
     * @return {BodyContext}
     */
    parse(jsonString) {
        const bodyContext = new BodyContext();
        bodyContext.rawBody = jsonString;
        bodyContext.contentType = ContentType.JSON;
        bodyContext.object = JSON.parse(jsonString);
        return bodyContext;
    }

}

module.exports = {
    JsonBodyParser
}