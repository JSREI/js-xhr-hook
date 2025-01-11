const {Param} = require("../context/param");
const {ParamType} = require("../context/param-type");
const {ContextLocation} = require("../context/context-location");

/**
 *
 */
class FormParamParser {

    /**
     * 将表单字符串解析为 Param 数组
     * @param {string} formString 示例： "Uid=1111&Service=soufun-passport-web"
     * @returns {Array<Param>}
     */
    parse(formString) {
        const params = [];
        if (!formString) {
            return params;
        }

        // 按 '&' 分割键值对
        const keyValuePairs = formString.split('&');
        for (const pair of keyValuePairs) {
            // 按 '=' 分割键和值
            const [name, value] = pair.split('=');

            // 创建 Param 对象
            const param = new Param();
            param.name = name || null;
            param.value = value || null;
            param.paramType = ParamType.FORM;
            param.paramLocation = ContextLocation.REQUEST;

            params.push(param);
        }

        return params;
    }
}

module.exports = {
    FormParamParser
};