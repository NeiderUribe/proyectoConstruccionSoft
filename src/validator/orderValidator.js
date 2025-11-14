const { ExpressValidator } = require('express-validator');
const { body, param } = require('express-validator');
const { orderServices } = require('../services/orderServices');

const createOrderValidator = [
    body('order_date')//fecha de pedido
        .notEmpty().withMessage('La fecha del pedido es obligatoria')
        .isISO8601().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    body('total')
        .trim()
        .notEmpty().withMessage('El total es obligatorio')
        .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal positivo'),
];

const validateOrderId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID de la orden debe ser un número entero positivo')
];

const updateOrderValidator = [
    ...validateOrderId,

    body('order_date')
        .optional()
        .isISO8601().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    body('total')
        .optional()
        .trim()
        .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal positivo'),
];

const deleteOrderValidator = [...validateOrderId];

module.exports = {createOrderValidator,updateOrderValidator,deleteOrderValidator,validateOrderId};

