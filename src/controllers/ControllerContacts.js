const ModelContacts = require('../models/ModelContacts')

exports.renderContacts = (req, res, next) => {
    res.render('createContacts')
}

exports.register = async (req, res, next) => {
    const result = await ModelContacts.create(req.body)

    if(!result.success) {
        req.flash('errors', result.errors)
        return req.session.save(() => {    
            return res.redirect('/contacts')
        })
    }

    req.flash('success', result.message)
    return req.session.save(() => {
        return res.redirect(`/contacts/update/${result.contact._id}`)
    })
}

exports.validateLogin = (req, res, next) => {
    if(!req.session.login) {
        return res.redirect('/account/login')
    }
    return next()
}

exports.viewContact = async (req, res, next) => {
    if(!req.params.id || typeof req.params.id !== 'string') return res.redirect('404');

    const contact = await ModelContacts.findContact(req.params.id)
        .then((result) => {
            console.log(result);
            res.render("editContacts", { contact: result })
        })
        .catch((err) => {
            return res.redirect('/404')
        })
}

exports.editById = async (req, res, next) => {
    const result = await ModelContacts.changeContact(req.body)
        .then((result) => {
            if(result.modifiedCount > 0) {
                req.flash("success", ["Contato alterado com sucesso!"])
                return req.session.save(() => {
                    return res.redirect(`/contacts/update/${req.body._id}`)
                })
            }
        })
        .catch((err) => {
            req.flash("error", ["Erro ao alterar contato!"])
                return req.session.save(() => {
                    return res.redirect(`/contacts/update/${req.body._id}`)
            })
        })


}

exports.deleteById = async (req, res, next) => {
    const result = await ModelContacts.deleteContactById(req.params.id)
        .then((result) => {
            req.flash("success", ["Contato excluído com sucesso!"])
            return req.session.save(() => {
                return res.redirect('/')
            })
        })
        .catch((error) => {
            console.log(error);
            req.flash("errro", ["Erro ao excluír contato!"])
            return req.session.save(() => {
                return res.redirect('/')
            })
        })
}