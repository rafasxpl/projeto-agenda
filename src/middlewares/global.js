const Tokens = require('csrf');
const tokens = new Tokens();

exports.insertCsrfToken = (req, res, next) => {
    const secret = tokens.secretSync();
    req.session.csrfSecret = secret; // Armazena o segredo na sessão
    const token = tokens.create(secret);

    res.locals.csrfToken = token; // Disponibiliza o token para as views

    next();
};

exports.checkCsrfToken = (req, res, next) => {
    const secret = req.session.csrfSecret || null; // Recupera o segredo da sessão
    const token = req.body._csrf || null; // Obtém o token enviado no corpo da requisição

    if (!secret || !tokens.verify(secret, token)) {
        return res.status(403).send('Token CSRF inválido ou ausente!');
    }

    next();
};