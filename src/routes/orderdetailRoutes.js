const express = require('express');
const router = express.Router();
const orderDetailControllers = require('../controllers/orderdetailControllers');
const { createOrderdetailValidator } = require('../validator/orderdetailValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createOrderdetailValidator, validateResults, orderDetailControllers.createOrderdetail);
router.get('/', orderDetailControllers.getOrderdetail);
router.get('/:id', orderDetailControllers.getOrderdetailById);
router.put('/:id', createOrderdetailValidator, validateResults, orderDetailControllers.updateOrderdetail);
router.delete('/:id', orderDetailControllers.deleteOrderdetail);

module.exports = router;
