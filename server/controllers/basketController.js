const BasketModel = require('../models/basketModel');

const BasketController = {
  async getBasket(req, res) {
    const { userId } = req.params;
    try {
      const result = await BasketModel.getUserBasket(userId);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch basket items' });
    }
  },

  async addItem(req, res) {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
      const basketId = await BasketModel.findOrCreateBasket(userId);
      const itemResult = await BasketModel.getItem(basketId, productId);

      if (itemResult.rows.length > 0) {
        const newQuantity = itemResult.rows[0].quantity + quantity;
        await BasketModel.updateItemQuantity(itemResult.rows[0].id, newQuantity);
      } else {
        await BasketModel.addItem(basketId, productId, quantity);
      }

      res.status(200).json({ message: 'Item added to basket' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item to basket' });
    }
  },

  async updateItemQuantity(req, res) {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    try {
      await BasketModel.updateItemQuantity(itemId, quantity);
      res.status(200).json({ message: 'Item quantity updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update item quantity' });
    }
  },

  async removeItem(req, res) {
    const { userId, itemId } = req.params;

    try {
      await BasketModel.removeItem(userId, itemId);
      res.status(200).json({ message: 'Item removed from basket' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to remove item from basket' });
    }
  },
};

module.exports = BasketController;
