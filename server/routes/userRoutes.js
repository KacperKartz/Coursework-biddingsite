const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/add-user', userController.addUser);
module.exports = router;
