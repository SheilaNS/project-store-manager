const { Router } = require('express');
const productController = require('../controllers/productsControllers');

const productRoute = Router();

productRoute.get('/:id', productController.getById);
productRoute.get('/', productController.getAll);

productRoute.post('/', productController.createProd);

module.exports = productRoute;