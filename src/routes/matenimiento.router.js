const {crearMantenimiento, obtenerMantenimientosPorActivo, actualizarMantenimiento, eliminarMantenimiento} = require('../controllers/mantenimiento.controller');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { Activo } = require('../models');
const MantenimientoRouter = express.Router();
MantenimientoRouter.route('/mantenimientos')
  .get(authMiddleware,obtenerMantenimientosPorActivo)
  .post(authMiddleware,crearMantenimiento)

MantenimientoRouter.route('/mantenimientos/:id')
 .put(authMiddleware,actualizarMantenimiento)
 .delete(authMiddleware,eliminarMantenimiento)

module.exports = MantenimientoRouter;

