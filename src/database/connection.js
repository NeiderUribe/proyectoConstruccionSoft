//configuración de la base de datos
const mysql = require('mysql2/promise');
require('dotenv').config();

//crear la variable de la conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10 //Para limitar la cantidad de peticiones al servidor 
});

async function initDB() {
    let connection;
    try {
        connection = await pool.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id_user INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                mail VARCHAR(100) NOT NULL UNIQUE,
                cellular VARCHAR(10),
                password VARCHAR(6) NOT NULL,
                address VARCHAR(255),
                is_active BOOLEAN DEFAULT TRUE
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS Category  (
                id_category INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(100) NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS Inventory   (
                id_inventory INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(100) NOT NULL,
                amount INT,
                id_category INT,   
                FOREIGN KEY (id_category) REFERENCES Category(id_category),
                price DECIMAL(10,2) NOT NULL,
                unit_measurement VARCHAR(20) NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS Product   (
                id_Product INT AUTO_INCREMENT PRIMARY KEY,
                id_inventory INT,
                FOREIGN KEY (id_inventory) REFERENCES Inventory(id_inventory),
                name VARCHAR(100) NOT NULL,
                description VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                image VARCHAR(255)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS Orders   (
                id_order INT AUTO_INCREMENT PRIMARY KEY,
                id_user INT,
                FOREIGN KEY (id_user) REFERENCES user(id_user),
                order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                total DECIMAL(10,2) NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS Orderdetail  (
                id_Orderdetail INT AUTO_INCREMENT PRIMARY KEY,
                id_order INT,
                FOREIGN KEY (id_order) REFERENCES Orders(id_order),
                id_product INT,
                FOREIGN KEY (id_product) REFERENCES Product(id_Product),
                amount INT NOT NULL,
                unit_price DECIMAL(10,2) NOT NULL,
                subtotal DECIMAL(10,2) NOT NULL            
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