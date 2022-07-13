const Joi = require('joi');
const { throwNotFoundError } = require('../errors/NotFoundError');

const saleModel = require('../models/salesModels');

const saleService = {
  bodyValidate: async (data) => {
    const schema = Joi.array().items(Joi.object({
      productId: Joi.number().required().label('productId'),
      quantity: Joi.number().min(1).integer().required()
        .label('quantity'),
    }));
    const result = await schema.validateAsync(data);
    // if (result.error) throw result.message;
    return result;
  },
    ifExists: async (id) => {
    const exists = await saleModel.exists(id);
    if (!exists.length) throwNotFoundError('Sale not found');
  },
  createSale: async () => {
    const id = await saleModel.createSale();
    return id;
  },
  createSaleProd: async (id, prodId, quantity) => {
    await saleModel.createSaleProd(id, prodId, quantity);
  },
  getSaleById: async (id) => {
    const sale = await saleModel.getSaleById(id);
    return sale;
  },
  getAllSales: async () => {
    const sales = await saleModel.getAllSales();
    return sales;
  },
  getOneSale: async (id) => {
    const sale = await saleModel.getOneSale(id);
    return sale;
  },
};

module.exports = saleService;