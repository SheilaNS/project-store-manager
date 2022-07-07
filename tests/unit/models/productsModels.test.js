const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModels');

describe('01 - MODEL', () => {
  const productResponse = [{
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
    }];
    
  describe('quando a consulta é bem sucedida', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('retorna um array com 3 produtos', async () => {
      sinon.stub(connection, 'query').resolves([productResponse]);
      const response = await productModel.getAll();
      expect(response).to.be.a('array');
      expect(response).to.have.length(3);
    });
    it('retorna um objeto com 1 produto', async () => {
      sinon.stub(connection, 'query').resolves([productResponse]);
      const response = await productModel.getById(1);
      expect(response).to.be.a('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
    });
    it('verifica se o produto existe no BD', async () => {
      sinon.stub(connection, 'query').resolves([[productResponse]]);
      const response = await productModel.exists(1);
      expect(response).to.be.a('array');
      expect(response).to.have.length(1);
    });
  });
});