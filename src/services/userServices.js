//Hacemos peticiones a la BD mediante el services
//Primero nos tenemos que conectar a la BD
const db = require('../database/db');

//Hacemos los casos de uso que son crear, actualizar, eliminar...
async function createUser(user) {
    //Abrimos la conexion a la BD
    const conn = await db.getConnection();

    try {
        //Usamos la destructuracion de objetos (es traer un atributo en especifico del objeto)
        const { name, email, phone, password, address, neighboorhod, is_active } = user;
        //Comprobar si existe
        const [exists] = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (exists.length) {
            const err = new Error('EMAIL_IN_USE');
            err.code = 'EMAIL_IN_USE';
            throw err;
        }
        //Creamos un objeto para hacer el query 
        const [result] = await conn.query(
            'INSERT INTO USERS (NAME, EMAIL, PHONE, PASSWORD, ADDRESS, NEIGHBORHOOD, IS_ACTIVE) VALUES(?,?,?,?,?,?,?)',
            [name, email, phone, password, address, neighboorhod, is_active]
        );
        //Creamos otro objeto para saber cuantas clumnas fueron afectadas
        const [createdRows] = await conn.execute('SELECT id, name, email, phone, address, neighborhood, is_active FROM users WHERE id = ?', [result.insertId]);
        return createdRows[0];
    }
    catch (e) {
        //mostramos el error por consola
        console.error(e.message);
    } finally {
        conn.release();
    }
};

async function findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
}

async function deleteUserById(id) {
    const conn = await db.getConnection();

    try {
        const [result] = await conn.query('DELETE FROM USERS WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Ocurrio un error al eliminar por id', error);
        throw error;
    } finally {
        conn.release();
    }
};

async function listAllUsers() {
  const [rows] = await db.execute('SELECT id, name, email, phone, address, neighborhood, is_active FROM users ORDER BY name DESC');
  return rows;
}

async function getUserById(id) {
  const [rows] = await db.execute('SELECT id, name, email, phone, address, neighborhood, is_active FROM users WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
}

async function updateUser(id, data) {
  let conn;
  try {
    conn = await db.getConnection();

    //check if existing email conflict
    if (data.email) {
      const [conflict] = await conn.execute('SELECT id FROM users WHERE email = ? AND id <> ?', [data.email, id]);
      if (conflict.length) {
        const err = new Error('EMAIL_IN_USE');
        err.code = 'EMAIL_IN_USE';
        throw err;
      }
    }

    const fields = [];
    const values = [];

    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.email !== undefined) { fields.push('email = ?'); values.push(data.email); }
    if (data.phone !== undefined) { fields.push('phone = ?'); values.push(data.phone); }
    if (data.address !== undefined) { fields.push('address = ?'); values.push(data.address); }
    if (data.neighborhood !== undefined) { fields.push('neighborhood = ?'); values.push(data.neighborhood); }
    if (data.is_active !== undefined) { fields.push('is_active = ?'); values.push(data.is_active); }
    if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password);
    }

    if (fields.length === 0) {
      return getUserById(id); // no cambios
    }

    values.push(id);
    const sql = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await conn.execute(sql, values);

    return getUserById(id);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}


module.exports = {
    createUser,
    findByEmail,
    deleteUserById,
    listAllUsers,
    getUserById,
    updateUser
} 