const db = require('../dataBase/connection');

async function createProduct(product) {
    const conn = await db.getConnection();
    try{
        const { Id_inventory, name, description, price, image } = product;
        const [result] = await conn.query(
            'INSERT INTO users (Id_inventory, name, description, price, image ) VALUES (?, ?, ?, ?, ?)',
            [Id_inventory, name, description, price, image ]);
        return result;
    }   catch (e) {
        console.error('Error al crear Producto:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createProduct };