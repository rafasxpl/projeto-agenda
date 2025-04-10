const express = require('express')
const router = express.Router()
const {checkCsrfToken} = require('./src/middlewares/global')

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/ControllerAccount')

router.get('/', homeController.index)

// ROUTES FOR "login" AND "createAccount" PAGES
router.get('/account/login', loginController.renderLogin)
router.get('/account/createAccount', loginController.renderCreateAccount)

// ROUTES FOR POST "createAccount" AND "login"
router.post('/account/login', loginController.login)
router.post('/account/createAccount', loginController.createAccount)

module.exports = router