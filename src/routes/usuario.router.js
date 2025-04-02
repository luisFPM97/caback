const express = require('express');
const {getAll, getOne, remove, update, registrar, login} = require('../controllers/usuario.controller');

const UsuarioRouter = express.Router();

UsuarioRouter.route('/usuarios')
    .get(getAll)
    .post(registrar)

UsuarioRouter.route('/usuarios/login')
   .post(login)

UsuarioRouter.route('/usuarios/:id')
   .get(getOne)
   .delete(remove)
   .put(update)

module.exports = UsuarioRouter;