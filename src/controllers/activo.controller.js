const catchError = require('../utils/catchError');
const Activo = require('../models/Activo');

const crearActivo = catchError(async (req, res) => {
    try {
      const activo = await Activo.create(req.body);
      res.status(201).json(activo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
const obtenerActivos = catchError(async (req, res) => {
    try {
      const activos = await Activo.findAll();
      res.json(activos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
const actualizarActivo = catchError(async (req, res) => {
    try {
      const { id } = req.params;
      const [actualizado] = await Activo.update(req.body, { where: { id } });
  
      if (!actualizado) return res.status(404).json({ error: "Activo no encontrado" });
  
      res.json({ mensaje: "Activo actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
const eliminarActivo = catchError(async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Activo.destroy({ where: { id } });
  
      if (!eliminado) return res.status(404).json({ error: "Activo no encontrado" });
  
      res.json({ mensaje: "Activo eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
    crearActivo,
    obtenerActivos,
    actualizarActivo,
    eliminarActivo
};

