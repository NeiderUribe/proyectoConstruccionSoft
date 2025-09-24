//Aca levantamos el servidor y la conexion
const app = require('./app');
const dotenv = require('dotenv'); //Esta variable se encarga de las variables de entorno
dotenv.config();
const PORT = process.env.PORT || 8084;

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
})