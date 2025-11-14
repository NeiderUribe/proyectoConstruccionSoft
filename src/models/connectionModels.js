const { sequelize } = require('../database/database');
const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderDetail = require('./OrderDetail');
const Inventory = require('./Inventory');
const Category = require('./Category');

// Activar relaciones
require('./relaciones');

module.exports = { sequelize, User, Order, Product, OrderDetail, Inventory, Category};
