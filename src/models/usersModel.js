//Entidad clientes
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('Users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    neighborhood:{
        type: DataTypes.STRING
    },
    is_active:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = User;