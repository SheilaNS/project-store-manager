const Joi = require('joi');
const productModel = require('../models/productsModels');
const { throwNotFoundError } = require('../errors/NotFoundError');

const productService = {
  bodyValidate: async (data) => {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });
    const result = await schema.validateAsync(data);
    return result;
  },
  ifExists: async (id) => {
    const exists = await productModel.exists(id);
    if (!exists.length) throwNotFoundError('Product not found');
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
  delete: async (id) => {
    await productModel.delete(id);
  },
};

module.exports = productService;