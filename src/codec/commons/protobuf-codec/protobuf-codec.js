/**
 *
 *
 *
 * 测试网站：
 * - https://www.wanfangdata.com.cn/
 * - https://turbodesk.xfyun.cn/client
 *
 *
 */
class ProtoBufCodec {

    decode(file) {
        debugger;
        const parser = new StandardParser();
        const result = parser.parseMessage(file, 'message');
        console.log(result);
    }

}

// Core 类：处理低级别的二进制数据解析
class Core {
    static readVarint(file) {
        let result = 0;
        let pos = 0;
        while (true) {
            const b = file.read(1);
            if (!b.length) {
                if (pos === 0) return null;
                throw new Error("Unexpected EOF");
            }
            result |= (b[0] & 0x7F) << pos;
            pos += 7;
            if (!(b[0] & 0x80)) {
                if (b[0] === 0 && pos !== 7) throw new Error("Invalid varint");
                return result;
            }
        }
    }

    static readIdentifier(file) {
        const id = Core.readVarint(file);
        if (id === null) return [null, null];
        return [id >> 3, id & 0x07];
    }

    static readValue(file, wireType) {
        if (wireType === 0) {
            return Core.readVarint(file);
        } else if (wireType === 1) {
            const c = file.read(8);
            if (!c.length) return null;
            if (c.length !== 8) throw new Error("Invalid 64-bit value");
            return c;
        } else if (wireType === 2) {
            const length = Core.readVarint(file);
            if (length === null) return null;
            const c = file.read(length);
            if (c.length !== length) throw new Error("Invalid chunk length");
            return new Uint8Array(c); // 使用 Uint8Array 代替 Buffer
        } else if (wireType === 3 || wireType === 4) {
            return wireType === 3;
        } else if (wireType === 5) {
            const c = file.read(4);
            if (!c.length) return null;
            if (c.length !== 4) throw new Error("Invalid 32-bit value");
            return c;
        } else {
            throw new Error(`Unknown wire type ${wireType}`);
        }
    }
}

// Parser 类：提供基础的解析框架
class Parser {
    constructor() {
        this.types = {};
        this.nativeTypes = {};

        this.defaultIndent = " ".repeat(4);
        this.compactMaxLineLength = 35;
        this.compactMaxLength = 70;
        this.bytesPerLine = 24;

        this.errorsProduced = [];

        this.defaultHandler = "message";
        this.defaultHandlers = {
            0: "varint",
            1: "64bit",
            2: "chunk",
            3: "startgroup",
            4: "endgroup",
            5: "32bit",
        };
    }

    indent(text, indent = this.defaultIndent) {
        const lines = text.split("\n").map(line => line.length ? indent + line : line);
        return lines.join("\n");
    }

    toDisplayCompactly(type, lines) {
        try {
            return this.types[type].compact;
        } catch (e) {
            // Ignore
        }

        for (const line of lines) {
            if (line.includes("\n") || line.length > this.compactMaxLineLength) return false;
        }
        return lines.reduce((sum, line) => sum + line.length, 0) <= this.compactMaxLength;
    }

    hexDump(file, mark = null) {
        const lines = [];
        let offset = 0;
        const decorate = (i, x) => (mark === null || offset + i < mark) ? x : this.dim(x);
        while (true) {
            const chunk = file.read(this.bytesPerLine);
            if (!chunk.length) break;
            const paddedChunk = [...chunk, ...Array(this.bytesPerLine - chunk.length).fill(null)];
            const hexdump = paddedChunk.map((x, i) => x === null ? "  " : decorate(i, x.toString(16).padStart(2, '0'))).join(" ");
            const printableChunk = chunk.map((x, i) => decorate(i, x >= 0x20 && x < 0x7F ? String.fromCharCode(x) : '.')).join("");
            lines.push(`${offset.toString(16).padStart(4, '0')}   ${hexdump}  ${printableChunk}`);
            offset += chunk.length;
        }
        return [lines.join("\n"), offset];
    }

    safeCall(handler, x, ...wargs) {
        let chunk = false;
        try {
            chunk = x.read();
            x = new Uint8Array(chunk); // 使用 Uint8Array 代替 Buffer
        } catch (e) {
            // Ignore
        }

        try {
            return handler(x, ...wargs);
        } catch (e) {
            this.errorsProduced.push(e);
            const hexDump = chunk === false ? "" : `\n\n${this.hexDump(new Uint8Array(chunk), x.length)[0]}\n`;
            return `ERROR: ${this.indent(e.stack).trim()}${this.indent(hexDump)}`;
        }
    }

