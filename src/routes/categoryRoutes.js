const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categorycontrollers');
const { createCategoryValidator } = require('../validator/categoryValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createCategoryValidator, validateResults, categoryControllers.createCategory);

router.get('/', categoryControllers.getCategory);

router.get('/:id', categoryControllers.getCategoryById);

router.put('/:id', createCategoryValidator, validateResults, categoryControllers.updateCategory);

router.delete('/:id', categoryControllers.deleteCategory);

module.exports = router;
