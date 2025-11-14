const { ExpressValidator } = require('express-validator');
const { body, param } = require('express-validator');
const { categoryServices } = require('../services/categoryServices');

const createCategoryValidator = [
    body('name')
        .trim() //vacios al inicio y final
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),
];

const validateCategoryId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un número entero positivo')
];

const updateCategoryValidator = [
    ...validateCategoryId,

    body('name')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('description')
        .optional()
        .trim()
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),
];

const deleteCategoryValidator = [...validateCategoryId];

module.exports = {createCategoryValidator,updateCategoryValidator,deleteCategoryValidator,validateCategoryId};


