const express = require('express');
const router = express.Router();
const BasketController = require('../controllers/basketController');

router.get('/:userId', BasketController.getBasket);
router.get('/items/:userId', BasketController.getBasketItems);
router.post('/:userId/add', BasketController.addItem);
router.put('/:userId/item/:itemId', BasketController.updateItemQuantity);
router.delete('/:userId/item/:itemId', BasketController.removeItem);


module.exports = router;
