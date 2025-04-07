const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Usuario = sequelize.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: { 
        type: DataTypes.ENUM("superadmin", "técnico", "usuario"), 
        defaultValue: "usuario" 
    },
});
Usuario.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.contraseña;
    return values;
}

module.exports = Usuario;