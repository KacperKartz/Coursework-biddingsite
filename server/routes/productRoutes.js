const express = require('express');
const productController = require('../controllers/ProductController');
const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/addProduct', productController.addProduct);
module.exports = router;
