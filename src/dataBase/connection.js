const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,    
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,

    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión establecida con la base de datos.'))
    .catch(e => console.error('No se pudo conectar a la base de datos:', e));

module.exports = sequelize;