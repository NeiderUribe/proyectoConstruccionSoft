const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {userServices} = require('../services/userServices');

const createUserValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')  
        .isLength({ max: 100 }).withMessage('El nombre no debe superar los 100 caracteres'),

    body('address')
        .trim()
        .notEmpty().withMessage('La dirección es obligatoria')
        .isLength({ max: 150 }).withMessage('La dirección no debe superar los 150 caracteres'),

    body('cellular')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('es-CO').withMessage('Debe ser un número de teléfono válido en Colombia')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 dígitos'),

    body('mail')
        .trim()
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),

    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/[A-Z]/).withMessage('Debe contener al menos una letra mayúscula')
        .matches(/[a-z]/).withMessage('Debe contener al menos una letra minúscula')
        .matches(/[0-9]/).withMessage('Debe contener al menos un número'),
];

module.exports = { createUserValidator };