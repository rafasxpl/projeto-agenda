const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const Schema = mongoose.Schema;
const validator = require("validator");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

const User = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "O campo email é obrigatório"],
        validate: {
            validator: validator.isEmail,
            message: "Informe um email válido",
        },
    },
    password: {
        type: String,
        required: [true, "O campo senha é obrigatório"],
        minlength: [3, "A senha deve ter no mínimo 3 caracteres"],
        maxlength: [50, "A senha deve ter no máximo 50 caracteres"],
    },
});

User.plugin(mongooseFieldEncryption, {
    fields: ["password"],
    secret: process.env.SECRET_KEY,
    saltGenerator(secret) {
        return CryptoJS.AES.encrypt(secret, process.env.SECRET_KEY).toString().slice(0,16)
    }
})

const UserModel = mongoose.model("User", User);
const query = UserModel.find()

const sanitizeData = (data) => {
    return {
        email: data.email ? data.email.trim() : "",
        password: data.password ? data.password.trim() : "",
    };
};

exports.validate = (data) => {
    let errors = [];

    if (!data.password) {
        errors.push("Informe alguma senha");
    } else if (data.password.length < 3 || data.password.length > 50) {
        errors.push("A senha deve ter entre 3 e 50 caracteres");
    }

    if (!data.email) {
        errors.push("Informe um email");
    } else if (!validator.isEmail(data.email)) {
        errors.push("Informe um email válido");
    }

    return errors;
};

exports.verifyUser = async (data) => {
    const verify = await query.find({email: data.email})
    return verify
}

exports.register = async (data) => {
    data = sanitizeData(data);

    const errors = exports.validate(data);

    if (errors.length > 0) return { success: false, errors };

    let verifyUser = await query.find({email: data.email}).clone()

    if(verifyUser.length > 0) return { success: false, errors: ["Já existe um usuário cadastrado com esse email."] };

    try {
        await UserModel.create(data);
        return { success: true, message: ["Usuário registrado com sucesso!"] };
    } catch (e) {
        console.log(e);
        return { success: false, errors: ["Erro ao salvar no banco de dados"] };
    }
};

exports.decryptPassword = (data) => {
    let bytes  = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
    let sla = bytes.toString(CryptoJS.enc.Utf8);
    console.log(sla);
}

exports.login = async (data) => {
    let verifyUser = await query.findOne({email: data.email}).clone()
    console.log(verifyUser);
    
    if(verifyUser.length === 0) return { success: false, errors: ["Usuário não encontrado"] };

    const email = verifyUser.email
    const password = verifyUser.password
    console.log(password);

    if(password !== data.password && email !== data.email) {
        return { success: false, errors: ["Usuário não encontrado"] };
    }

    return {success: true, message: ["Login realizado com sucesso!"]};
}