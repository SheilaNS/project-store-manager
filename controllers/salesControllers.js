const productService = require('../services/productsServices');
const saleService = require('../services/salesServices');

const saleController = {
  create: async (req, res) => {
    const saleData = req.body;
    await saleService.bodyValidate(saleData);
    // saleData.forEach(async (elem) => await saleService.bodyValidate(elem));
    const exists = saleData.map(({ productId }) => productService.ifExists(productId));
    await Promise.all(exists);
    const id = await saleService.createSale();
    const insert = saleData.map(({ productId, quantity }) => saleService
      .createSaleProd(id, productId, quantity));
    await Promise.all(insert);
    const response = {
      id,
      itemsSold: saleData,
    };
    res.status(201).json(response);
  },
  getAllSales: async (_req, res) => {
    const sales = await saleService.getAllSales();
    const rightSales = sales.map((elem) => {
      const rightSale = {
        saleId: elem.id,
        date: elem.date,
        productId: elem.product_id,
        quantity: elem.quantity,
      };
      return rightSale;
    });

    res.status(200).json(rightSales);
  },
  getOneSale: async (req, res) => {
    const { id } = req.params;
    await saleService.ifExists(id);
    const sale = await saleService.getOneSale(id);
    const salesWithNoId = sale.map((elem) => {
      const saleWithNoPass = {
        date: elem.date,
        productId: elem.product_id,
        quantity: elem.quantity,
      };
      return saleWithNoPass;
    });
    res.status(200).json(salesWithNoId);
  },
};

module.exports = saleController;