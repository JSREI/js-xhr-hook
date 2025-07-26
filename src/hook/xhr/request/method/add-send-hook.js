const {ProtoBufCodec} = require("../../../../codec/commons/protobuf-codec/protobuf-codec");
const {GzipCodec} = require("../../../../codec/commons/gzip-codec/gzip-codec");
const {FormParamParser} = require("../../../../parser/form-param-parser");
const {FormBodyParser} = require("../../../../parser/form-body-parser");
const {JsonBodyParser} = require("../../../../parser/json-body-parser");
const {ContextLocation} = require("../../../../context/context-location");
const {SignAnalyzer} = require("../../../../analyzer/encrypt/sign/sign-analyzer");
const {Base64Analyzer} = require("../../../../analyzer/core-encoding/base64-analyzer/base64-analyzer");
const {UrlEncodeAnalyzer} = require("../../../../analyzer/core-encoding/url-encode-analyzer/url-encode-analyzer");
const {HexEncodeAnalyzer} = require("../../../../analyzer/core-encoding/hex-encode-analyzer/hex-encode-analyzer");
const {TextBodyParser} = require("../../../../parser/text-body-parser");
const {SendMessage} = require("../../../../message-formatter/request/method/send-message");

/**
 * 为send方法生成代理对象并返回
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send
 *
 * @param xhrObject {XMLHttpRequest}
 * @param xhrContext {XhrContext}
 * @returns {Proxy<Function>}
 */
function addSendHook(xhrObject, xhrContext) {
    return new Proxy(xhrObject.send, {
        apply(target, thisArg, argArray) {

            // send只会有有一个参数
            const [data] = argArray;

            try {
                // TODO 2025-01-10 23:42:49
            } catch (e) {
                console.error(e);
            }

            // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send
            // post设置body的情况要能够拦截得到
            try {
                if (data) {
                    // data可能会是以下几种类型：
                    // Blob | BufferSource | FormData | URLSearchParams | string
                    if (typeof data === "string") {
                        // request body 是 string 类型，大多数情况下也是这种类型
                        // for (let xhrDebugger of xhrDebuggerArray) {
                        //     if (xhrDebugger.test(_this.xhrContext)) {
                        //         // 当前操作：XMLHttpRequest send
                        //         debugger;
                        //     }
                        // }
                        if (xhrContext.requestContext.isJson()) {
                            const bodyContext = xhrContext.requestContext.bodyContext = new JsonBodyParser().parse(data);
                            bodyContext.location = ContextLocation.REQUEST;
                        } else if (xhrContext.requestContext.isForm()) {
                            // 测试网站：
                            // - https://passport.fang.com/
                            xhrContext.requestContext.bodyContext = new FormBodyParser().parse(data);
                            // TODO 2025-01-11 11:17:15 断点测试
                        } else {
                            // 纯文本的请求
                            xhrContext.requestContext.bodyContext = new TextBodyParser().parse(data);
                        }
                    } else if (data.prototype === Blob.prototype) {
                        // Blob 类型
                        // TODO 二进制类型
                        debugger;
                    } else if (data.prototype === ArrayBuffer.prototype) {
                        // ArrayBuffer 类型
                        // TODO 二进制类型
                        debugger;
                    } else if (data.prototype === FormData.prototype) {
                        // ArrayBufferView 类型
                        // TODO 表单参数匹配
                        debugger;
                    } else if (data.prototype === URLSearchParams.prototype) {
                        // URLSearchParams 类型
                        // TODO 参数匹配
                        debugger;
                    } else if (data instanceof Uint8Array) {

                        let decodeData = data;

                        const gzipCodec = new GzipCodec();
                        if (gzipCodec.isGzipCompressed(decodeData)) {
                            decodeData = gzipCodec.decode(decodeData);
                        }

                        const text = new TextDecoder('utf-8').decode(decodeData);
                        const base64String = btoa(text);
                        debugger;

                        // 将 Uint8Array 包装为类似文件的对象
                        const file = {
                            buffer: data,
                            position: 0,
                            read: function (bytes) {
                                const chunk = this.buffer.slice(this.position, this.position + bytes);
                                this.position += bytes;
                                return chunk;
                            },
                        };
                        new ProtoBufCodec().decode(file);
                    }
                }
            } catch (e) {
                console.error(e);
            }

            // 分析请求中的各种编码
            UrlEncodeAnalyzer.analyzeRequestContext(xhrContext.requestContext);
            Base64Analyzer.analyzeRequestContext(xhrContext.requestContext);
            HexEncodeAnalyzer.analyzeRequestContext(xhrContext.requestContext);

            // 测试网站：
            // https://liuyan.people.com.cn/home/
            // https://music.91q.com/album/P10004267254
            const signContext = new SignAnalyzer().analyze(xhrContext);
            if (signContext) {
                console.log("检测到sign: " + signContext.name + ":" + signContext.value + ", url = " + xhrContext.requestContext.urlContext.rawUrl);
            }

            // 在控制台上打印上下文
            SendMessage.print(xhrContext);

            return target.apply(xhrObject, argArray);
        }
    });
}

module.exports = {
    addSendHook,
}
