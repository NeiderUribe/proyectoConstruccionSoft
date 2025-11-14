//Id_order, Id_user, fecha_pedido, total
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const User = require('./User');

const Order = sequelize.define('order', {
    id_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },

    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },

    order_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

module.exports = Order;
