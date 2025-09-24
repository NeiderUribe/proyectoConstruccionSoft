//Entidad clientes
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    neighborhood:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = User;