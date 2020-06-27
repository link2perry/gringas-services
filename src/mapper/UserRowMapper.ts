import RowMapper from '../mapper/RowMapper';
import User from '../model/User';
import UserImpl from '../model/UserImpl';


export default class UserRowMapper implements RowMapper<User> {
  
  mapRow(row: any): User {

console.log('typeof row:', typeof row);

    let user: User = new UserImpl();
    
    if(typeof row !== 'undefined') {
      user.id = row.id;
      user.username = row.username;
      user.password = row.password;
      user.firstName = row.first_name;
      user.lastName = row.last_name;
      user.email = row.email;
    }
    return user;
  }
}