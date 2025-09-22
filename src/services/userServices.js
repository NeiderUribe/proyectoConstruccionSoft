const db = require('../dataBase/connection');

async function createUser(user) {
    const conn = await db.getConnection();
    try{
        const { name, address, cellular, mail, password } = user;
        const [result] = await conn.query(
            'INSERT INTO users (name, address, cellular, mail, password) VALUES (?, ?, ?, ?, ?)',
            [name, address, cellular, mail, password]);
        return result;
    }   catch (e) {
        console.error('Error al crear Usuario:', e.message);
        throw e;
    }   finally {
        conn.release();
    }
}

module.exports = { createUser };
