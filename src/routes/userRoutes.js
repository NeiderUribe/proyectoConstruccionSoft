const express = require('express');
//creamos constante para que nos indique hacia donde hay que ir en direccion
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidator } = require('../validator/userValidator');
const validateResults = require('../middlewares/usersRequest');

router.post('/', createUserValidator, validateResults, userController.createUser);

module.exports = router;
