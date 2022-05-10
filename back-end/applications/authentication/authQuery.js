const SqlStr = require('sqlstring')

// return an array of matching condition or an empty one
let getRefreshToken = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.userId]
    var query = SqlStr.format(`SELECT * FROM refreshtoken WHERE userid = ?`, queryParams)

    params?.connection?.query(query, (err, refreshTokens) => {
      if (err) {
        console.log(`getRefreshToken error: `, err)
        reject(err)
      }
      resolve(refreshTokens)
    })
  })
}

let saveRefreshToken = (input) => {
  let params = Object.assign({}, {
    refreshToken: undefined,
    userId: undefined,
    connection: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let savedRefreshTokens = await getRefreshToken(params)
    let queryStr = ''
    if (savedRefreshTokens?.length > 0) {
      // for update
      let queryParams = [params.refreshToken, savedRefreshTokens[0].id]
      queryStr = SqlStr.format(`UPDATE RefreshTokens SET refreshToken = ? WHERE id = ?`, queryParams)
    } else {
      // for insert new
      let queryParams = [params.userId, params.refreshToken]
      queryStr = SqlStr.format(`INSERT INTO RefreshTokens (userId, refreshToken) VALUES (?, ?)`, queryParams)
    }

    params?.connection?.query(queryStr, (err, res) => {
      if (err) {
        console.log('saveRefreshToken error: ', err)
        resolve(false)
      }
      resolve(res)
    })
  })
}

// public exports
exports.saveRefreshToken = saveRefreshToken
exports.getRefreshToken = getRefreshToken
