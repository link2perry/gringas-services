import MysqlDao from '../dao/MysqlDao';
// const log4js = require('log4js');
// const logger = log4js.getLogger();
// logger.level = process.env.LOGGER_LEVEL || 'error';

export default class Service<T> {

    getDao(): MysqlDao {
        throw new Error('must implement getDao');
    }

    async getById<T>(id:any, options = {}) {
        // logger.trace('entered into Service.getById', options);
        let dao = this.getDao();
        return dao.getById<T>(id, options);
    }

    async getAll<T>(options = {}) {
        // logger.trace('entered into Service.getAll', options);
        let dao = this.getDao();
        return dao.getAll<T>(options);
    }
    
    async insert<T>(item:any, options = {}) {
        // logger.trace('entered into Service.insert', options);
        let dao = this.getDao();
        return dao.insert<T>(item, options);
    }

    async update<T>(item:any, options = {}) {
        // logger.trace('entered into Service.insert', options);
        let dao = this.getDao();
        return dao.update<T>(item, options);
    }

    // async insertAll(items:[any], options = {}) {
    //     // logger.trace('entered into Service.insertAll', options);
    //     let dao = this.getDao();
    //     return dao.insertAll(items, options);
    // }  
}