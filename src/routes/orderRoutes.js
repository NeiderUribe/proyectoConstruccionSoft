const express = require('express');
const router = express.Router();
const OrderControllers = require('../controllers/orderControllers');
const { createOrderValidator } = require('../validator/orderValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createOrderValidator, validateResults, OrderControllers.createOrder);

module.exports = router;