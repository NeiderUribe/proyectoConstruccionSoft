const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {categoryServices} = require('../services/categoryServices');

const createcategoryValidator = [
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

module.exports = { createCategoryValidator };