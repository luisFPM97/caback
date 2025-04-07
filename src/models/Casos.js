const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Caso = sequelize.define('caso', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Caso;