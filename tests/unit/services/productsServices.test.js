const sinon = require('sinon');
const chai = require('chai');
const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const NotFound = require('../../../errors/NotFoundError');

const productModel = require('../../../models/productsModels');
const productService = require('../../../services/productsServices');
use(chaiAsPromised);

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

describe('02 - SERVICE', () => {
  describe('01 - quando o id do produto é válido', () => {
    it('no ifExists', async () => {
      sinon.stub(productModel, 'exists').resolves(ONE_PROD);
      const response = await productService.ifExists(1)
      expect(response).to.be.equal(undefined);
    })
  });

  describe('02 - quando o id é valido', () => {
    beforeEach(() => {
      sinon.stub(productModel, 'getById').resolves(ONE_PROD)
    });

    afterEach(() => sinon.restore());

    it('retorna um array', async () => {
      const response = await productService.getById(1);
      expect(response).to.be.a('array');
    })
  })
  
  describe('03 - quando a requisição é feita sem um id', () => {
    beforeEach(() => {
      sinon.stub(productModel, 'getAll').resolves(LIST_PROD)
    });

    afterEach(() => sinon.restore());

    it('retorna um array', async () => {
      const response = await productService.getAll();
      expect(response).to.be.a('array');
    })
    it('retorna um array com 3 produtos', async () => {
      const response = await productService.getAll();
      expect(response).to.have.length(3);
    })
  })

  describe('04 - cria um produto', () => {
    beforeEach(() => {
      sinon.stub(productModel, 'create').resolves(4)
    });

    afterEach(() => sinon.restore());

    it('retorna um número', async () => {
      const id = await productService.create('ProdutoX');
      expect(id).to.be.equal(4);
    })
  })

  describe('05 - valida o body da requisição', () => {
    beforeEach(() => {
      sinon.restore();
    });

    afterEach(() => sinon.restore());

    it('deve disparar um erro NotFoundError se o model responder false', () => {
      sinon.stub(productModel, 'exists').resolves(false);
      chai.expect(productService.ifExists(0))
        .to.eventually.be.rejectedWith(NotFound);
    });
    it('deve disparar um erro RequiredName se o model responder false', () => {
      sinon.stub(productService, 'bodyValidate').resolves('"name" is required')
      chai.expect(productService.bodyValidate(''))
        .to.eventually.be.rejectedWith(productService.bodyValidate);
    });
    it('deve disparar um erro MinName se o model responder false', () => {
      sinon.stub(productService, 'bodyValidate').resolves('"name" length must be at least 5 characters long')
      chai.expect(productService.bodyValidate('new'))
        .to.eventually.be.rejectedWith(productService.bodyValidate);
    });
  })
})