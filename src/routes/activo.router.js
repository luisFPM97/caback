const {crearActivo, obtenerActivos, actualizarActivo, eliminarActivo} = require('../controllers/activo.controller');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const ActivoRouter = express.Router();
ActivoRouter.route('/activos')
   .get(authMiddleware,obtenerActivos)
   .post(authMiddleware,crearActivo)

ActivoRouter.route('/activos/:id')
  .put(authMiddleware,actualizarActivo)
  .delete(authMiddleware,eliminarActivo)

module.exports = ActivoRouter;