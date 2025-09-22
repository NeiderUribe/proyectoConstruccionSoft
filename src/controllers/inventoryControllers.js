const InventoryServices = require('../services/inventoryServices');

async function createInventory(req, res, next) {
    try {
        const payload = req.body;
        const newInventory= await InventoryServices.createInventory(payload);
        res.status(201).json({
            ok: true,
            msg: 'Inventario creado exitosamente',
            data: newInventory
        });
    }
    catch (e) {
        console.error('Error al crear Inventario:', e.message);
        next(e);
    }
}
module.exports = { createInventory };