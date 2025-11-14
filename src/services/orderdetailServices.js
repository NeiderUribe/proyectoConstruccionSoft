const db = require('../dataBase/connection');

async function createOrderdetail(detail) {
    const conn = await db.getConnection();
    try {
        const { id_order, id_product, amount, unit_price, subtotal } = detail;
        const [result] = await conn.query(
            'INSERT INTO Orderdetail (id_order, id_product, amount, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
            [id_order, id_product, amount, unit_price, subtotal]
        );
        return result;
    } finally {
        conn.release();
    }
}

async function getAllOrderDetail() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Orderdetail');
        return rows;
    } finally {
        conn.release();
    }
}

async function getOrderDetailById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Orderdetail WHERE id_Orderdetail = ?', [id]);
        return rows[0];
    } finally {
        conn.release();
    }
}

async function updateOrderDetail(id, detail) {
    const conn = await db.getConnection();
    try {
        const { id_order, id_product, amount, unit_price, subtotal } = detail;
        await conn.query(
            'UPDATE Orderdetail SET id_order = ?, id_product = ?, amount = ?, unit_price = ?, subtotal = ? WHERE id_Orderdetail = ?',
            [id_order, id_product, amount, unit_price, subtotal, id]
        );
        return await getOrderDetailById(id);
    } finally {
        conn.release();
    }
}

async function deleteOrderDetail(id) {
    const conn = await db.getConnection();
    try {
        const detail = await getOrderDetailById(id);
        if (!detail) return null;
        await conn.query('DELETE FROM Orderdetail WHERE id_Orderdetail = ?', [id]);
        return detail;
    } finally {
        conn.release();
    }
}

module.exports = {createOrderdetail, getAllOrderDetail, getOrderDetailById,updateOrderDetail, deleteOrderDetail};
