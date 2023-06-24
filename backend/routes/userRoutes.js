const express = require('express')
const router = express.Router()
const { loginController , registerController , logoutController} = require('../controllers/userController')

//route for logging in
router.route('/login').post(loginController)

//route for registering an account
router.route('/register').post(registerController)

//route to logout user
router.route('/logout').get(logoutController)



module.exports = router