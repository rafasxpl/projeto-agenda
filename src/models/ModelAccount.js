const mongoose = require("mongoose");
const validator = require("validator");

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

const UserModel = mongoose.model("User", User);

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

exports.register = async (data) => {
    data = sanitizeData(data);

    const errors = exports.validate(data);

    if (errors.length > 0) return { success: false, errors };

    try {
        await UserModel.create(data);
        return { success: true, message: "Usuário registrado com sucesso!" };
    } catch (e) {
        console.log(e);
        return { success: false, errors: ["Erro ao salvar no banco de dados."] };
    }
};