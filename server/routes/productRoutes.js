const express = require('express');
const productController = require('../controllers/ProductController');
const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/addProduct', productController.addProduct);
router.get('/products/:productId', productController.getProductById); 
router.get('/products/reviews/:productId', productController.getProductReviews);
router.post('/products/create-review/:productId', productController.createProductReview);
router.get('/selling/:userId', productController.getSellingProducts);



module.exports = router;
