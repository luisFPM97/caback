const { crearIncidencia, obtenerIncidencias, actualizarEstadoIncidencia, eliminarIncidencia } = require('../controllers/incidencia.controller')
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const IncidenciaRouter = express.Router();
IncidenciaRouter.route('/incidencias')
  .get(obtenerIncidencias)
  .post(crearIncidencia)

IncidenciaRouter.route('/incidencias/:id')
 .put(authMiddleware,actualizarEstadoIncidencia)
 .delete(authMiddleware,eliminarIncidencia)

module.exports = IncidenciaRouter;
