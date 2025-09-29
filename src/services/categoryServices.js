// src/services/categoryServices.js
const db = require('../database/db');

async function createCategory(data) {
    const { name, slug, description } = data;
    let conn;
    try {
        conn = await db.getConnection();
        const [result] = await conn.execute(
            'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
            [name, slug, description || null]
        );
        const [rows] = await conn.execute('SELECT * FROM categories WHERE id = ?', [result.insertId]);
        return rows[0];
    } finally {
        if (conn) conn.release();
    }
}

async function listCategories() {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY name');
    return rows;
}

async function getCategoryById(id) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
}

async function updateCategory(id, data) {
    let conn;
    try {
        conn = await db.getConnection();
        const fields = []; const values = [];
        if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
        if (data.slug !== undefined) { fields.push('slug = ?'); values.push(data.slug); }
        if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }

        if (fields.length === 0) return getCategoryById(id);

        values.push(id);
        await conn.execute(`UPDATE categories SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);
        const [rows] = await conn.execute('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    } finally {
        if (conn) conn.release();
    }
}

async function deleteCategory(id) {
    const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { createCategory, listCategories, getCategoryById, updateCategory, deleteCategory };