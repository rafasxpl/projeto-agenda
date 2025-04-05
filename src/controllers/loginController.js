exports.renderLogin = (req, res, next) => {
    res.render('login')
}

exports.renderCreateAccount = (req, res, next) => {
    res.render('createAccount')
}

exports.createAccount = (req, res, next) => {
    res.send(req.body)
}