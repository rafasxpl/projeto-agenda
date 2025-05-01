const express = require('express')
const router = express.Router()

const homeController = require('../controllers/ControllerHome')
const loginController = require('../controllers/ControllerAccount')
const contatosController = require('../controllers/ControllerContacts')
const { validateLogin } = require('../middlewares/global')

router.get('/', validateLogin, homeController.index)

// ROUTES FOR "login" AND "createAccount" PAGES
router.get('/account', loginController.renderLogin)
router.get('/account/login', loginController.renderLogin)
router.get('/account/createAccount', loginController.renderCreateAccount)
router.get('/account/logout', loginController.logout)

// ROUTES FOR POST "createAccount" AND "login"
router.post('/account/login', loginController.login)
router.post('/account/createAccount', loginController.createAccount)

// ROUTES FOR "contacts" PAGES
router.get('/contacts', validateLogin, contatosController.renderContacts)

// ROUTES FOR POST "contacts"
router.post('/contacts/register', validateLogin, contatosController.register)

// ROUTES FOR EDIT "contacts"
router.get('/contacts/update/:id', contatosController.viewContact)
router.post('/contacts/update/:id', contatosController.editById)

// ROUTE FOR DELETE "contacts"
router.get('/contacts/delete/:id', contatosController.deleteById)

router.get('/404', (req, res) => res.render('404'))

module.exports = router