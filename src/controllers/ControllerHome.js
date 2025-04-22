const HomeModel = require('../models/ModelHome')

exports.index = async (req, res) => {
    const contacts = await HomeModel.getAllContacts();

    res.render('index', {
        contacts
    })
}

exports.validateLogin = (req, res, next) => {
    if(!req.session.login) {
        return res.redirect('/account/login')
    }
    return next()
}