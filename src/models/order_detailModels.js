//Id_order_detail, id_order, id_product, amount, unit_price, subtotal
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Order = require('./order');
const Produc = require('./product');

const Order_detail = sequelize.define('order_detail', {
    id_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id_order'
        }
    },

    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produc,
            key: 'id_product'
        }
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Detalles_pedido',
    timestamps: false
});

module.exports = Order_detail;
