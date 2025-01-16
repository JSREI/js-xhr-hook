/**
 *
 */
class HeaderParser {

    /**
     *
     * @param header
     * @return {boolean}
     */
    isStandardHeader(header) {
        // 常见的标准HTTP头字段列表
        const standardHeaders = [
            'Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language',
            'Authorization', 'Cache-Control', 'Connection', 'Content-Length',
            'Content-Type', 'Cookie', 'Date', 'Expect', 'From', 'Host',
            'If-Match', 'If-Modified-Since', 'If-None-Match', 'If-Range',
            'If-Unmodified-Since', 'Max-Forwards', 'Pragma', 'Proxy-Authorization',
            'Range', 'Referer', 'TE', 'Upgrade', 'User-Agent', 'Via', 'Warning',
            // 响应头字段
            'Accept-Ranges', 'Age', 'Allow', 'Content-Encoding', 'Content-Language',
            'Content-Location', 'Content-Disposition', 'Content-Range', 'ETag',
            'Expires', 'Last-Modified', 'Location', 'Proxy-Authenticate', 'Retry-After',
            'Server', 'Set-Cookie', 'Trailer', 'Transfer-Encoding', 'Vary', 'WWW-Authenticate',
            'X-Requested-With'
        ];

        // 将头字段转换为小写并去除前后空格
        const normalizedHeader = header.trim().toLowerCase();

        // 检查是否在标准头字段列表中
        return standardHeaders.some(standardHeader =>
            standardHeader.toLowerCase() === normalizedHeader
        );
    }

}

module.exports = {
    HeaderParser
}