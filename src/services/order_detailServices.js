const db = require('../dataBase/connection');

async function createOrder_detail(order_detail) {
    const conn = await db.getConnection();
    try{
        const { Id_order, amount, unit_price, subtotal } = order_detail;
        const [result] = await conn.query(
            'INSERT INTO users (Id_order, amount, unit_price, subtotal) VALUES (?, ?, ?, ?)',
            [Id_order, amount, unit_price, subtotal]);
        return result;
    }   catch (e) {
        console.error('Error al crear Detalle_pedido:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createOrder_detail };