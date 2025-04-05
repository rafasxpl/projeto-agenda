### req.params e req.query
São formas de acessar os parametros enviados via requisição pelo express

##### Params
Os params são argumentos especificados na própria rota, podendo ou não ser obrigatórios:
```js
const express = require('express')
const app = express()

app.get('/users/:idUser', (req, res) => { // idUser é um parametro esperado
    res.send(`User id: ${req.params.idUser}`)
})

app.listen(3000)
```
Para dizer que um parametro não é obrigatório usamos o operador `?` no fim do nome dele:
```js
app.get('/users/:idUser?', (req, res) => {})
```

##### Query
As argumentos que vem na query são do formato `?chave=valor`, podendo ter vários deles, nesse caso o formato muda para a adição de mais variáveis utilizando o operador `&`: `?chave=valor&chave=valor`:

Supondo que temos a URL:

    localhost:3000/findUser&name=rafael

Podemos acessar esses dados no express com:
```js
const express = express()
const app = express()

app.get('/findUser', (req, res) => {
    console.log(`User name: ${req.query.name}`) // User name: rafaelkw
})

app.listen(3000)
```