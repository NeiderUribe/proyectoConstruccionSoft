const { body, param } = require('express-validator');

//Debe existir el archivo en services primero userServices.js 
const categoryServices = require('../services/userServices');

const createCategoryValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    // body('email')
    //     .trim()
    //     .notEmpty().withMessage('Email is required')
    //     .isEmail().withMessage('Invalid email')
    //     .custom(async (value) => {
    //         // Verificar si ya existe el correo
    //         const user = await userServices.findByEmail(value);
    //         if (user) {
    //             throw new Error('Email already in use');
    //         }
    //         return true;
    //     }),

    body('phone')
        .trim()
        .notEmpty().withMessage('Telephone is required')
        .isString()
        .isLength({ max: 10 }).withMessage('Phone max length is 10'),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isString()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),

    body('address')
        .trim()
        .notEmpty().withMessage('Address is required'),

    body('neighborhood')
        .trim()
        .notEmpty().withMessage('Neighborhood is required'),

    // body('roleId')
    //     .trim()
    //     .optional()
    //     .isInt({ min: 1 }).withMessage('El rol debe ser un número entero válido'),

    body('is_active')
        .optional()
        .isBoolean().withMessage('is_active must be boolean')
];

// Validación para actualización de usuario (PUT/PATCH)
const updateCategoryValidator = [
    param('id')
        .isInt().withMessage('El id debe ser un número entero válido'),

    body('name')
        .optional()
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    // body('email')
    //     .optional()
    //     .isEmail().withMessage('Debe ser un email válido')
    //     .custom(async (value, { req }) => {
    //         const user = await userServices.findByEmail(value);
    //         if (user && user.id !== parseInt(req.params.id)) {
    //             throw new Error('El email ya está en uso por otro usuario');
    //         }
    //         return true;
    //     }),

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

const deleteCategoryByIdValidator = [
    param('id')
        .isInt().withMessage('Id must be an integer')
];

module.exports = {
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryByIdValidator
};