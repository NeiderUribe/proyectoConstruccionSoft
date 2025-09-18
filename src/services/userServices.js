//Hacemos peticiones a la BD mediante el services
//Primero nos tenemos que conectar a la BD
const db = require('../database/db');

//Hacemos los casos de uso que son crear, actualizar, eliminar...
async function createUser(user) {
    const conn = await db.getConnection();
    try{
        
    }
    catch(e){
        console.error(e.message);
    }
}