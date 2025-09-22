//id_user, name, address, cellular, mail, password
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: false        
    },  

    cellular: {
        type: DataTypes.STRING(10),
        allowNull: false        
    },

    mail: {
        type: DataTypes.STRING(100),
        allowNull: false, 
        unique: true
    },

    password: {
        type: DataTypes.STRING(6),
        allowNull: false        
    }
},  { tableName: 'Usuarios',
    timestamps: false});

module.exports = User;