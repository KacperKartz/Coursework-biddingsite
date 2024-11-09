const client = require('../db');

const Products = {
  async getAllProducts() {
    return await client.query('SELECT * FROM products');
  },


  async addProduct(data) {
    const { title, description, price, image, category, bidTimer } = data;
  
    const result = await client.query(
      'INSERT INTO products (title, description, price, category, image, bidding_end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, category, image, bidTimer]
    );
  
    return result.rows[0];
  },
  async getProductById(productId) {
    return await client.query('SELECT * FROM products WHERE id = $1', [productId]);
  }
  
};


module.exports = Products;
