const Products = require('../models/Products');

const productController = {
  async getProducts(req, res) {
    try {
      const result = await Products.getAllProducts();
      res.json(result.rows);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }, 

  async addProduct(req, res) {
    const { title, description, price, image, category, bidTimer} = req.body;

    try {
      const newProduct = await Products.addProduct({ title, description, price, image, category, bidTimer });
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async getProductById(req, res) {
    const { productId } = req.params;

    try {
      const result = await Products.getProductById(productId);
      if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

};
module.exports = productController;
