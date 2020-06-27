var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import MysqlDao from '../MysqlDao';
import UserRowMapper from '../../mapper/UserRowMapper';
/**
 * @description Handles database interactions for Users
 * @table gringagirls.user
 */
var UserDao = /** @class */ (function (_super) {
    __extends(UserDao, _super);
    function UserDao(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, options) || this;
    }
    /**
     * @description Tell Dao where the sql files are kept
     *
     * @return {String} dir
     */
    UserDao.prototype.getSqlDir = function () {
        return __dirname + '/sql/';
    };
    /**
     * Returns the roles managed by this role
     *
     */
    UserDao.prototype.getById = function (id, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign({
            sorting: 'username',
            rowMapper: new UserRowMapper()
        }, options);
        return _super.prototype.getById.call(this, id, options);
    };
    return UserDao;
}(MysqlDao));
export default UserDao;
//# sourceMappingURL=../../../src/src/dao/user/UserDao.js.map