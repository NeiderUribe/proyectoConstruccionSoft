const mysql = require('mysql2/promise');
require('dotenv').config();

//const sequelize = new Sequelize(
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'comidaRapida',
    waitForConnections: true,
    connectionLimit: 10, //Para limitar la cantidad de peticiones al servidor 
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306
});

async function initDB() {
    let connection;
    try {
        connection = await pool.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone VARCHAR(30),
                password VARCHAR(255) NOT NULL,
                address VARCHAR(255),
                neighborhood VARCHAR(150),
                is_active BOOLEAN DEFAULT TRUE
            )
        `);

        console.log('Base de datos iniciada correctamente');
    }
    catch (e) {
        console.error('Error al iniciar la Base de Datos', e);
    }finally{
        if(connection) connection.release();
    }
}

initDB();

module.exports = pool;