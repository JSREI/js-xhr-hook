const {ContextLocation} = require("./context-location");

/**
 * 请求头或者响应头的上下文
 */
class HeaderContext {

    constructor() {

        // ContextLocation，用于表明是请求头还是响应头的上下文
        this.location = ContextLocation.UNKNOWN;

        // 都有哪些头
        this.headers = [];
    }

    /**
     *
     * @param name
     * @return {*|null}
     */
    getByName(name) {
        name = name.toLowerCase();
        for (let header of this.headers) {
            if (header.name.toLowerCase() === name) {
                return header;
            }
        }
        return null;
    }
}

module.exports = {
    HeaderContext,
}
