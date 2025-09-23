const express = require('express');
const router = express.Router();
const orderDetailControllers = require('../controllers/orderdetailControllers');
const { createOrderDetailValidator } = require('../validator/orderdetailValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createOrderDetailValidator, validateResults, orderDetailControllers.createOrderdetail);
router.get('/', orderDetailControllers.getOrderdetail);
router.get('/:id', orderDetailControllers.getOrderdetailById);
router.put('/:id', createOrderDetailValidator, validateResults, orderDetailControllers.updateOrderdetail);
router.delete('/:id', orderDetailControllers.deleteOrderdetail);

module.exports = router;
