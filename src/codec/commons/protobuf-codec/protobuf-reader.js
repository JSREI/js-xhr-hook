/**
 * 读取 Varint 编码的整数
 * @param {DataView} dataView - DataView 对象
 * @param {number} offset - 当前读取的偏移量
 * @returns {[number, number]} - 返回 [解析后的整数, 新的偏移量]
 */
function readVarint(dataView, offset) {
    let result = 0;
    let shift = 0;
    while (true) {
        if (offset >= dataView.byteLength) {
            throw new Error("Unexpected EOF while reading varint");
        }
        const byte = dataView.getUint8(offset++);
        result |= (byte & 0x7F) << shift;
        shift += 7;
        if ((byte & 0x80) === 0) {
            return [result, offset];
        }
    }
}

/**
 * 读取标识符（字段编号和 wire 类型）
 * @param {DataView} dataView - DataView 对象
 * @param {number} offset - 当前读取的偏移量
 * @returns {[number, number, number]} - 返回 [字段编号, wire 类型, 新的偏移量]
 */
function readIdentifier(dataView, offset) {
    const [id, newOffset] = readVarint(dataView, offset);
    if (id === undefined) {
        return [undefined, undefined, offset];
    }
    const fieldNumber = id >>> 3; // 字段编号
    const wireType = id & 0x07;   // wire 类型
    return [fieldNumber, wireType, newOffset];
}

/**
 * 根据 wire 类型读取值
 * @param {DataView} dataView - DataView 对象
 * @param {number} offset - 当前读取的偏移量
 * @param {number} wireType - wire 类型
 * @returns {[any, number]} - 返回 [解析后的值, 新的偏移量]
 */
function readValue(dataView, offset, wireType) {
    switch (wireType) {
        case 0: // Varint
            return readVarint(dataView, offset);

        case 1: // 64-bit fixed (double or int64)
            if (offset + 8 > dataView.byteLength) {
                throw new Error("Unexpected EOF while reading 64-bit fixed");
            }
            const value64 = dataView.getBigUint64(offset, true);
            return [value64, offset + 8];

        case 2: // Length-delimited (bytes or string)
            const [length, newOffset] = readVarint(dataView, offset);
            if (newOffset + length > dataView.byteLength) {
                throw new Error("Unexpected EOF while reading length-delimited data");
            }
            const bytes = new Uint8Array(dataView.buffer, newOffset, length);
            return [bytes, newOffset + length];

        case 3: // Start group (deprecated)
        case 4: // End group (deprecated)
            return [wireType === 3, offset];

        case 5: // 32-bit fixed (float or int32)
            if (offset + 4 > dataView.byteLength) {
                throw new Error("Unexpected EOF while reading 32-bit fixed");
            }
            const value32 = dataView.getFloat32(offset, true);
            return [value32, offset + 4];

        default:
            throw new Error(`Unknown wire type ${wireType}`);
    }
}

// // 示例用法
// const buffer = new ArrayBuffer(16);
// const dataView = new DataView(buffer);
//
// // 填充测试数据
// dataView.setUint8(0, 0x08); // Varint: fieldNumber=1, wireType=0
// dataView.setUint8(1, 0x96); // Varint value: 150
// dataView.setUint8(2, 0x01);
//
// // 读取数据
// let offset = 0;
// const [fieldNumber, wireType, newOffset] = readIdentifier(dataView, offset);
// console.log(`Field Number: ${fieldNumber}, Wire Type: ${wireType}`);
//
// const [value, finalOffset] = readValue(dataView, newOffset, wireType);
// console.log(`Value: ${value}, Final Offset: ${finalOffset}`);

module.exports = {
    readVarint,
    readValue,
    readIdentifier,
}
