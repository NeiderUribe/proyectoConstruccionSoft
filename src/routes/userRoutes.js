const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const { createUserValidator } = require('../validator/usersValidator');
const { validateResults } = require('../middlewares/validationResult');
// const { verifytoken } = require('../middlewares/authMiddleware');
//const userValidator = require('../validator/userValidator');

// router.use(verifytoken); // Rutas protegidas - Comentado temporalmente para desarrollo

//get son consultas = select* from table (id, no,nombre)
//post son inserciones = insert into table (nombre, no)
//put son actualizaciones = update table set nombre= 'nuevo' where id=1
//delete son eliminaciones = delete from table where id=1

router.post('/', createUserValidator, validateResults, userControllers.createUser);
router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getUserById);
router.put('/:id', createUserValidator, validateResults, userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
