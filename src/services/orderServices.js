const db = require('../dataBase/connection');

async function createOrder(order) {
    const conn = await db.getConnection();
    try{
        const { Id_user, order_date, Id_product, total } = order;
        const [result] = await conn.query(
            'INSERT INTO users (Id_user, order_date, Id_product, total) VALUES (?, ?, ?, ?)',
            [Id_user, order_date, Id_product, total ]);
        return result;
    }   catch (e) {
        console.error('Error al crear Pedido:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createOrder };