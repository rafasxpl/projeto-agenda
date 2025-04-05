const express = require('express')
const router = express.Router()
const {checkCsrfToken} = require('./src/middlewares/global')

const homeController = require('./src/controllers/homeController')
const userController = require('./src/controllers/userController')

router.post('/', homeController.homeController)
router.get('/', homeController.homeController)
router.get('/user/:id/:name', userController.userController)

module.exports = router