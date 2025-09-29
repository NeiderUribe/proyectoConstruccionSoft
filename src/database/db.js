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

        // reemplaza o integra en tu src/database/db.js (dentro de initDB())
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                slug VARCHAR(180) NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
                image_url VARCHAR(512),
                is_available BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS product_variants (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                name VARCHAR(120),
                sku VARCHAR(100),
                extra_price DECIMAL(10,2) DEFAULT 0,
                stock INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            )
        `);

        console.log('Base de datos iniciada correctamente');
    }
    catch (e) {
        console.error('Error al iniciar la Base de Datos', e);
    } finally {
        if (connection) connection.release();
    }
}

initDB();

module.exports = pool;