const jwt = require("jsonwebtoken")
const mysqlConnection = require('../mysql/connection')
const message = require('../utilities/message')
const userQuery = require('./userQuery')

let regist = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let connection = mysqlConnection.connect()
    params.connection = connection
    let result = {success: true}
    let users = []
    try {
      users = await userQuery.getUserByUsername({connection, username: params.username})
      console.log('userQuery.getUserByUsername: ', users)
      if (users?.length > 0) {
        result.success = false
        result.message = message.duplicatedUser
      }
    } catch (error) {
      console.log(`getUserByUsername error: `, error)
      result.success = false
      result.message = message.cannotQuery
    }
    // create new account for user
    if (!(users?.length > 0) && result.success) {
      try {
        connection?.beginTransaction()
        await userQuery.createUser(params)
        connection?.commit()
      } catch (error) {
        result.success = false
        result.message = message.cannotCreateUser
      }
    }
    connection?.end()
    resolve(result)
  })
}

let update = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let connection = mysqlConnection.connect()
    params.connection = connection
    let result = {success: true}
    let users = []
    try {
      users = await userQuery.getUserByUsername({connection, username: params.username})
      console.log('update getUserByUsername: ', users)
      if (!(users?.length > 0)) {
        result.success = false
        result.message = message.userIsNotExists
      }
    } catch (error) {
      console.log('user update getUserByUsername error: ', error)
      result.success = false
      result.message = message.cannotQuery
    }
    // create new account for user
    if (users?.length > 0 && result.success) {
      try {
        params.userId = users[0].id
        connection?.beginTransaction()
        await userQuery.updateUser(params)
        connection?.commit()
      } catch (error) {
        console.log('user update updateUser error: ', error)
        result.success = false
        result.message = message.cannotUpdateUser
      }
    }
    connection?.end()
    resolve(result)
  })
}

// public exports
exports.regist = regist
exports.update = update
