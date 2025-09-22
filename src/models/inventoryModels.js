//id_inventory, name, description, amount, categoryId, price, unit_measurement
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Category = require('./categoryModels');

const Inventory  = sequelize.define('Inventory', {
    id_inventory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id_category'
        }     
    },

    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false        
    },

    unit_measurement: {
        type: DataTypes.STRING(20),
        allowNull: false        
    }
},  { tableName: 'Inventario',
    timestamps: false});

module.exports = Inventory ;
