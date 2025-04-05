## Renderizando views no express
Para renderizar arquivos com html no express usamos uma engine para isso

Existem várias, porém aqui estamos usando a **ejs**

Para definir que vamos usar isso, temos que configurar no arquivo principal:
```js
const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs') // definindo a engine
app.set('views', path.resolve(__dirname, "src", "views")) // definindo onde buscar os arquivos das views
```

A função `set` é usada para definir configurações, ela aceita dois argumentos: `setting` e `val` (a config. e o valor associado a ela)

No caso das views, definimos qual engine usar e onde estão localizadas os arquivos das views.

Dentro da pasta *src/views* podemos criar arquivos com a extensão `.ejs` e escrever htmld dentro deles.

Caso queiramos renderiza-los em alguma controller, podemos usar a função `render()` para isso:
```js
exports.homeController = (req, res) => {
    res.render('index') // Nome do arquivo na pasta views (sem extensão)
}
```