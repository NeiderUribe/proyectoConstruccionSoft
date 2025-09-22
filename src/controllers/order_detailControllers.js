const Order_detailServices = require('../services/order_detailServices');

async function createOrder_detail(req, res, next) {
    try {
        const payload = req.body;
        const newOrder_detail = await Order_detailServices.createOrder_detail(payload);
        res.status(201).json({
            ok: true,
            msg: 'Detalle de pedido creado exitosamente',
            data: newOrder_detail
        });
    }
    catch (e) {
        console.error('Error al crear Detalle de pedido:', e.message);
        next(e);
    }
}
module.exports = { createOrder_detail };