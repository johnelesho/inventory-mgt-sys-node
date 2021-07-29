 var sql = require('mariadb');

 var con = sql.creatConnection({
    host: 'localhost',
    user: 'root',
    password: 'buinotech',
    database: 'web-inventory'
 });

 con.connect();