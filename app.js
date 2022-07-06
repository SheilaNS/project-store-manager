const express = require('express');
const productController = require('./controllers/productsControllers');
require('express-async-errors');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação

app.get('/products/:id', productController.getById);
app.get('/products', productController.getAll);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

module.exports = app;