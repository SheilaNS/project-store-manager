const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';
    const [result] = await connection.query(sql);
    return result;
  },
  getById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [[result]] = await connection.query(sql, [id]);
    return result;
  },
  exists: async (id) => {
    const sql = 'SELECT 1 FROM StoreManager.products WHERE id = ?;';
    const [result] = await connection.query(sql, [id]);
    return result;
  },
  create: async (name) => {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?);';
    const [{ insertId }] = await connection.query(sql, [name]);
    return insertId;
  },
};

module.exports = productModel;