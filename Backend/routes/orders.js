// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/orderController.js');

router.post('/', orderController.store);

module.exports = router;
