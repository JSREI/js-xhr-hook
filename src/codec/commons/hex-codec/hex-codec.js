/**
 *
 */
class HexCodec {

    /**
     * 将十六进制字符串解码为 DataView 对象
     * @param hexString {string} 十六进制字符串
     * @return {DataView} 返回 DataView 对象
     */
    static decode(hexString) {

        // 移除可能的空格或其他分隔符
        hexString = hexString.replace(/\s/g, '');

        // 检查十六进制字符串的长度是否为偶数
        if (hexString.length % 2 !== 0) {
            throw new Error('Invalid hex string: length must be even.');
        }

        // 将十六进制字符串转换为字节数组
        const byteLength = hexString.length / 2;
        const buffer = new ArrayBuffer(byteLength);
        const dataView = new DataView(buffer);

        for (let i = 0; i < byteLength; i++) {
            const byteHex = hexString.substr(i * 2, 2);
            const byteValue = parseInt(byteHex, 16);
            if (isNaN(byteValue)) {
                throw new Error(`Invalid hex string: invalid byte at position ${i * 2}.`);
            }
            dataView.setUint8(i, byteValue);
        }

        return dataView;
    }

}

module.exports = {
    HexCodec
};