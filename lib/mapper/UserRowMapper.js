import UserImpl from '../model/UserImpl';
var UserRowMapper = /** @class */ (function () {
    function UserRowMapper() {
    }
    UserRowMapper.prototype.mapRow = function (row) {
        console.log('typeof row:', typeof row);
        var user = new UserImpl();
        if (typeof row !== 'undefined') {
            user.id = row.id;
            user.username = row.username;
            user.password = row.password;
            user.firstName = row.first_name;
            user.lastName = row.last_name;
            user.email = row.email;
        }
        return user;
    };
    return UserRowMapper;
}());
export default UserRowMapper;
//# sourceMappingURL=../../src/src/mapper/UserRowMapper.js.map