const express = require('express')
const router = express.Router()
const {checkCsrfToken} = require('./src/middlewares/global')

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

router.get('/', homeController.index)

router.get('/login', loginController.renderLogin)
router.get('/login/createAccount', loginController.renderCreateAccount)
router.post('/login/createAccount', loginController.createAccount)

module.exports = router