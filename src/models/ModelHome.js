const moongose  = require('mongoose')
const { ContactModel } = require('./ModelContacts')

const HomeSchema = new moongose.Schema({
    nome: {type: String, required: true},
    descricao: String
})

const HomeModel = moongose.model('Home', HomeSchema)

exports.getAllContacts = async (req, res, next) => {
    return await ContactModel.find({})
}