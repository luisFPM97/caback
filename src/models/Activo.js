const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Activo = sequelize.define('activo', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    tipo: { 
        type: DataTypes.ENUM("portátil", "escritorio", "servidor", "impresora", "licencia"), 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.ENUM("activo", "inactivo"), 
        defaultValue: "activo" 
    },
    descripcion: { 
        type: DataTypes.TEXT 
    },
});

module.exports = Activo;