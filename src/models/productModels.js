//Id_product, Id_inventory, name, description, price, image
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Inventory = require('./Inventory');

const Product = sequelize.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Inventory,
            key: 'id_inventory'
        }
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },

    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false        
    },

    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'Productos',
    timestamps: false
});

module.exports = Product;
