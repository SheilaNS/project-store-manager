const { Router } = require('express');
const saleController = require('../controllers/salesControllers');

const saleRoute = Router();

saleRoute.post('/', saleController.create);

module.exports = saleRoute;