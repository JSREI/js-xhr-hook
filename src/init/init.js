const {XMLHttpRequestPrototypeHook} = require("../hook/xhr/xml-http-request-prototype-hook");
const {registerMenu} = require("../config/ui/menu");


/**
 * 初始化资源
 */
function init() {

    registerMenu();

    new XMLHttpRequestPrototypeHook().addHook();

}

module.exports = {
    init
}
