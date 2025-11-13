const db = require('../dataBase/connection');

async function createOrder(order) {
    const conn = await db.getConnection();
    try {
        const { Id_user, order_date, total } = order;
        const [result] = await conn.query(
            'INSERT INTO Orders (id_user, order_date, total) VALUES (?, ?, ?)',
            [Id_user, order_date || new Date(), total]);
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
        const [rows] = await conn.query(`
            SELECT o.*, u.name as user_name, u.mail as user_email 
            FROM Orders o 
            LEFT JOIN user u ON o.id_user = u.id_user
            ORDER BY o.order_date DESC
        `);
        return rows;
    } catch (e) {
        console.error('Error al consultar pedidos:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getOrderById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Orders WHERE id_order = ?', [id]);
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
            'UPDATE Orders SET id_user = ?, order_date = ?, total = ? WHERE id_order = ?',
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
        await conn.query('DELETE FROM Orders WHERE id_order = ?', [id]);
        return order;
    } finally {
        conn.release();
    }
}

module.exports = {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder};
