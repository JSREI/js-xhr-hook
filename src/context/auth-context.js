/**
 *
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

}

module.exports = {
    AuthContext
}