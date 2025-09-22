const { ExpressValidator } = require('express-validator')

const { body, param } = require(ExpressValidator);

//Debe existir el archivo en services primero userServices.js 
const { userServices } = require('../services/userServices');

const createUserValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .custom(async (value) => {
            // Verificar si ya existe el correo
            const user = await userServices.findByEmail(value);
            if (user) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),

    body('phone')
        .trim()
        .notEmpty().withMessage('El telefono es obligatorio')
        .isString()
        .isLength({ max: 10 }).withMessage('El teléfono no debe exceder 10 caracteres'),

    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isString()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('adress')
        .trim()
        .notEmpty().withMessage('La direccion es obligatoria'),

    body('neighborhood')
        .trim()
        .notEmpty().withMessage('La direccion es obligatoria'),

    // body('roleId')
    //     .trim()
    //     .optional()
    //     .isInt({ min: 1 }).withMessage('El rol debe ser un número entero válido'),

    body('is_active')
        .optional()
        .isBoolean().withMessage('El campo activo debe ser booleano')
];

// Validación para actualización de usuario (PUT/PATCH)
const updateUserValidator = [
    param('id')
        .isInt().withMessage('El id debe ser un número entero válido'),

    body('name')
        .optional()
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un email válido')
        .custom(async (value, { req }) => {
            const user = await userServices.findByEmail(value);
            if (user && user.id !== parseInt(req.params.id)) {
                throw new Error('El email ya está en uso por otro usuario');
            }
            return true;
        }),

    body('phone')
        .optional()
        .isLength({ max: 30 }).withMessage('El teléfono no debe exceder 30 caracteres'),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('roleId')
        .optional()
        .isInt({ min: 1 }).withMessage('El rol debe ser un número entero válido'),

    body('is_active')
        .optional()
        .isBoolean().withMessage('El campo activo debe ser booleano'),
];

module.exports = {
    createUserValidator,
    updateUserValidator
};