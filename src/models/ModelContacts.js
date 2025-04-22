const mongoose = require("mongoose");
const validator = require("validator")

const Contact = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: false, default: ''},
    cellPhone: {type: Number, required: false, default: ''},
    email: {type: String, required: false, default: ''}
});

const ContactModel = mongoose.model("Contact", Contact);
exports.ContactModel = ContactModel

exports.create = async (data) => {
    const errors = exports.validate(data)
    console.log("Erros: ", errors.length);
    if(errors.length > 0) return {success: false, errors}

    try {
        const contact = await ContactModel.create(data)
        return {success: true, message: ["Contato cadastrado com sucesso"], contact}
    } catch(e) {
        console.log(e);
        return {success: false, errors: ["Erro ao criar contato"]}
    }
}

exports.validate = (data) => {
    let errors = [];

    if (!data.name) {
        errors.push("Informe um nome");
    }
    if (data.email && !validator.isEmail(data.email)) {
        errors.push("Informe um email válido");
    }
    if(!data.email && !data.cellPhone) {
        errors.push("Informe um telefone ou email")
    }

    return errors;
};

exports.findContact = async (id) => {
    return await ContactModel.findById(id)
}

exports.changeContact = async (data) => {
    return await ContactModel.updateOne(
        {_id: data._id}, 
        {...data}
    )
}

exports.deleteContactById = async (id) => {
    return await ContactModel.deleteOne({_id: id})
}