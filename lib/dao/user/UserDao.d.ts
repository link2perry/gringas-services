import MysqlDao from '../MysqlDao';
/**
 * @description Handles database interactions for Users
 * @table gringagirls.user
 */
export default class UserDao extends MysqlDao {
    constructor(options?: any);
    /**
     * @description Tell Dao where the sql files are kept
     *
     * @return {String} dir
     */
    getSqlDir(): string;
    /**
     * Returns the roles managed by this role
     *
     */
    getById(id: number, options?: any): Promise<unknown>;
}
//# sourceMappingURL=../../../src/src/dao/user/UserDao.d.ts.map