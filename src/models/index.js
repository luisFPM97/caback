const sequelize = require("../utils/connection");
const Activo = require("./Activo");
const Incidencia = require("./Incidencia");
const Mantenimiento = require("./Mantenimiento");
const Usuario = require("./Usuario");



// Relaciones
Usuario.hasMany(Incidencia, { foreignKey: "usuarioSolicitanteId" });
Incidencia.belongsTo(Usuario, { foreignKey: "usuarioSolicitanteId", as: "solicitante" });
Usuario.hasMany(Incidencia, { foreignKey: "usuarioAsignadoId" });
Incidencia.belongsTo(Usuario, { foreignKey: "usuarioAsignadoId", as: "asignado" });
Activo.hasMany(Incidencia, { foreignKey: "activoId" });
Incidencia.belongsTo(Activo, { foreignKey: "activoId", as: "activo" });

Activo.hasMany(Mantenimiento, { foreignKey: "activoId" });
Mantenimiento.belongsTo(Activo, { foreignKey: "activoId" });



// Sincronizar modelos
sequelize.sync({ alter: true })
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch(err => console.error("Error al sincronizar modelos:", err));

module.exports = { Usuario, Activo, Mantenimiento, Incidencia };