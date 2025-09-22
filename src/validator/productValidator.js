const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {productServices} = require('../services/productServices');

const createProductValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
        .isLength({ max: 50 }).withMessage('No debe superar los 50 caracteres'),

    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
        .isLength({ max: 100 }).withMessage('No debe superar los 100 caracteres'),

    body('price')
        .trim()
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

    body('image')
        .optional()
        .isURL().withMessage('La imagen debe ser una URL válida')
        .matches(/\.(jpg|jpeg|png|gif)$/i).withMessage('La URL debe terminar en .jpg, .jpeg, .png o .gif')
];

module.exports = { createProductoValidator };
