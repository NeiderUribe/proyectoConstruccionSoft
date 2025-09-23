const db = require('../dataBase/connection');

async function createProduct(product) {
    const conn = await db.getConnection();
    try {
        const { Id_inventory, name, description, price, image } = product;
        const [result] = await conn.query(
            'INSERT INTO product (Id_inventory, name, description, price, image ) VALUES (?, ?, ?, ?, ?)',
            [Id_inventory, name, description, price, image]);
        return result;
    } catch (e) {
        console.error('Error al crear Producto:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getAllProducts() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Product');
        return rows;
    } finally {
        conn.release();
    }
}

async function getProductById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Product WHERE id_Product = ?', [id]);
        return rows[0];
    } finally {
        conn.release();
    }
}

async function updateProduct(id, product) {
    const conn = await db.getConnection();
    try {
        const { name, description, price, image, id_inventory } = product;
        await conn.query(
            'UPDATE Product SET name = ?, description = ?, price = ?, image = ?, id_inventory = ? WHERE id_Product = ?',
            [name, description, price, image, id_inventory, id]
        );
        return await getProductById(id);
    } finally {
        conn.release();
    }
}

async function deleteProduct(id) {
    const conn = await db.getConnection();
    try {
        const product = await getProductById(id);
        if (!product) return null;
        await conn.query('DELETE FROM Product WHERE id_Product = ?', [id]);
        return product;
    } finally {
        conn.release();
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
