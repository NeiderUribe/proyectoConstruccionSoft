const {ExpressValidator} = require('express-validator')

const { body, param } = require(ExpressValidator);

//Debe existir el archivo en services primero userServices.js 

const {userServices} = require('../services/userServices');

const createUserValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es un campo requerido')
        .isLength({max:50}).withMessage('El campo acepta maximo 50 caracteres'),
        //.custom() Creamos validaciones personalizadas, por Ejm 

    body('email')
        .trim()
        .notEmpty().withMessage('EL email es un campo obligatorio')
        
];

module.exports = createUserValidator
