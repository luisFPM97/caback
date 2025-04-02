const Incidencia = require("../models/Incidencia");
const Usuario = require("../models/Usuario");
const Activo = require("../models/Activo");
const nodemailer = require("nodemailer");
const catchError = require("../utils/catchError");
const { calcularTiempoLaboral } = require("../utils/calculoTiempo");

const crearIncidencia = catchError(async (req, res) => {
    try {
      const incidencia = await Incidencia.create(req.body);
  
      // Buscar al superadministrador para enviar la notificación
      const superadmin = await Usuario.findOne({ where: { rol: "superadmin" } });
  
      if (superadmin) {
        enviarCorreo('ingsistemas@andesexport.com', incidencia);
      }
  
      res.status(201).json(incidencia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
const obtenerIncidencias = catchError(async (req, res) => {
    try {
      const incidencias = await Incidencia.findAll({ include: [
        { model: Usuario, as: 'solicitante' },  // Specify the alias for the first association
        { model: Usuario, as: 'asignado' },  // Specify the alias for the second association
        { model: Activo, as: 'activo' }
      ]  });
      res.json(incidencias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
const actualizarEstadoIncidencia = catchError(async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, usuarioAsignadoId, fechaFinalizacion } = req.body;

    // Obtener la incidencia
    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) return res.status(404).json({ error: "Incidencia no encontrada" });

    // Si se finaliza la incidencia, calculamos el tiempo total
    let tiempoTotal = null;
    if (estado === "terminado" && fechaFinalizacion) {
      tiempoTotal = calcularTiempoLaboral(incidencia.createdAt, fechaFinalizacion);
    }

    // Actualizar incidencia
    await incidencia.update({ estado, usuarioAsignadoId, fechaFinalizacion, tiempoTotal });

    res.json({ mensaje: "Incidencia actualizada correctamente", tiempoTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  });
  const eliminarIncidencia = catchError(async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Incidencia.destroy({ where: { id } });

      if (!eliminado) return res.status(404).json({ error: "Incidencia no encontrada" });

      res.json({ mensaje: "Incidencia eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Función para enviar correo
  const enviarCorreo = async (destino, incidencia) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    let info = await transporter.sendMail({
      from: `"Gestión de Activos" <${process.env.EMAIL_USER}>`,
      to: destino,
      subject: "Nueva Incidencia Creada",
      text: `Se ha reportado una nueva incidencia: ${incidencia.titulo}\nDescripción: ${incidencia.descripcion}`,
    });
  
    console.log("Correo enviado:", info.messageId);
  };

module.exports = {
    crearIncidencia,
    obtenerIncidencias,
    actualizarEstadoIncidencia,
    eliminarIncidencia
  };