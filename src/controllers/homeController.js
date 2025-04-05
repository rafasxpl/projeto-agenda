const HomeModel = require('../models/ModelHome')

exports.homeController = (req, res) => {
    res.render('index')
}