const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productsControllers');
const productService = require('../../../services/productsServices');
const { response } = require('express');

const ONE_PROD = [{
    id: 1,
    name: "Martelo de Thor",
}];
  
const NEW_PROD = [{
    id: 4,
    name: "ProdutoX",
  }];

const LIST_PROD = [
    {
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
    }
  ];

describe('03 - CONTROLLER', () => {
  describe('01 - lista todos os produtos', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.restore();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(); 
    });

    it('status 200', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna uma lista', async () => {
      sinon.stub(productService, 'getAll').resolves(LIST_PROD);
      await productController.getAll(req, res);

      expect(res.json.calledWith(LIST_PROD)).to.be.equal(true);
    })
  })

  describe('02 - retorna 1 produto específico', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.restore();
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(); 
    });

    it('status 200 e um produto', async () => {
      sinon.stub(productService, 'ifExists').resolves();
      sinon.stub(productService, 'getById').resolves(ONE_PROD);

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(ONE_PROD)).to.be.equal(true);
    });
  })

  describe('03 - adiciona um produto', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      sinon.restore();
      req.params = { id: 4 };
      req.body = { name: 'ProdutoX' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(); 
    });

    it('status 201', async () => {
      sinon.stub(productService, 'bodyValidate').resolves();
      sinon.stub(productService, 'create').resolves(4);
      sinon.stub(productService, 'getById').resolves(NEW_PROD);

      await productController.createProd(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  })
})