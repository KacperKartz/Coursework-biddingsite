const db = require('../db');

const BasketModel = {
  async getUserBasket(userId) {
    return await db.query(
      `SELECT b.id AS basket_id, bi.id AS item_id, bi.product_id, bi.quantity
       FROM basket b
       LEFT JOIN basket_items bi ON b.id = bi.basket_id
       WHERE b.user_id = $1`,
      [userId]
    );
  },


async getBasketItems(userId){
  return await db.query(`
      SELECT 
        basket_items.id AS basket_item_id,
        basket_items.product_id,
        basket_items.price AS item_price,
        basket_items.quantity,
        (basket_items.price * basket_items.quantity) AS total_price,
        products.title AS product_name,      
        products.description,
        products.image               
      FROM 
        basket_items
      JOIN 
        basket ON basket_items.basket_id = basket.id
      JOIN 
        products ON basket_items.product_id = products.id
      WHERE 
        basket.user_id = $1;
    `,[userId]  
  );
},
  

  async createBasket(userId) {
    return await db.query(
      `INSERT INTO basket (user_id) VALUES ($1) RETURNING id`,
      [userId]
    );
  },

  async findOrCreateBasket(userId) {
    let basket = await db.query(
      `SELECT id FROM basket WHERE user_id = $1`,
      [userId]
    );
    if (basket.rows.length === 0) {
      basket = await this.createBasket(userId);
    }
    return basket.rows[0].id;
  },

  async getItem(basketId, productId) {
    return await db.query(
      `SELECT id, quantity FROM basket_items WHERE basket_id = $1 AND product_id = $2`,
      [basketId, productId]
    );
  },

  async addItem(basketId, productId, quantity, price) {
    return await db.query(
      `INSERT INTO basket_items (basket_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
      [basketId, productId, quantity, price]
    );
  },

  async updateItemQuantity(itemId, quantity) {
    return await db.query(
      `UPDATE basket_items SET quantity = $1 WHERE id = $2`,
      [quantity, itemId]
    );
  },

  async removeItem(userId, itemId) {
    return await db.query(
      `DELETE FROM basket_items WHERE id = $1 AND basket_id = (SELECT id FROM basket WHERE user_id = $2)`,
      [itemId, userId]
    );
  },
};

module.exports = BasketModel;
