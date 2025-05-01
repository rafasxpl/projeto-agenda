const flash = require('connect-flash')

exports.errors = (req, res, next) => {
    res.locals.errors = req.flash('errors') || [];
    res.locals.success = req.flash('success') || [];
    res.locals.contacts = []
    next();
}

exports.validateLogin = (req, res, next) => {
    if(!req.session.login) {
        return res.redirect('/account/login')
    }

    return next()
}