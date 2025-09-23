const db = require('../dataBase/connection');

async function createOrder(order) {
    const conn = await db.getConnection();
    try {
        const { Id_user, order_date, Id_product, total } = order;
        const [result] = await conn.query(
            'INSERT INTO order (Id_user, order_date, Id_product, total) VALUES (?, ?, ?, ?)',
            [Id_user, order_date, Id_product, total]);
        return result;
    } catch (e) {
        console.error('Error al crear Pedido:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getAllOrders() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM `Order`');
        return rows;
    } finally {
        conn.release();
    }
}

async function getOrderById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM `Order` WHERE id_order = ?', [id]);
        return rows[0];
    } finally {
        conn.release();
    }
}

async function updateOrder(id, order) {
    const conn = await db.getConnection();
    try {
        const { id_user, order_date, total } = order;
        await conn.query(
            'UPDATE `Order` SET id_user = ?, order_date = ?, total = ? WHERE id_order = ?',
            [id_user, order_date, total, id]
        );
        return await getOrderById(id);
    } finally {
        conn.release();
    }
}

async function deleteOrder(id) {
    const conn = await db.getConnection();
    try {
        const order = await getOrderById(id);
        if (!order) return null;
        await conn.query('DELETE FROM `Order` WHERE id_order = ?', [id]);
        return order;
    } finally {
        conn.release();
    }
}

module.exports = {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder};
