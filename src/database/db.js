//const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

//const sequelize = new Sequelize(
const pool = mysql.createPool({
    hoost: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'comidasRapidas',
    waitForConnections: true,
    //connectionLimit: 10 //Para limitar la cantidad de peticiones al servidor 
});

// sequelize.authenticate()
//     .then(()=> console.log('Conexion a la BD Exitosa!'))
//     .catch(e => console.error('Error al conectar con la BD', e));

async function initDB() {
    try{
        const connection = await pool.getConnection();
        
        await connection.query(`
            CREATE TABLE IF NOT EXIST users(
            ID INT AUTO_INCREMENT PRIMARY KEY,
            NAME VARCHAR(50) NOT NULL,
            EMAIL VARCHAR(100) NOT NULL,
            PHONE VARCHAR(10) NOT NULL,
            PASSWORD VARCHAR(100) NOT NULL,
            ADDRESS VARCHAR(100) NOT NULL,
            NEIGHBORHOOD VARCHAR(100) NOT NULL,
            IS_ACTIVE BOOELAN DEFAULT=TRUE 
            )
        `);

        connection.release();
        console.log('Base de datos iniciada correctamente');
    }
    catch(e){
        console.log('Error al iniciar la Base de Datos', e);
    }
}    

initDB();

module.exports = pool;