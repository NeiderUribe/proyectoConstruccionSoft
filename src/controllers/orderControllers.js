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
module.exports = { createOrder };