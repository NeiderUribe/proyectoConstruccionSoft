const OrderdetailServices = require('../services/orderdetailServices');

async function createOrderdetail(req, res, next) {
    try {
        const payload = req.body;
        const newOrderdetail= await OrderdetailServices.createOrderdetail(payload);
        res.status(201).json({
            ok: true,
            msg: 'Detalle de pedido creado exitosamente',
            data: newOrderdetail
        });
    }
    catch (e) {
        console.error('Error al crear Detalle de pedido:', e.message);
        next(e);
    }
}

async function getOrderdetail(req, res, next) {
    try {
        const Orderdetail = await OrderdetailServices.getAllOrderDetail();
        res.status(200).json({
            ok: true,
            data: Orderdetail
        });
    } catch (e) {
        console.error('Error al consultar Detalle de pedido:', e.message);
        next(e);
    }
}

async function getOrderdetailById(req, res, next) {
    try {
        const Orderdetail = await OrderdetailServices.getOrderdetailById(req.params.id);
            if (!Orderdetail) {
            return res.status(404).json({
            ok: false,
            msg: 'Detalle de pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: Orderdetail
        });
    } catch (e) {
        console.error('Error al consultar Detalle de pedido:', e.message);
        next(e);
    }
}

async function updateOrderdetail(req, res, next) {
    try {
        const updatedOrderdetail = await OrderdetailServices.updateOrderdetail(req.params.id, req.body);
        if (!updatedOrderdetail) {
        return res.status(404).json({
            ok: false,
            msg: 'Detalle de pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Detalle de pedido actualizado exitosamente',
            data: updatedOrderdetail
        });
    } catch (e) {
        console.error('Error al actualizar Detalle de pedido:', e.message);
        next(e);
    }
}

async function deleteOrderdetail(req, res, next) {
    try {
        const deletedOrderdetail = await OrderdetailServices.deleteOrderdetail(req.params.id);
        if (!deletedOrderdetail) {
            return res.status(404).json({
            ok: false,
            msg: 'Detalle de pedido no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Detalle de pedido eliminado exitosamente',
            data: deletedOrderdetail
        });
    } catch (e) {
        console.error('Error al eliminar Detalle de pedido:', e.message);
        next(e);
    }
}

module.exports = {createOrderdetail, getOrderdetail, getOrderdetailById, updateOrderdetail, deleteOrderdetail};