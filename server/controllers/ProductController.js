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

};
module.exports = productController;
