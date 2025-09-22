const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {inventoryServices} = require('../services/inventoryServices');

const createInventoryValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('amount') //cantidad
        .trim()
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo'),

    body('category_id')
        .trim()
        .notEmpty().withMessage('La categoría es obligatoria')
        .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo'),

    body('price') 
        .trim()
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

    body('unit_measurement') //unidad de medida
        .notEmpty().withMessage('La unidad de medida es obligatoria')
        .isLength({ min: 1, max: 20 }).withMessage('Debe tener entre 1 y 20 caracteres'),
];

module.exports = { createInventoryValidator };