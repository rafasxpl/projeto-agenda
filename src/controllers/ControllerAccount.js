const flash = require('connect-flash')
const { register, login, decryptPassword } = require('../models/ModelAccount')

exports.renderLogin = (req, res, next) => {
    res.render('login')
}

exports.renderCreateAccount = (req, res, next) => {
    res.render('createAccount')
}

exports.createAccount = async (req, res, next) => {
    const result = await register(req.body)

    if(!result.success) {
        return req.session.save(() => {    
            req.flash('errors', result.errors)
            return res.redirect('/account/createAccount')
        })
    }

    req.session.save(() => {
        req.flash('success', result.message)
        res.redirect('/account/login')
    })
}

exports.validateLogin = (req, res, next) => {
    if(req.session.login) {
        return res.redirect('/')
    }
    
    return next()
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Erro ao destruir a sessão:', err);
            return res.status(500).send('Erro ao encerrar a sessão.');
        }
        res.redirect('/account/login');
    });
}

exports.login = async (req, res, next) => {
    try {
        const result = await login(req.body)
        console.log(result.success);
    
        if(result.success) {
            return req.session.save(() => {
                req.session.login = true
                res.redirect('/')
            })
        }
    } catch(e) {
        console.log(e);
    }
}

exports.sla = (req, res, next) => {
    res.send("foi carajo")   
}

exports.list = (req, res, next) => {
    res.send()
}