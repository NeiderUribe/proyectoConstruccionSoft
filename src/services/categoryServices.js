const db = require('../dataBase/connection');

async function createCategory(category) {
    const conn = await db.getConnection();
    try{
        const { name, description } = category;
        const [result] = await conn.query(
            'INSERT INTO users (name, description) VALUES (?, ?)'
            [name, description]);
        return result;
    }   catch (e) {
        console.error('Error al crear Categoria:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createCategory };