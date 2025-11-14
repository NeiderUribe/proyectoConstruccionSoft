const OrderServices = require('../services/orderServices');

async function createOrder(req, res, next) {
    try {
        const payload = req.body;
        const newOrder = await OrderServices.createOrder(payload);
        res.status(201).json({
            ok: true,
            msg: 'Pedido creado exitosamente',
            data: newOrder
        });
    }
    catch (e) {
        console.error('Error al crear Pedido:', e.message);
        next(e);
    }
}

async function getOrder(req, res, next) {
    try {
        const Order = await OrderServices.getAllOrder();
        res.status(200).json({
            ok: true,
            data: Order
        });
    } catch (e) {
        console.error('Error al consultar Pedido:', e.message);
        next(e);
    }
}

async function getOrderById(req, res, next) {
    try {
        const Order = await OrderServices.getOrderById(req.params.id);
            if (!Order) {
            return res.status(404).json({
            ok: false,
            msg: 'Pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: Order
        });
    } catch (e) {
        console.error('Error al consultar Pedido:', e.message);
        next(e);
    }
}

async function updateOrder(req, res, next) {
    try {
        const updatedOrder = await OrderServices.updateOrder(req.params.id, req.body);
        if (!updatedOrder) {
        return res.status(404).json({
            ok: false,
            msg: 'Pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Pedido actualizado exitosamente',
            data: updatedProduct
        });
    } catch (e) {
        console.error('Error al actualizar Pedido:', e.message);
        next(e);
    }
}

async function deleteOrder(req, res, next) {
    try {
        const deletedOrder = await OrderServices.deleteOrder(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({
            ok: false,
            msg: 'Pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Pedido eliminado exitosamente',
            data: deletedOrder
        });
    } catch (e) {
        console.error('Error al eliminar Pedido:', e.message);
        next(e);
    }
}

module.exports = {createOrder, getOrder, getOrderById, updateOrder, deleteOrder};