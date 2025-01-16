const {XhrContext} = require("../../../context/xhr-context");

class SendMessage {

    /**
     * 当发送请求的时候，把请求上下文中的内容打印一下
     *
     * @param xhrContext {XhrContext}
     */
    static print(xhrContext) {
        const requestContext = xhrContext.requestContext;
        const responseContext = xhrContext.responseContext;

        console.groupCollapsed("%c📤 Request Context", "color: #4CAF50; font-size: 14px; font-weight: bold;");
        console.groupCollapsed("%c🌐 URL Context", "color: #2196F3; font-size: 12px; font-weight: bold;");
        console.table({
            "Raw URL": requestContext.urlContext.rawUrl,
            "Domain": requestContext.urlContext.domain,
            "Port": requestContext.urlContext.port,
            "Protocol": requestContext.urlContext.protocol,
            "Query String": requestContext.urlContext.queryString,
            "Request Path": requestContext.urlContext.requestPath,
        });
        console.groupEnd();

        console.groupCollapsed("%c📝 Headers", "color: #FF9800; font-size: 12px; font-weight: bold;");
        console.table(requestContext.headerContext.headers.map(header => ({
            "Name": header.name,
            "Value": header.value,
            "Location": header.location.description,
            "Is Custom": header.isCustom
        })));
        console.groupEnd();

        console.groupCollapsed("%c📦 Body Context", "color: #9C27B0; font-size: 12px; font-weight: bold;");
        console.table({
            "Location": requestContext.bodyContext.location.description,
            "Content Type": requestContext.bodyContext.contentType.description,
            "Raw Body": requestContext.bodyContext.rawBody,
            "Raw Body Text": requestContext.bodyContext.rawBodyText,
            "Is URL Encoded": requestContext.bodyContext.isRawBodyUrlEncode,
            "Is Hex Encoded": requestContext.bodyContext.isRawBodyHex,
            "Is Base64 Encoded": requestContext.bodyContext.isRawBodyBase64,
        });
        console.groupEnd();

        console.groupCollapsed("%c🔐 Auth Context", "color: #F44336; font-size: 12px; font-weight: bold;");
        console.table({
            "Username": requestContext.authContext.username,
            "Password": requestContext.authContext.password
        });
        console.groupEnd();

        console.groupCollapsed("%c📥 Response Context", "color: #4CAF50; font-size: 14px; font-weight: bold;");
        console.table({
            "Status Code": responseContext.statusCode,
            "Is JSON": responseContext.isJson(),
        });
        console.groupEnd();

        console.groupEnd();
    }

}

module.exports = {
    SendMessage
}