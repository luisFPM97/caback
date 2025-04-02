const express = require('express');
const UsuarioRouter = require('./usuario.router');
const ActivoRouter = require('./activo.router');
const MantenimientoRouter = require('./matenimiento.router');
const IncidenciaRouter = require('./incidencia.router');
const router = express.Router();

// colocar las rutas aquí
router.use(UsuarioRouter)
router.use(ActivoRouter)
router.use(MantenimientoRouter)
router.use(IncidenciaRouter)


module.exports = router;