const express = require('express')
const router = express.Router()
const {checkCsrfToken} = require('./src/middlewares/global')

const homeController = require('./src/controllers/ControllerHome')
const loginController = require('./src/controllers/ControllerAccount')

router.get('/', homeController.validateLogin, homeController.index)

// ROUTES FOR "login" AND "createAccount" PAGES
router.get('/account', loginController.renderLogin)
router.get('/account/login', loginController.validateLogin, loginController.renderLogin)
router.get('/account/createAccount', loginController.validateLogin, loginController.renderCreateAccount)
router.get('/account/logout', loginController.logout)


// ROUTES FOR POST "createAccount" AND "login"
router.post('/account/login', loginController.login)
router.post('/account/createAccount', loginController.createAccount)

module.exports = router