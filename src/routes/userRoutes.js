const express = require('express');
//creamos constante para que nos indique hacia donde hay que ir en direccion
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidator, deleteUserByIdValidator } = require('../validator/userValidator');
const validateResults = require('../middlewares/usersRequest');

router.post('/', createUserValidator, validateResults, userController.createUser);
router.get();
router.delete('/:id', deleteUserByIdValidator, validateResults, userController.deleteUser);

module.exports = router;
