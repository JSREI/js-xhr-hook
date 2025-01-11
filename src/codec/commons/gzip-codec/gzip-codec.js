const pako = require('pako');

/**
 * 用来对gzip类型的数据解码
 */
class GzipCodec {

    /**
     *
     * @param gzipData
     * @return {*}
     */
    static decode(gzipData) {
        return pako.inflate(gzipData);
    }

    /**
     *
     * @param uint8Array
     * @return {boolean}
     */
    static isGzipCompressed(uint8Array) {
        // 检查前两个字节是否是 Gzip 文件头
        return uint8Array.length >= 2 && uint8Array[0] === 0x1F && uint8Array[1] === 0x8B;
    }

}

module.exports = {
    GzipCodec,
};