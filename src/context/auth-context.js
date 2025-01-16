/**
 * 认证上下文，如果请求中有携带认证的话，会把响应的值设置上
 */
class AuthContext {

    /**
     *
     * @param username
     * @param password
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    /**
     *
     * @return {boolean}
     */
    isEmpty() {
        return !this.username && !this.password;
    }

}

module.exports = {
    AuthContext
}