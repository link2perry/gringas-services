var UserImpl = /** @class */ (function () {
    function UserImpl(user) {
        this.id = -1;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.username = "";
        this.password = "";
        if (user) {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.username = user.username;
            this.password = user.password;
        }
    }
    return UserImpl;
}());
export default UserImpl;
//# sourceMappingURL=../../src/src/model/UserImpl.js.map