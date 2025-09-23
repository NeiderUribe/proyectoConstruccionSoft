const db = require('../dataBase/connection');

async function createUser(user) {
    const conn = await db.getConnection();
    try {
        const { name, address, cellular, mail, password } = user;
        const [result] = await conn.query(
            'INSERT INTO users (name, address, cellular, mail, password) VALUES (?, ?, ?, ?, ?)',
            [name, address, cellular, mail, password]);
        return result;
    } catch (e) {
        console.error('Error al crear Usuario:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

// Consultar todos los usuarios
async function getAllUsers() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        return rows;
    } catch (e) {
        onsole.error('Error al consultar usuarios:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

// Consultar usuario por ID
async function getUserById(id) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM users WHERE id_user = ?', [id]);
        return rows[0];
    } catch (e) {
        console.error('Error al consultar usuario por ID:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

// Actualizar usuario
async function updateUser(id, user) {
    const conn = await db.getConnection();
    try {
        const { name, address, cellular, mail, password } = user;
        const [result] = await conn.query(
            'UPDATE users SET name = ?, address = ?, cellular = ?, mail = ?, password = ? WHERE id_user = ?',
            [name, address, cellular, mail, password, id]
        );
        return result.affectedRows > 0 ? await getUserById(id) : null;
    } catch (e) {
        console.error('Error al actualizar usuario:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

// Eliminar usuario
async function deleteUser(id) {
    const conn = await db.getConnection();
    try {
        const user = await getUserById(id);
        if (!user) return null;

        await conn.query('DELETE FROM users WHERE id_user = ?', [id]);
        return user;
    } catch (e) {
        console.error('Error al eliminar usuario:', e.message);
        throw e;
    } finally {
        conn.release();
    }
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser};

