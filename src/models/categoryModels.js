//Id_category, name, description
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Category = sequelize.define('Category', {
    id_category: {
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
    }
},  { tableName: 'Categorias',
    timestamps: false});

module.exports = Category;
