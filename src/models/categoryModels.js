//Id_categoria, nombre, descripcion
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Category = sequelize.define('Category', {
    id: {
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