const express = require('express');
const router = express.Router();
const Order_detailControllers = require('../controllers/order_detailControllers');
const { createOrder_detailValidator } = require('../validator/order_detailValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createOrder_detailValidator, validateResults, Order_detailControllers.createOrder_detail);

module.exports = router;