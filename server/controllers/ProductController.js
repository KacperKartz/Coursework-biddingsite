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


  async  getProductReviews(req, res) {
    const { productId } = req.params;

    try {
        const result = await Products.getProductReviews(productId);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        res.status(500).json({ error: "Failed to fetch product reviews" });
    }
},


async createProductReview(req, res) {
  const { user_id, rating, comment } = req.body;
  const productId = req.params.productId; 

  if (!user_id || !productId || !rating) {
      return res.status(400).json({ error: "user_id, product_id, and rating are required." });
  }

  try {
      const result = await Products.createProductReview({
          userId: user_id,
          productId: productId,
          rating: rating,
          comment: comment
      });
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error("Error creating product review:", error);
      res.status(500).json({ error: "Failed to create product review" });
  }
}


};
module.exports = productController;