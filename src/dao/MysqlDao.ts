import RowMapper from '../mapper/RowMapper';
let Loader = require('@sei-atl/load-sql');
let mysql = require('mysql');
// const log4js = require('log4js');
// const logger = log4js.getLogger();
// logger.level = process.env.loggerLevel || 'error';

/**
 * @description Abstract base class for handling database interactions
 */
export default class MysqlDao {
  dbConfig: any;
  sqlDir: string;
  loadSql: any;

  constructor(options: any = {}) {
    if(options) {
      this.dbConfig = options.dbConfig;
    } 
    this.sqlDir = this.getSqlDir();
    this.sqlDir = this.sqlDir.endsWith('/') ? this.sqlDir : `${this.sqlDir}/`; 
    this.loadSql = new Loader(this.sqlDir);
  }

  openConnection() {
    if(this.dbConfig) {
      return mysql.createConnection(this.dbConfig);
    } else {
      throw new Error('Cannot open a connection, no database configuration has been provided');
    }
  }

  getConnection(options: any = {}) {
    return new Promise((succeed, fail) => {
      if(options.useConnection) {
        succeed(options.useConnection);
      } else {
        try {
          succeed(this.openConnection());
        } catch(err) {
          fail(err);
        };
      }
    });
  }

  async commit(tx: any = {}) {
    return tx.commit((err: any) => {
      if (err) {
        if(!tx.rolledBack) {
          tx.rollback((err2: any) => {
            if(err2) {
              throw err2;
            } else {
              throw err;
            }
          })
        } else {
          throw err;
        }
      }
      //commit automatically releases the connection back into the pool, no need to close
    });
  }
/*
  rollback(tx: any) {
    return new Promise((succeed, fail) => {
      if (tx.rolledBack) {
        succeed();
      } else {
        tx.rollback((err: any) => {
          if(err) {
            console.log('ERROR: ', err);
            fail(err);
          } else {
            succeed();
          }
        });
      }
    })
  }

  maybeCloseConnection(con: any = {}, options: any = {}) {
    return new Promise((succeed, fail) => {
      if(options.useConnection) {
        succeed();
      } else {
        con.end((err: any) => {
          if(err) {
            fail(err);
          } else {
            succeed();
          }
        });
      }
    });
  }

  tryCommitAndMaybeCloseConnection(con: any = {}, options: any = {}) {
    return new Promise((succeed, fail) => {
      con.commit((err: any) => {
        if (err) {
          logger.error(err);
          con.rollback((err2: any) => {
            if(err2) {
              logger.error(err2);
              fail(err2);
            } else {
              fail(err);
            }
          });
        }
        this.maybeCloseConnection(con, options).then(succeed, fail);
      });
    });
  }
*/
  /**
   * @description Utility method to commit and end a database connection
   *
   * @param {Connection} con the database connection
   */
/*  commitAndEnd(con: any) {
    con.commit((err: any) => {
      if (err) {
        console.log('Error: ', err);
        throw err;
      }
      con.end();
    });
  }

  transaction(con: any) {
    if(!con) {
      con = mysql.createConnection(this.dbConfig);
    }
    return {
      con:con,
      tx: new Promise((f,r) => {
        con.beginTransaction((err: any) => {
          if(err) r(err);
          f();
        });
      })
    };
  }

  beginTransaction(con: any, options: any = {}) {
    return new Promise((succeed, fail) => {
      ((typeof con === 'undefined' || con === null) ? this.getConnection(options) : Promise.resolve(con))
      .then(con => {
        con.beginTransaction((err: any) => {
          if(err) {
            logger.error(err);
            fail(err);
          } else {
            succeed(con);
          }
        });   
      });
    });
  }*/

  getSqlDir(): string {
    throw new Error('Initialization Error: must implement getSqlDir');
  }

  async getAll<T>(options = {}) {
    // logger.trace('entered MssqlDao.getAll', options);
    options = Object.assign({
      sql: 'getAll',
      countSql: 'getAllCount'
    }, options);
    return this.query<T>(options);
  }

  async getAllCount<T>(options = {}) {
    // logger.trace('entered MssqlDao.getAllCount', options);
    options = Object.assign({
      sql: 'getAllCount'
    }, options);
    return this.query<T>(options);
  }  

  async getById<T>(id: any, options = {}) {
    // logger.trace('entered MssqlDao.getById', options);
    options = Object.assign({
      sql: 'getById',
      params: id
    }, options);
    return this.queryOne<T>(options);
  }  

  async insert<T>(item: any, options = {}) {
    // logger.trace('entered MssqlDao.insert', options);
    if(item) {
      options = Object.assign({
        sql: 'insert'
      }, options);
      return this.query<T>(options);
    } else {
      throw new Error('An object to insert is required, but none was provided.');
    }
  }

  async update<T>(item: any, options = {}) {
    // logger.trace('entered MssqlDao.insert', options);
    if(item) {
      options = Object.assign({
        sql: 'update'
      }, options);
      return this.query<T>(options);
    } else {
      throw new Error('An object to update is required, but none was provided.');
    }
  }  

