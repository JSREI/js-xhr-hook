const {BaseMessage} = require("../../base-message");
const {getUserCodeLocation} = require("../../../utils/code-util");

/**
 *
 */
class OpenMessage extends BaseMessage {

    /**
     *
     * @param xhrContext
     */
    static print(xhrContext) {
        console.log("打开了连接: " + xhrContext.requestContext.urlContext.rawUrl + ", 代码位置： " + getUserCodeLocation());
    }

}

module.exports = {
    OpenMessage
}