const productService = require('../services/productsServices');

const productController = {
  getAll: async (_req, res) => {
    const products = await productService.getAll();
    res.status(200).json(products);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    await productService.ifExists(id);
    const product = await productService.getById(id);
    res.status(200).json(product);
  },
  createProd: async (req, res) => {
    await productService.bodyValidate(req.body);
    const { name } = req.body;
    const id = await productService.create(name);
    const product = await productService.getById(id);
    res.status(201).json(product);
  },
  deleteProd: async (req, res) => {
    const { id } = req.params;
    await productService.ifExists(id);
    await productService.delete(id);
    res.sendStatus(204);
  },
  editProd: async (req, res) => {
    await productService.bodyValidate(req.body);
    const { id } = req.params;
    await productService.ifExists(id);
    const { name } = req.body;
    await productService.edit(id, name);
    const newProd = await productService.getById(id);
    res.status(200).json(newProd);
  },
};

module.exports = productController;