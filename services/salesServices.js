const Joi = require("joi");

const saleModel = require("../models/salesModels");

const saleService = {
  bodyValidate: async (data) => {
    const schema = Joi.array().items(Joi.object({
      productId: Joi.number().required().label('productId'),
      quantity: Joi.number().min(1).integer().required().label('quantity'),
    }));
    const result = await schema.validateAsync(data);
    // if (result.error) throw result.message;
    return result;
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
  }
};

module.exports = saleService;