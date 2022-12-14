const { Router } = require('express');
const productController = require('../controllers/productsControllers');

const productRoute = Router();

productRoute.delete('/:id', productController.deleteProd);
productRoute.put('/:id', productController.editProd);
productRoute.get('/:id', productController.getById);
productRoute.get('/', productController.getAll);

productRoute.post('/', productController.createProd);

module.exports = productRoute;