const HomeModel = require('../models/ModelHome')

exports.index = (req, res) => {
    res.render('index')
}

exports.validateLogin = (req, res, next) => {
    console.log(req.session.login);
    if(!req.session.login) {
        return res.redirect('/account/login')
    }
    return next()
}