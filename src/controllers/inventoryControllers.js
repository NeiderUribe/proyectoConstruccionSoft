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

async function getInventory(req, res, next) {
    try {
        const Inventory = await InventoryServices.getAllInventory();
        res.status(200).json({
            ok: true,
            data: Inventory
        });
    } catch (e) {
        console.error('Error al consultar Inventario:', e.message);
        next(e);
    }
}

async function getInventoryById(req, res, next) {
    try {
        const Inventory = await InventoryServices.getInventoryById(req.params.id);
            if (!Inventory) {
            return res.status(404).json({
            ok: false,
            msg: 'Inventario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: Inventory
        });
    } catch (e) {
        console.error('Error al consultar Inventario:', e.message);
        next(e);
    }
}

async function updateInventory(req, res, next) {
    try {
        const updatedInventory = await InventoryServices.updateInventory(req.params.id, req.body);
        if (!updatedInventory) {
        return res.status(404).json({
            ok: false,
            msg: 'Inventario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Inventario actualizado exitosamente',
            data: updatedInventory
        });
    } catch (e) {
        console.error('Error al actualizar Inventario:', e.message);
        next(e);
    }
}

async function deleteInventory(req, res, next) {
    try {
        const deletedInventory = await InventoryServices.deleteInventory(req.params.id);
        if (!deletedInventory) {
            return res.status(404).json({
            ok: false,
            msg: 'Inventario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Inventario eliminado exitosamente',
            data: deletedInventory
        });
    } catch (e) {
        console.error('Error al eliminar Inventario:', e.message);
        next(e);
    }
}

module.exports = {createInventory, getInventory, getInventoryById, updateInventory, deleteInventory};