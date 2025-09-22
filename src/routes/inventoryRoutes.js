const express = require('express');
const router = express.Router();
const InventoryControllers = require('../controllers/inventoryControllers');
const { createInventoryValidator } = require('../validator/inventoryValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createInventoryValidator, validateResults, InventoryControllers.createInventory);

module.exports = router;