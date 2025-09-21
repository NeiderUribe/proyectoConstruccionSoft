const {ExpressValidator} = require('express-validator');
const { body, param } = require('express-validator');
const {order_detailServices} = require('../services/order_detailServices');

const createorder_detailValidator = [
body('amount') //cantidad
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo'),

    body('unit_price') //precio unitario
    .notEmpty().withMessage('El precio unitario es obligatorio')
    .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),

    body('subtotal')
    .notEmpty().withMessage('El subtotal es obligatorio')
    .isFloat({ min: 0 }).withMessage('Debe ser un número decimal positivo'),
];
