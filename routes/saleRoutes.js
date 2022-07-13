const { Router } = require('express');
const saleController = require('../controllers/salesControllers');

const saleRoute = Router();

saleRoute.post('/', saleController.create);
saleRoute.get('/:id', saleController.getOneSale);
saleRoute.get('/', saleController.getAllSales);

module.exports = saleRoute;