const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'bicon',
    password: '@buino',
    database: 'web-inventory',
    connectionLimit: 5
});
/*
var mysql = require('mysql')
var pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'buinotech',
  database: 'web-inventory'
})
pool.connect();
*/


module.exports = pool;