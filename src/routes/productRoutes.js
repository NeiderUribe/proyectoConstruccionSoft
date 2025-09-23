const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const { createProductValidator } = require('../validator/productValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createProductValidator, validateResults, productControllers.createProduct);
router.get('/', productControllers.getAllProducts);
router.get('/:id', productControllers.getProductById);
router.put('/:id', createProductValidator, validateResults, productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);

module.exports = router;
