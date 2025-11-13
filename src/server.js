//Representa la conexión del servidor con el cliente
// Cargar variables de entorno PRIMERO
const dotenv = require('dotenv');
dotenv.config();

// Inicializar la conexión a la base de datos
require('./dataBase/connection');

const app = require('../app');
const PORT = process.env.PORT || process.env.DB_PUERTO || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

