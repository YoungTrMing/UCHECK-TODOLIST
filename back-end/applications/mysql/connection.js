const mysql = require('mysql')
const mysqlConfig = require('./mysqlConfig')

exports.connect = () => {
  let connection = mysql.createConnection(mysqlConfig.db)
  connection.connect(err => {
    err && console.log(err)
  })
  return connection
}
