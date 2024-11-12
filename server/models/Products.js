const db = require('../db');


const Products = {
  async getAllProducts() {
    return await db.query('SELECT * FROM products');
  },


  async addProduct(data) {
    const { title, description, price, image, category, bidding_end_date, userId } = data;
  
    const result = await db.query(
      'INSERT INTO products (title, description, price, category, image, bidding_end_date, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, price, category, image, bidding_end_date, userId]
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
  },

  async retrieveSellingProducts(userId){
    return await db.query(
    'SELECT * FROM products WHERE seller_id = $1', [userId]);
},
async updateProductRatings() {
  const query = `
    UPDATE products
    SET 
      rating_rate = COALESCE(subquery.rating_rate, 0),
      rating_count = COALESCE(subquery.rating_count, 0)
    FROM (
      SELECT 
        product_id,
        COUNT(rating) AS rating_count,
        AVG(rating) AS rating_rate
      FROM 
        reviews
      GROUP BY 
        product_id
    ) AS subquery
    WHERE products.id = subquery.product_id;
  `;
  await db.query(query);
}


};


module.exports = Products;
