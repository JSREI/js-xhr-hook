const {XMLHttpRequestPrototypeHook} = require("../hook/xhr/xml-http-request-prototype-hook");
const {registerMenu, checkAndShowConfiguration} = require("../config/ui/menu");


/**
 * 初始化资源
 */
function init() {

    registerMenu();

    // 检查是否需要显示配置窗口
    checkAndShowConfiguration();

    new XMLHttpRequestPrototypeHook().addHook();

}

module.exports = {
    init
}
