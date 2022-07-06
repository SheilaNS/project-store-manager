// const Joi = require('joi');
const productModel = require('../models/productsModels');
const NotFound = require('../errors/NotFoundError');

const productService = {
  ifExists: async (id) => {
    const exists = await productModel.exists(id);
    if (!exists.length) {
      throw new NotFound('Product not found');
    }
  },
  getById: async (id) => {
    const product = await productModel.getById(id);
    return product;
  },
  getAll: async () => {
    const products = await productModel.getAll();
    return products;
  },
};

module.exports = productService;