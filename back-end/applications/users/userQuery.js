const SqlStr = require('sqlstring')

// return an array of matching condition or an empty one
let getUserByUsername = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.username]
    var query = SqlStr.format(`SELECT * FROM Users WHERE username = ?`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let createUser = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
    displayName: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.username, params.password, params.displayName]
    var query = SqlStr.format(`INSERT INTO Users (username, password, displayName) values (?, ?, ?)`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let updateUser = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    password: undefined,
    displayName: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.password, params.displayName, params.userId]
    var query = SqlStr.format(`UPDATE Users SET password = ?, displayName = ? WHERE id = ?`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let checkUsernamePassword = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.password, params.displayName]
    let query = SqlStr.format(`SELECT * FROM Users WHERE username = ? AND password = ?`, queryParams)
    params?.connection?.query(query, (err, user) => {
      if (err) {
        console.log('checkUsernamePassword error: ', err)
        resolve(null)
      }
      resolve(user)
    })
  })
}

// public exports
exports.getUserByUsername = getUserByUsername
exports.createUser = createUser
exports.updateUser = updateUser
exports.checkUsernamePassword = checkUsernamePassword
