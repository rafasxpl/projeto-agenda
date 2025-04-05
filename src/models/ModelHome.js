const moongose  = require('mongoose')

const HomeSchema = new moongose.Schema({
    nome: {type: String, required: true},
    descricao: String
})

const HomeModel = moongose.model('Home', HomeSchema)

module.exports = HomeModel