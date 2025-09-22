const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const { createUserValidator } = require('../validator/userValidator');
const { validateResults } = require('../middlewares/validationResult');

//get son consultas = select* from table (id, no,nombre)
//post son inserciones = insert into table (nombre, no)
//put son actualizaciones = update table set nombre= 'nuevo' where id=1
//delete son eliminaciones = delete from table where id=1

router.post('/', createUserValidator, validateResults, userControllers.createUser);

module.exports = router;