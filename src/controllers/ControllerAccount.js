const Account = require('../models/ModelAccount')
const flash = require('connect-flash')
const {register} = require('../models/ModelAccount')

exports.renderLogin = (req, res, next) => {
    res.render('login')
}

exports.renderCreateAccount = (req, res, next) => {
    res.render('createAccount')
}

exports.createAccount = async (req, res, next) => {
    const result = await register(req.body)

    if(!result.success) {
        req.flash('errors', result.errors)

        return req.session.save(() => res.redirect('/account/createAccount'))
    }

    res.redirect('/account/login')
}

exports.login = (req, res, next) => {
    
}

exports.sla = (req, res, next) => {
    res.send("foi carajo")   
}

exports.list = (req, res, next) => {
    res.send()
}