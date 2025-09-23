const { ExpressValidator } = require('express-validator');
const { body, param } = require('express-validator');
const { orderdetailServices } = require('../services/orderdetailServices');

const createOrderdetailValidator = [
    body('amount') //cantidad
        .trim()
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo'),

    body('unit_price') //precio unitario
        .trim()
        .notEmpty().withMessage('El precio unitario es obligatorio')
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

    body('subtotal')
        .trim()
        .notEmpty().withMessage('El subtotal es obligatorio')
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),
];

const validateOrderdetailId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID del detalle debe ser un número entero positivo')
];

const updateOrderdetailValidator = [
    ...validateOrderdetailId,

    body('amount')
        .optional()
        .trim()
        .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo'),

    body('unit_price')
        .optional()
        .trim()
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

    body('subtotal')
        .optional()
        .trim()
        .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),
];

const deleteOrderdetailValidator = [...validateOrderdetailId];

module.exports = {createOrderdetailValidator,updateOrderdetailValidator,deleteOrderdetailValidator,validateOrderdetailId};

module.exports = { createOrderdetailValidator };