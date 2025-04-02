const catchError = require('../utils/catchError');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const registrar = catchError(async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);
      const { nombre, correo, contraseña, rol } = req.body;
      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { correo } });
      if (usuarioExistente) return res.status(400).json({ error: "El usuario ya existe" });
  
      const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña: hashedPassword, rol });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
const login = catchError(async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      const usuario = await Usuario.findOne({ where: { correo } });
  
      if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }
  
      const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
      res.json({ token, usuario });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Usuario.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Usuario.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Usuario.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});
const getAll = catchError(async(req, res) => {
    const results = await Usuario.findAll();
    return res.json(results);
});

module.exports = {
    getAll,
    getOne,
    remove,
    update,
    registrar,
    login
}





