const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {orderServices} = require('../services/orderServices');

const createorderValidator = [
    body('order_date')
    .notEmpty().withMessage('La fecha del pedido es obligatoria')
    .isISO8601().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)'),

    body('total')
    .notEmpty().withMessage('El total es obligatorio')
    .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal positivo'),
];

module.exports = { createoderValidator };
