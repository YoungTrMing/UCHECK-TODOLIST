const jwt = require("jsonwebtoken")
const mysqlConnection = require('../mysql/connection')
const message = require('../utilities/message')
const authQuery = require('./authQuery')
const userQuery = require('../users/userQuery')

let generateAccessToken = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  let info = {
    id: params.userId,
    username: params.username,
    displayName: params.displayName,
  }
  return jwt.sign(info, "mySecretKey", {expiresIn: "1h"})
}

let generateRefreshToken = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  let info = {
    id: params.userId,
    username: params.username,
    displayName: params.displayName,
  }
  return jwt.sign(info, "myRefreshSecretKey")
}

let login = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let connection = mysqlConnection.connect()
    let user = await userQuery.checkUsernamePassword({username: params.username, password: params.password, connection})

    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      // save refresh token for loged in user
      connection.beginTransaction()
      let saveRefreshTokenRes = await authQuery.saveRefreshToken({
        userId: user.id,
        refreshToken
      })

      connection.commit()
      connection?.end()
      resolve({
        success: true,
        accessToken,
        refreshToken,
      })
    } else {
      connection?.end()
      resolve({success: false, message: message.incorrectUsernameOrPassword})
    }
  })
}

// public exports
exports.login = login
