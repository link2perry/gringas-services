import Service from '../service/Service';
import UserDao from '../dao/user/UserDao';
import User from '../model/User';

let dbConfig: any = {
  "host": "localhost",
  "port": "3306",
  "user": "root",
  "password": "admin",
  "database": "gringagirls",
  "connectTimeout": 300000
}

export default class UserService extends Service<User> {

  getDao(): UserDao {
    // let tisSecretsManager = new TisSecretsManager();
    // tisSecretsManager.getSecret('ccnaTisDbConfig')
    // .then(dbConfig => {  
    return new UserDao({dbConfig: dbConfig});
      
  }

  async save(user: User) {
    if(user.id) {
      console.log('updating user:', user);
      super.update(user);
    } else {
      console.log('inserting user:', user);
      super.insert(user);
    }
    
  }

}