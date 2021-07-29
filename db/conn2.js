var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'bicon',
  password: '@buino',
  database: 'web-inventory'
})

connection.connect()

connection.query('SELECT * from users', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows)
})

connection.end()