  /*async insertAll(items: any, options: any) {
    Object.assign({}, {
      useConnection: null,
      useTransaction: null,
      rollbackOnError: false
    }, options);
    
    let con = await this.getConnection(options);
    let tx;
    if(!options.useTransaction && options.rollbackOnError) {
      tx = options.useTransaction || await this.beginTransaction(con);
    }
    let errors = [];
    for(const item of items) {
      try {
        await this.insert(item, {useConnection: con, useTransaction: tx});
      } catch (err) {
        logger.error(err);
        if(options.rollbackOnError) {
          this.rollback(tx, con, options);
          return {
            errors: [err]
          }
        }
        errors.push(err);
      }
    }
    if(tx) {
      this.commit(tx);
    } else {
      this.maybeCloseConnection(con, options);
    }
    return {
      errors: errors
    }
  }

  delete(item: any, options: any = {}) {
    options = Object.assign({
      sql: 'deleteById'
    }, options);
    return new Promise((succeed, fail) => {
      if(item) {
        options.params = item.id;
        this.query(options).then(succeed, fail).catch(fail);
      } else {
        fail('An item to delete is required, but none was provided.');
      }
    });
  }

  deleteAll(options: any = {}) {
    options = Object.assign({
      sql: 'deleteAll'
    }, options);
    return new Promise((succeed, fail) => {
      let deleteAllResult: any;
      let tx: any;
      (options.useConnection ? Promise.resolve() : this.beginTransaction(options.useConnection))
      .then(transaction => {
        tx = transaction;
        options = Object.assign({ useConnection: tx }, options);
        return this.query(options);
      })
      .then(result => {
        deleteAllResult = result;
        let innerOptions = Object.assign({}, options, { sql: 'resetAutoIncrement' });
        return this.query(innerOptions);
      })
      .then(() => {
        if(tx) {
          this.tryCommitAndMaybeCloseConnection(tx);
        }
        succeed(deleteAllResult);
      }, err => {
        if(tx) {
          tx.rollback(() => {
            fail(err); 
            tx.end();
          });
        }
      })
      .catch(err => {
        if(tx) {
          tx.rollback(() => {
            fail(err); 
            tx.end();
          });
        }
      });
    });
  }*/

  queryOne<T>(options = {}) {
    // logger.trace('entered Dao.queryOne');
    return new Promise((succeed, fail) => {
      this.query<T>(options)
      .then((result: any) => {
        if(result) {
          succeed(result.data && Array.isArray(result.data) ? result.data[0] : result[0]);
        } else {
          succeed(null);
        }
      }, err => {
        // logger.error(err);
        fail(err);
      }).catch(err => {
        // logger.error(err);
        fail(err);
      });
    });
  }

  query<T>(options: any = {}) {
    // logger.trace('entered Dao.query');
    options = Object.assign({}, {
      useConnection: null,
      sql: null,
      labelValueSql: null,
      countSql: null,
      params: null,
      resultSetExtractor: null,
      rowMapper: null,
      format: 'json',
      formats: {
        json: {
          sql: options.sql,
          resultSetExtractor: options.resultSetExtractor,
          rowMapper: options.rowMapper
        },
        'label-value': {
          sql: options.labelValueSql,
          resultSetExtractor: options.resultSetExtractor,
          rowMapper: options.rowMapper
        }
      }
    }, options);

    options = Object.assign({}, options, options.formats[options.format]);
    // logger.trace('options', options);
    return new Promise((succeed, fail) => {
      this.loadSql.load(options.sql, options)
      .then((result: any) => {
        let sql: string = result.sql;
        let params: any = result.params;
        // logger.trace('sql', sql);
        
        let extractor = options.resultSetExtractor;
        let rowMapper = options.rowMapper;
        let con = options.useConnection;
        let shouldClose = (typeof con === 'undefined' || con === null);
        if(!con) {
          con = mysql.createConnection(this.dbConfig);
          // logger.trace('no connection was supplied, created own');
        }
        if(params) {
          if(options.params) {
            if(!Array.isArray(options.params)) {
              options.params = [options.params];
            }
            params = options.params.concat(params);
          }
          // logger.trace('params', params);
          con.query(sql, params, (err: any, rows: any) => {
            if(err) throw err;
            this.loadSql.load(options.countSql)
            .then((result:any) => {
              let sql: string = result.sql;
              con.query(sql, options.params, (err2: any, rows2: any) => {
                if(shouldClose) {
                  con.end();
                }
                if(err2) throw err2;

                if(extractor) {
                  rows = extractor.extractData(rows);
                } else if (rowMapper) {
                  rows = rows.map((row: any) => rowMapper.mapRow(row));
                }

                var data = {
                  pages: Math.ceil(rows2[0].count / params[1]),
                  data: rows
                };
                if(err) {
                  // logger.error(err);
                  fail(err);
                }
                succeed(data);
              });
            });
          });
        } else {
          con.query(sql, options.params, (err: any, rows: any) => {
            if(shouldClose) {
              con.end();
            }
            if(err) {
              // logger.error(err);
              fail(err);
            }
            if(extractor) {
              rows = extractor.extractData(rows);
            } else if (rowMapper) {
              rows = rows.map((row: RowMapper<T>) => rowMapper.mapRow(row));
            }
            // logger.trace('result', rows);
            succeed(rows);
          });
        }
      });
    });    
  }
}