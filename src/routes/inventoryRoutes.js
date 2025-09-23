const express = require('express');
const router = express.Router();
const inventoryControllers = require('../controllers/inventoryControllers');
const { createInventoryValidator } = require('../validator/inventoryValidator');
const { validateResults } = require('../middlewares/validationResult');

router.post('/', createInventoryValidator, validateResults, inventoryControllers.createInventory);
router.get('/', inventoryControllers.getInventory);
router.get('/:id', inventoryControllers.getInventoryById);
router.put('/:id', createInventoryValidator, validateResults, inventoryControllers.updateInventory);
router.delete('/:id', inventoryControllers.deleteInventory);

module.exports = router;
