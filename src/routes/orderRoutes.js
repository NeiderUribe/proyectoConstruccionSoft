const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const { createOrderValidator } = require('../validator/orderValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createOrderValidator, validateResults, orderControllers.createOrder);
router.get('/', orderControllers.getOrder);
router.get('/:id', orderControllers.getOrderById);
router.put('/:id', createOrderValidator, validateResults, orderControllers.updateOrder);
router.delete('/:id', orderControllers.deleteOrder);

module.exports = router;
