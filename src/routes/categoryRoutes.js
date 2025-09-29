const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validateResults = require('../middlewares/usersRequest');
const { createCategoryValidator, updateCategoryValidator, deleteCategoryByIdValidator } = require('../validator/categoryValidator');

router.post('/', createCategoryValidator, validateResults, categoryController.createCategory);
router.get('/', categoryController.listCategories);
router.get('/:id', categoryController.getCategory);
router.put('/:id', updateCategoryValidator, validateResults, categoryController.updateCategory);
router.delete('/:id', deleteCategoryByIdValidator, validateResults, categoryController.deleteCategory);

module.exports = router;