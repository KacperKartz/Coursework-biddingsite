const db = require('../db');


const Products = {
  async getAllProducts() {
    return await db.query('SELECT * FROM products');
  },


  async addProduct(data) {
    const { title, description, price, image, category, bidTimer } = data;
  
    const result = await db.query(
      'INSERT INTO products (title, description, price, category, image, bidding_end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, category, image, bidTimer]
    );
  
    return result.rows[0];
  },
  async getProductById(productId) {
    return await db.query('SELECT * FROM products WHERE id = $1', [productId]);
  },

  async getProductReviews(productId) {
    const query = `
      SELECT reviews.rating, reviews.comment, reviews.created_at, users.username
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.product_id = $1
      ORDER BY reviews.created_at DESC
    `;
    return db.query(query, [productId]);
  },

  //// Create a new review for a product
  async createProductReview({ userId, productId, rating, comment }) {
    const query = `
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, productId, rating, comment];
    return db.query(query, values);
  }

};


module.exports = Products;
