let express = require('express')
let router = express.Router()
let authController = require('../applications/authentication/authController')
let userController = require('../applications/users/userController')

router.post('/auth/login', authController.login)
router.get('/auth/test', authController.testApi)

router.post('/user/regist', userController.regist)
router.post('/user/update', userController.update)


module.exports = router;
