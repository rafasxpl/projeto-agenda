const moongose = require('mongoose') //facilita a manipulação do banco

module.exports = (app) => {
    moongose.connect(process.env.STR_CONNECTION)
        .then(() => {
            console.log("Connect Sucess");
            app.emit('ready')
        })
        .catch(err => console.error('Database connection failed:', err))
} 