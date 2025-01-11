const {StringMatcher} = require("./string-matcher");


const headerDebuggerTypeRequest = "request";
const headerDebuggerTypeResponse = "response";

class HeaderDebugger {

    constructor() {
        this.type = headerDebuggerTypeRequest;
        this.onSetHeaderName = null;
        this.onGetHeaderName = null;
        this.onHeaderValueMatch = StringMatcher();
    }

}