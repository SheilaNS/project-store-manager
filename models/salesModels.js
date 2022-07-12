const connection = require('./connection');

const saleModel = {
  createSale: async () => {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (now());';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  createSaleProd: async (id, prodId, quantity) => {
    const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
      VALUES (?, ?, ?);`;
    await connection.query(sql, [id, prodId, quantity]);
  },
  getSaleById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.sales WHERE id = ?;';
    const [[sale]] = await connection.query(sql, [id]);
    return sale;
  },
};

module.exports = saleModel;