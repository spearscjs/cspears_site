const mysql = require('mysql');
const { reject } = require('async');
const { resolve } = require('path');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'H@ve_MercY',
    user: 'curt',
    database: 'collections',
    host: 'localhost',
    port: '3306'
});

// INSERT INTO initialBrowserData (data, vitalScore) VALUES ('{"id": 2, "name": "name2"}', "good");

// USING ? instead of ${} to help prevent SQL injection

let db = {}

db.countCookiesOn = () => {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT COUNT(*) AS count FROM initialBrowserData WHERE data->"$.cookieEnabled" = true';
        let a = pool.query(sql,(err,results) => {
                return resolve(results);
        });
    });
};

db.countCookiesOff = () => {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT COUNT(*) AS count FROM initialBrowserData WHERE data->"$.cookieEnabled" = false';
        let a = pool.query(sql,(err,results) => {
                return resolve(results);
        });
    });
};


db.countCookiesEnabledByTime = (hour, cookieEnabled) => {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT COUNT(*) AS count  FROM initialBrowserData WHERE data->"$.hourOfDay" = ? && data-> "$.cookieEnabled" = ?';
        let a = pool.query(sql,[hour,cookieEnabled],(err,results) => {
                return resolve(results);
        });
    });
};




db.all = (metricName) => {
    return new Promise((resolve, reject) => {
        let table = metricName;
        var sql = "SELECT * FROM " + table;
        let a = pool.query(sql,(err,results) => {
                return resolve(results);
           
        });
    });
};

db.one = (metricName, id) => {
    return new Promise((resolve, reject) => {
        let table = metricName;
        var sql = "SELECT * FROM " + table + " where id = ?";
        pool.query(sql, id, (err,results) => {
            if(err) {
                db.error(err);
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

db.del = (metricName, id) => {
    return new Promise((resolve, reject) => {
        let table = metricName;
        var sql = "DELETE FROM " + table + " where id = ?";
        pool.query(sql, id, (err,results) => {
            if(err) {
                db.error(err);
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.add = (ip, metricName, data, vitalScore) => {
    let table = metricName;
    var sql = "INSERT INTO " + table + " (data,vitalScore) VALUES ?";
    data["ip"] = ip;
    console.log(data);
    var values = [
      [JSON.stringify(data), vitalScore]  
    ];
    return new Promise((resolve, reject) => {
        if(!data && !vitalScore) return reject("NO VALID KEYS GIVEN");
        pool.query(sql, [values], (err,results) => {
            if(err) {
                db.error(err);
                return reject(err);
            }
            return resolve(results);
        });
    });
    
};

db.put = (metricName, id, new_data) => {
    return new Promise((resolve, reject) => {
        let result = null; 
        let table = metricName;
        if(!new_data.data && !new_data.vitalScore) {
            return reject("NO VALID KEYS ENTERED");
        }
        //console.log(new_data.data);
        if(new_data.data) {
            var sql = "UPDATE " + table + " SET data = ? WHERE id=?";
            pool.query(sql, [JSON.stringify(new_data.data), id], (err,results) => {
                if(err) {
                    db.error(err);
                    return reject(err);
                }
                result = results;
            });
        }

        if(new_data.vitalScore) {
           //console.log(new_data.vitalScore);
            var sql = "UPDATE " + table + " SET vitalScore = ? WHERE id=?";
            pool.query(sql, [new_data.vitalScore, id], (err,results) => {
                if(err) {
                    db.error(err);
                    return reject(err);
                }
                result = results;
            });
        }
        return resolve(result);

    });
};

db.error = (message) => {
    let table = "errors"
    var sql = "INSERT INTO " + table + " (message) VALUES ?";
    var values = [
      [message]  
    ];
    return new Promise((resolve, reject) => {
        pool.query(sql, [values], (err,results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
    
};




module.exports = db;
