const express = require('express');
require('express-async-errors');
const prodRoute = require('./routes/productRoutes');
const saleRoute = require('./routes/saleRoutes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação

app.use('/products', prodRoute);
app.use('/sales', saleRoute);

app.use((err, _req, res, _next) => {
  console.log(err);
  const { details, message } = err;
  switch (details[0].type) {
    case 'number.min': res.status(422).json({ message }); break;
    case 'string.min': res.status(422).json({ message }); break;
    case 'any.required': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

module.exports = app;