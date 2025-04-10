require("dotenv").config()
const connectionDatabase = require("./src/database/databaseConfig")

const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')
const flash = require('connect-flash')
const helmet = require('helmet')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const {insertCsrfToken, checkCsrfToken, errors} = require('./src/middlewares/global')
const sessionConfig = require('./src/session/sessionConfig')

connectionDatabase(app);

app.use(session({
    secret: 'secret-key',
    store: MongoStore.create({ mongoUrl: process.env.STR_CONNECTION }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// app.use(sessionConfig)
app.use(flash())
app.use(helmet())

app.set('view engine', 'ejs')
app.set('views', [
    path.resolve(__dirname, "src", "views"),
    path.resolve(__dirname, "src", "views", "account")
])

app.use(express.static(path.resolve(__dirname, "public")))

// app.use(insertCsrfToken)
app.use(errors)
app.use(routes)
// app.use(checkCsrfToken)

app.on('ready', () => {
    app.listen(process.env.PORT, () => {
    console.log(`Ouvindo na http://localhost:${process.env.PORT}`)
    })
})