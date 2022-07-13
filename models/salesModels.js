const connection = require('./connection');

const saleModel = {
  exists: async (id) => {
    const sql = 'SELECT 1 FROM StoreManager.sales WHERE id = ?;';
    const [result] = await connection.query(sql, [id]);
    return result;
  },
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
  getAllSales: async () => {
    const sql = `SELECT SA.id, SA.date, SL.product_id, SL.quantity FROM StoreManager.sales AS SA
      INNER JOIN StoreManager.sales_products AS SL
	    ON SA.id = SL.sale_id
      ORDER BY SA.id ASC, SL.product_id ASC;`;
    const [sales] = await connection.query(sql);
    return sales;
  },
  getOneSale: async (id) => {
    const sql = `SELECT SA.id, SA.date, SL.product_id, SL.quantity FROM StoreManager.sales AS SA
      INNER JOIN StoreManager.sales_products AS SL
	    ON SA.id = SL.sale_id
      WHERE SA.id = ?
      ORDER BY SA.id ASC, SL.product_id ASC;`
    const [sale] = await connection.query(sql, [id]);
    return sale;
  }
};

module.exports = saleModel;