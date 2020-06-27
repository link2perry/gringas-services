var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Loader = require('@sei-atl/load-sql');
var mysql = require('mysql');
// const log4js = require('log4js');
// const logger = log4js.getLogger();
// logger.level = process.env.loggerLevel || 'error';
/**
 * @description Abstract base class for handling database interactions
 */
var MysqlDao = /** @class */ (function () {
    function MysqlDao(options) {
        if (options === void 0) { options = {}; }
        if (options) {
            this.dbConfig = options.dbConfig;
        }
        this.sqlDir = this.getSqlDir();
        this.sqlDir = this.sqlDir.endsWith('/') ? this.sqlDir : this.sqlDir + "/";
        this.loadSql = new Loader(this.sqlDir);
    }
    MysqlDao.prototype.openConnection = function () {
        if (this.dbConfig) {
            return mysql.createConnection(this.dbConfig);
        }
        else {
            throw new Error('Cannot open a connection, no database configuration has been provided');
        }
    };
    MysqlDao.prototype.getConnection = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (succeed, fail) {
            if (options.useConnection) {
                succeed(options.useConnection);
            }
            else {
                try {
                    succeed(_this.openConnection());
                }
                catch (err) {
                    fail(err);
                }
                ;
            }
        });
    };
    MysqlDao.prototype.commit = function (tx) {
        if (tx === void 0) { tx = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, tx.commit(function (err) {
                        if (err) {
                            if (!tx.rolledBack) {
                                tx.rollback(function (err2) {
                                    if (err2) {
                                        throw err2;
                                    }
                                    else {
                                        throw err;
                                    }
                                });
                            }
                            else {
                                throw err;
                            }
                        }
                        //commit automatically releases the connection back into the pool, no need to close
                    })];
            });
        });
    };
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
    MysqlDao.prototype.getSqlDir = function () {
        throw new Error('Initialization Error: must implement getSqlDir');
    };
    MysqlDao.prototype.getAll = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // logger.trace('entered MssqlDao.getAll', options);
                options = Object.assign({
                    sql: 'getAll',
                    countSql: 'getAllCount'
                }, options);
                return [2 /*return*/, this.query(options)];
            });
        });
    };
    MysqlDao.prototype.getAllCount = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // logger.trace('entered MssqlDao.getAllCount', options);
                options = Object.assign({
                    sql: 'getAllCount'
                }, options);
                return [2 /*return*/, this.query(options)];
            });
        });
    };
    MysqlDao.prototype.getById = function (id, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // logger.trace('entered MssqlDao.getById', options);
                options = Object.assign({
                    sql: 'getById',
                    params: id
                }, options);
                return [2 /*return*/, this.queryOne(options)];
            });
        });
    };
    MysqlDao.prototype.insert = function (item, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // logger.trace('entered MssqlDao.insert', options);
                if (item) {
                    options = Object.assign({
                        sql: 'insert'
                    }, options);
                    return [2 /*return*/, this.query(options)];
                }
                else {
                    throw new Error('An object to insert is required, but none was provided.');
                }
                return [2 /*return*/];
            });
        });
    };
    MysqlDao.prototype.update = function (item, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // logger.trace('entered MssqlDao.insert', options);
                if (item) {
                    options = Object.assign({
                        sql: 'update'
                    }, options);
                    return [2 /*return*/, this.query(options)];
                }
                else {
                    throw new Error('An object to update is required, but none was provided.');
                }
                return [2 /*return*/];
            });
        });
    };
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
    MysqlDao.prototype.queryOne = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // logger.trace('entered Dao.queryOne');
        return new Promise(function (succeed, fail) {
            _this.query(options)
                .then(function (result) {
                if (result) {
                    succeed(result.data && Array.isArray(result.data) ? result.data[0] : result[0]);
                }
                else {
                    succeed(null);
                }
            }, function (err) {
                // logger.error(err);
                fail(err);
            }).catch(function (err) {
                // logger.error(err);
                fail(err);
            });
        });
    };
    MysqlDao.prototype.query = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
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
        return new Promise(function (succeed, fail) {
            _this.loadSql.load(options.sql, options)
                .then(function (result) {
                var sql = result.sql;
                var params = result.params;
                // logger.trace('sql', sql);
                var extractor = options.resultSetExtractor;
                var rowMapper = options.rowMapper;
                var con = options.useConnection;
                var shouldClose = (typeof con === 'undefined' || con === null);
                if (!con) {
                    con = mysql.createConnection(_this.dbConfig);
                    // logger.trace('no connection was supplied, created own');
                }
                if (params) {
                    if (options.params) {
                        if (!Array.isArray(options.params)) {
                            options.params = [options.params];
                        }
                        params = options.params.concat(params);
                    }
                    // logger.trace('params', params);
                    con.query(sql, params, function (err, rows) {
                        if (err)
                            throw err;
                        _this.loadSql.load(options.countSql)
                            .then(function (result) {
                            var sql = result.sql;
                            con.query(sql, options.params, function (err2, rows2) {
                                if (shouldClose) {
                                    con.end();
                                }
                                if (err2)
                                    throw err2;
                                if (extractor) {
                                    rows = extractor.extractData(rows);
                                }
                                else if (rowMapper) {
                                    rows = rows.map(function (row) { return rowMapper.mapRow(row); });
                                }
                                var data = {
                                    pages: Math.ceil(rows2[0].count / params[1]),
                                    data: rows
                                };
                                if (err) {
                                    // logger.error(err);
                                    fail(err);
                                }
                                succeed(data);
                            });
                        });
                    });
                }
                else {
                    con.query(sql, options.params, function (err, rows) {
                        if (shouldClose) {
                            con.end();
                        }
                        if (err) {
                            // logger.error(err);
                            fail(err);
                        }
                        if (extractor) {
                            rows = extractor.extractData(rows);
                        }
                        else if (rowMapper) {
                            rows = rows.map(function (row) { return rowMapper.mapRow(row); });
                        }
                        // logger.trace('result', rows);
                        succeed(rows);
                    });
                }
            });
        });
    };
    return MysqlDao;
}());
export default MysqlDao;
//# sourceMappingURL=../../src/src/dao/MysqlDao.js.map