const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {productServices} = require('../services/productoServices');

const createInventoryValidator = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
        .isLength({ max: 50 }).withMessage('No debe superar los 50 caracteres'),

    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

  body('imagen')
    .optional()
    .isURL().withMessage('La imagen debe ser una URL válida'),
];

module.exports = { createProductoValidator };
