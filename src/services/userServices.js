//Hacemos peticiones a la BD mediante el services
//Primero nos tenemos que conectar a la BD
const db = require('../database/db');

//Hacemos los casos de uso que son crear, actualizar, eliminar...
async function createUser(user) {
    //Abrimos la conexion a la BD
    const conn = await db.getConnection();

    try{
        //Usamos la destructuracion de objetos (es traer un atributo en especifico del objeto)
        const {name, email, phone, password, address, neighboorhod} = user;
        //Creamos un objeto para hacer el query 
        const [result] = await conn.query(
            'INSERT INTO USERS (NAME, EMAIL, PHONE, PASSWORD, ADDRESS, NIEGHBOORHOD) VALUES(?,?,?,?,?,?)',
            [name, email, phone, password, address, neighboorhod]
        );
        //Creamos otro objeto para saber cuantas clumnas fueron afectadas
        //const [rows] =    
    }
    catch(e){
        //mostramos el error por consola
        console.error(e.message);
    }
}