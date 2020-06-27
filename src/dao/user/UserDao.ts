import MysqlDao from '../MysqlDao';
import UserRowMapper from '../../mapper/UserRowMapper';
import User from '../../model/User';

/**
 * @description Handles database interactions for Users
 * @table gringagirls.user
 */
export default class UserDao extends MysqlDao {

  constructor(options: any = {}) {
    super(options);
  }

  /**
   * @description Tell Dao where the sql files are kept
   *
   * @return {String} dir
   */
  getSqlDir() {
    return __dirname + '/sql/';
  }

  /**
   * Returns the roles managed by this role
   *
   */
  getById(id:number, options: any = {}) {
    options = Object.assign({
      sorting: 'username',
      rowMapper: new UserRowMapper()
    }, options);
    return super.getById<User>(id, options);
  }
}