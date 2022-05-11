const authModel = require('./authModel')

exports.login = (req, res) => {
  let input = {
    password: req?.body?.password,
    username: req?.body?.username,
  }
  authModel.login(input).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json({success: false, error: err})
  })
}

exports.testApi = (req, res) => {
  res.json({success: true})
}
