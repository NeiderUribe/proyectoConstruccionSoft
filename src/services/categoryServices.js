const db = require('../dataBase/connection');

async function createCategory(category) {
    const conn = await db.getConnection();
    try {
        const { name, description } = category;
        const [result] = await conn.query(
            'INSERT INTO Category (name, description) VALUES (?, ?)',
            [name, description]);
        return result;
    } catch (e) {
        console.error('Error al crear Categoria:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getAllCategories() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Category');
        return rows;
    } catch (e) {
        console.error('Error al consultar categorías:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function getCategoryById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM Category WHERE id_category = ?', [id]);
        return rows[0];
    } catch (e) {
        console.error('Error al consultar categoría por ID:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function updateCategory(id, category) {
    const conn = await db.getConnection();
    try {
        const { name, description } = category;
        await conn.query(
            'UPDATE Category SET name = ?, description = ? WHERE id_category = ?',
            [name, description, id]
        );
        return await getCategoryById(id);
    } catch (e) {
        console.error('Error al actualizar categoría:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

async function deleteCategory(id) {
    const conn = await db.getConnection();
    try {
        const category = await getCategoryById(id);
        if (!category) return null;
        await conn.query('DELETE FROM Category WHERE id_category = ?', [id]);
        return category;
    } catch (e) {
        console.error('Error al eliminar categoría:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};