const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'bicon',
    password: '@buino',
    database: 'web-inventory'
});
 
async function asyncFunction() {
  let conn;
  try {
 
    conn = pool.getConnection();
    //const rows = await conn.query("SELECT 1 as val");
    // rows: [ {val: 1}, meta: ... ]
 
    const res =  conn.query("SELECT * from sales");
    console.log('The solution is: ', res)
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
 
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

asyncFunction()