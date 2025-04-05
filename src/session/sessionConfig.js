const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = session({
    secret: 'secret-key',
    store: MongoStore.create({ mongoUrl: process.env.STR_CONNECTION }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
});

module.exports = sessionConfig;