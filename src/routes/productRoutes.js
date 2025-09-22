const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const { createProductValidator } = require('../validator/productValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createProductValidator, validateResults, productControllers.createProduct);

module.exports = router;