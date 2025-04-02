const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Incidencia = sequelize.define('incidencia', {
    titulo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },

    estado: { 
        type: DataTypes.ENUM("solicitada", "asignado", "terminado"), 
        defaultValue: "solicitada" 
    },
    fechaSolicitud: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    fechaFinalizacion: { 
        type: DataTypes.DATE 
    },
    tiempoTotal: { type: DataTypes.INTEGER }, // Tiempo total en minutos dentro del horario laboral
});

module.exports = Incidencia;