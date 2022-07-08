const Joi = require('joi');
const { runSchema } = require('./validate');
const productModel = require('../models/productsModels');
const NotFound = require('../errors/NotFoundError');
const Name = require('../errors/BodyValidationError');

const productService = {
  idValidate: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),
  bodyValidate: async ({ name }) => {
    if (!name || name.length === 0) {
      throw Name.requiredName('"name" is required');
    }
    if (name.length < 5) {
      throw Name.minName('"name" length must be at least 5 characters long');
    }
  },  ifExists: async (id) => {
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
  create: async (name) => {
    const id = await productModel.create(name);
    return id;
  },
};

module.exports = productService;