const db = require('../dataBase/connection');

async function createInventory(Inventory) {
    const conn = await db.getConnection();
    try{
        const { name, description, amount, category_id , price, unit_measurement} = Order_detail;
        const [result] = await conn.query(
            'INSERT INTO users (name, description, amount, category_id , price, unit_measurement) VALUES (?, ?, ?, ?, ?, ?)'
            [name, description, amount, category_id , price, unit_measurement]);
        return result;
    }   catch (e) {
        console.error('Error al crear Inventario:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createInventory };