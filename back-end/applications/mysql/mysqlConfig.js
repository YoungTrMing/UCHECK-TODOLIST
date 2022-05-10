// https://www.db4free.net/phpMyAdmin  => create new or manage free online mysql
const config = {
  db: {
    host: "db4free.net",
    user: "todolistadmin",
    password: "123456789",
    database: "todolistdb",
  },
  // db: {
  //   host: "localhost",
  //   port: "3306",
  //   user: "bena",
  //   password: "123456789",
  //   database: "todolistdb",
  // },
  listPerPage: 25,
}
module.exports = config
