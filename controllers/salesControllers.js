const productService = require("../services/productsServices");
const saleService = require("../services/salesServices");

const saleController = {
  create: async (req, res) => {
    const saleData = req.body;
    await saleService.bodyValidate(saleData);
    // saleData.forEach(async (elem) => await saleService.bodyValidate(elem));
    const exists = saleData.map(({ productId }) => {
      productService.ifExists(productId);
    });
    await Promise.all(exists);
    const id = await saleService.createSale();
    const insert = saleData.map(({ productId, quantity }) => {
      saleService.createSaleProd(id, productId, quantity);
    });
    await Promise.all(insert);
    const response = {
      id,
      itemsSold: saleData
    }
    res.status(201).json(response);
  },
};

module.exports = saleController;