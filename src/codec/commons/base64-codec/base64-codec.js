/**
 *
 */
class Base64Codec {

    /**
     * 判断字符串是否是base64字符串
     *
     * @param str
     * @return {boolean}
     */
    static isBase64(str) {
        try {
            // 尝试解码
            const decoded = atob(str); // Base64解码
            // 重新编码，检查是否与原始字符串匹配
            const reencoded = btoa(decoded);
            // 去除可能的填充字符'='后比较
            return str.replace(/=+$/, '') === reencoded.replace(/=+$/, '');
        } catch (e) {
            // 如果解码失败，返回false
            return false;
        }
    }

    static encode(dataView) {
        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        let i = 0;
        const byteLength = dataView.byteLength;

        while (i < byteLength) {
            // 每次读取 3 个字节
            const byte1 = dataView.getUint8(i++);
            const byte2 = i < byteLength ? dataView.getUint8(i++) : 0;
            const byte3 = i < byteLength ? dataView.getUint8(i++) : 0;

            // 将 3 个字节转换为 4 个 Base64 字符
            const char1 = base64Chars.charAt(byte1 >> 2);
            const char2 = base64Chars.charAt(((byte1 & 0x03) << 4) | (byte2 >> 4));
            const char3 = base64Chars.charAt(((byte2 & 0x0f) << 2) | (byte3 >> 6));
            const char4 = base64Chars.charAt(byte3 & 0x3f);

            result += char1 + char2 + char3 + char4;
        }

        // 处理填充
        const paddingLength = byteLength % 3;
        if (paddingLength === 1) {
            result = result.slice(0, -2) + '==';
        } else if (paddingLength === 2) {
            result = result.slice(0, -1) + '=';
        }

        return result;
    }

    static decode(input) {
        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        const base64Lookup = new Uint8Array(256);
        for (let i = 0; i < base64Chars.length; i++) {
            base64Lookup[base64Chars.charCodeAt(i)] = i;
        }

        input = input.replace(/=+$/, '');
        let result = '';
        let i = 0;

        while (i < input.length) {
            const char1 = input.charAt(i++);
            const char2 = input.charAt(i++);
            const char3 = input.charAt(i++);
            const char4 = input.charAt(i++);

            const byte1 = base64Lookup[char1.charCodeAt(0)];
            const byte2 = base64Lookup[char2.charCodeAt(0)];
            const byte3 = base64Lookup[char3.charCodeAt(0)];
            const byte4 = base64Lookup[char4.charCodeAt(0)];

            const code1 = (byte1 << 2) | (byte2 >> 4);
            const code2 = ((byte2 & 0x0f) << 4) | (byte3 >> 2);
            const code3 = ((byte3 & 0x03) << 6) | byte4;

            result += String.fromCharCode(code1);
            if (char3 !== '=') result += String.fromCharCode(code2);
            if (char4 !== '=') result += String.fromCharCode(code3);
        }

        return result;
    }

}

module.exports = {
    Base64Codec,
}