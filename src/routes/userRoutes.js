// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidator, deleteUserByIdValidator, updateUserValidator/*, getByIdValidator */ } = require('../validator/userValidator');
const validateResults = require('../middlewares/usersRequest');

router.post('/', createUserValidator, validateResults, userController.createUser);
router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.put('/:id', updateUserValidator, validateResults, userController.updateUser);
router.delete('/:id', deleteUserByIdValidator, validateResults, userController.deleteUser);

module.exports = router;
