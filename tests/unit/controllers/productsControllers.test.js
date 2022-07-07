const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productsControllers');
const productService = require('../../../services/productsServices');
const { response } = require('express');

const ONE_PROD = [{
    id: 1,
    name: "Martelo de Thor",
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

// const makeRes = () => {
//   const res = {
//     status: sinon.stub().callsFake(() => res),
//     json: sinon.stub().returns(),
//     sendStatus: sinon.stub().returns(),
//   };
//   return res;
// };

describe('03 - CONTROLLER', () => {
  describe('01 - lista todos os produtos', () => {
    const req = {};
    const res = {};

    before(() => {
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

    before(() => {
      req.params = { id: 1 }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(); 
    });

    it('status 200', async () => {
      sinon.stub(productService, 'ifExists').resolves();
      sinon.stub(productService, 'getById').resolves(ONE_PROD);

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um produto', async () => {
      await productController.getById(req, res);

      expect(res.json.calledWith(ONE_PROD)).to.be.equal(true);
    })
  })
})