    matchNativeType(type) {
        const typePrimary = type.split(" ")[0];
        return this.nativeTypes[typePrimary] || this.nativeTypes[this.defaultHandler];
    }

    matchHandler(type, wireType = null) {
        const nativeType = this.matchNativeType(type);
        if (wireType !== null && wireType !== nativeType[1]) {
            throw new Error(`Found wire type ${wireType} (${this.defaultHandlers[wireType]}), wanted type ${nativeType[1]} (${type})`);
        }
        return nativeType[0];
    }
}

// StandardParser 类：扩展 Parser，实现具体的 Protobuf 类型解析逻辑
class StandardParser extends Parser {
    constructor() {
        super();

        this.types.message = {};

        this.messageCompactMaxLines = 4;
        this.packedCompactMaxLines = 20;

        this.dumpPrefix = "dump.";
        this.dumpIndex = 0;

        this.wireTypesNotMatching = false;
        this.groupsObserved = false;

        const typesToRegister = {
            0: ["varint", "sint32", "sint64", "int32", "int64", "uint32", "uint64", "enum", "bool"],
            1: ["64bit", "sfixed64", "fixed64", "double"],
            2: ["chunk", "bytes", "string", "message", "packed", "dump"],
            5: ["32bit", "sfixed32", "fixed32", "float"],
        };

        for (const [wireType, types] of Object.entries(typesToRegister)) {
            for (const type of types) {
                this.nativeTypes[type] = [this[`parse${type.charAt(0).toUpperCase() + type.slice(1)}`], parseInt(wireType)];
            }
        }
    }

    getMessageFieldEntry(gtype, key) {
        let type = null, field = null;
        try {
            let fieldEntry = this.types[gtype][key];
            if (!Array.isArray(fieldEntry)) fieldEntry = [fieldEntry];
            [type, field] = fieldEntry;
        } catch (e) {
            // Ignore
        }
        return [type, field];
    }

    parseMessage(file, gtype, endgroup = null) {
        if (!(gtype in this.types) && gtype !== this.defaultHandler) {
            throw new Error(`Unknown message type ${gtype}`);
        }

        const lines = [];
        const keysTypes = {};
        while (true) {
            const [key, wireType] = Core.readIdentifier(file);
            if (key === null) break;

            let x = Core.readValue(file, wireType);
            if (x === null) throw new Error("Unexpected EOF");

            if (wireType === 4) {
                if (!endgroup) throw new Error("Unexpected end group");
                endgroup[0] = key;
                break;
            }

            if (key in keysTypes && keysTypes[key] !== wireType) {
                this.wireTypesNotMatching = true;
            }
            keysTypes[key] = wireType;

            let [type, field] = this.getMessageFieldEntry(gtype, key);
            if (wireType === 3) {
                if (type === null) type = "message";
                const end = [null];
                x = this.parseMessage(file, type, end);
                x = `group (end ${end[0]}) ${x}`;
                this.groupsObserved = true;
            } else {
                if (type === null) type = this.defaultHandlers[wireType];
                x = this.safeCall(x => this.matchHandler(type, wireType)(x, type), x);
            }

            if (field === null) field = `<${type}>`;
            lines.push(`${key} ${field} = ${x}`);
        }

        if (key === null && endgroup) throw new Error("Group was not ended");
        if (lines.length <= this.messageCompactMaxLines && this.toDisplayCompactly(gtype, lines)) {
            return `${gtype}(${lines.join(", ")})`;
        }
        if (!lines.length) lines.push("empty");
        return `${gtype}:\n${this.indent(lines.join("\n"))}`;
    }

    // ... 其他方法保持不变
}

// // 示例：在浏览器中使用
// const uint8Array = new Uint8Array([0x08, 0x96, 0x01]); // 示例 Protobuf 数据
// const file = {
//     buffer: uint8Array,
//     position: 0,
//     read: function (bytes) {
//         const chunk = this.buffer.slice(this.position, this.position + bytes);
//         this.position += bytes;
//         return chunk;
//     },
// };
//
// const parser = new StandardParser();
// const result = parser.parseMessage(file, 'message');
// console.log(result);


module.exports = {
    ProtoBufCodec,
}