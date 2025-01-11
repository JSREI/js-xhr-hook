const {XMLHttpRequestPrototypeHook} = require("../hook/xhr/xml-http-request-prototype-hook");


/**
 * 初始化资源
 */
function init() {

    new XMLHttpRequestPrototypeHook().addHook();

}

module.exports = {
    init
}
