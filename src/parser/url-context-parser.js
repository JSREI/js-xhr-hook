const {UrlContext} = require("../context/url-context");
const {Param} = require("../context/param");
const {ParamType} = require("../context/param-type");
const {ContextLocation} = require("../context/context-location");

/**
 *
 */
class UrlContextParser {

    /**
     * 解析URL并返回一个包含提取组件的UrlContext对象。
     * @param {string} url - 需要解析的URL。
     * @return {UrlContext} - 包含解析结果的UrlContext对象。
     */
    parse(url) {
        const urlContext = new UrlContext();

        // 使用URL类解析URL
        const parsedUrl = new URL(url);

        urlContext.rawUrl = url;

        // 提取并设置域名
        urlContext.domain = parsedUrl.hostname;

        // 提取并设置端口
        urlContext.port = parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80);

        // 提取并设置协议
        urlContext.protocol = parsedUrl.protocol.replace(':', '');

        // 提取并设置查询字符串
        urlContext.queryString = parsedUrl.search;

        // 提取并设置请求路径
        urlContext.requestPath = parsedUrl.pathname;

        // 提取并设置参数
        urlContext.params = [];
        parsedUrl.searchParams.forEach((value, key) => {
            const param = new Param();
            param.paramType = ParamType.QUERY_STRING; // 参数类型为 QUERY_STRING
            param.paramLocation = ContextLocation.REQUEST; // 参数位置为 REQUEST
            param.name = key; // 参数名称
            param.value = value; // 参数值
            urlContext.params.push(param);
        });

        return urlContext;
    }

}

module.exports = {
    UrlContextParser,
};