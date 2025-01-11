const {FormParamParser} = require("./form-param-parser");
const {BodyContext} = require("../context/body-context");
const {ContextLocation} = require("../context/context-location");
const {ContentType} = require("../context/content-type");

/**
 *
 */
class FormBodyParser {

    /**
     *
     * @param formString {string} 示例："Uid=1111&Service=soufun-passport-web"
     * @return {BodyContext}
     */
    parse(formString) {
        const bodyContext = new BodyContext();
        bodyContext.location = ContextLocation.REQUEST;
        bodyContext.rawBody = formString;
        bodyContext.contentType = ContentType.FORM;
        bodyContext.params = new FormParamParser().parse(formString);
        return bodyContext;
    }

}

module.exports = {
    FormBodyParser
}