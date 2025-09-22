const express = require('express');
const router = express.Router();
const CategoryControllers = require('../controllers/categorycontrollers');
const { createCategoryValidator  } = require('../validator/categoryValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createCategoryValidator , validateResults, CategoryControllers.createCategory);

module.exports = router;