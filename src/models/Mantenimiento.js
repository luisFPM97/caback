const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Activo = require('./Activo');

const Mantenimiento = sequelize.define('mantenimiento', {
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    fechaInicio: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    fechaFin: { 
        type: DataTypes.DATE 
    },
});

module.exports = Mantenimiento;

Activo.hasMany(Mantenimiento, { foreignKey: "activoId" });
Mantenimiento.belongsTo(Activo, { foreignKey: "activoId" });