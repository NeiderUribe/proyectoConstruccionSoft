const db = require('../dataBase/connection');

async function createInventory(inventory) {
    const conn = await db.getConnection();
    try {
        const { name, description, amount, category_id, price, unit_measurement } = inventory;
        const [result] = await conn.query(
            'INSERT INTO Inventory (name, description, amount, id_category, price, unit_measurement) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, amount, category_id, price, unit_measurement]);
        return result;
    } catch (e) {
        console.error('Error al crear Inventario:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getAllInventory() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query(`
            SELECT i.*, c.name as category_name 
            FROM Inventory i 
            LEFT JOIN Category c ON i.id_category = c.id_category
        `);
        return rows;
    } catch (e) {
        console.error('Error al consultar inventario:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getInventoryById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Inventory WHERE id_inventory = ?', [id]);
        return rows[0];
    } finally {
        conn.release();
    }
}

async function updateInventory(id, item) {
    const conn = await db.getConnection();
    try {
        const { name, description, amount, Id_category, price, unit_measurement } = item;
        await conn.query(
            'UPDATE Inventory SET name = ?, description = ?, amount = ?, Id_category = ?, price = ?, unit_measurement = ? WHERE id_inventory = ?',
            [name, description, amount, Id_category, price, unit_measurement, id]
        );
        return await getInventoryById(id);
    } finally {
        conn.release();
    }
}

async function deleteInventory(id) {
    const conn = await db.getConnection();
    try {
        const item = await getInventoryById(id);
        if (!item) return null;
        await conn.query('DELETE FROM Inventory WHERE id_inventory = ?', [id]);
        return item;
    } finally {
        conn.release();
    }
}

module.exports = {createInventory, getAllInventory, getInventoryById, updateInventory,deleteInventory};
